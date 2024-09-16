import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment.development';
import { catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  baseUrl: string = '';
  apiHash: string = '';
  apiTS: number = 2;
  apiKey: string = '';

  constructor(private http: HttpClient) {}
  ///Upload config file
  public initAppConfig(): Promise<any> {
    return new Promise((resolve) => {
      if (env.production) {
        this.http
          .get('./config.json')
          .pipe(
            tap((data: any) => {
              this.baseUrl = data.baseUrl;
              this.apiHash = data.HASH;
              this.apiKey = data.API_KEY;
              this.apiTS = data.TS;
              resolve(true);
            }),
            catchError((error) => {
              resolve(true);
              return of(null);
            })
          )
          .subscribe();
      } else {
        const settings = require('../../../config.json');
        this.baseUrl = settings.BASE_URL;
        this.apiHash = settings.HASH;
        this.apiKey = settings.API_KEY;
        this.apiTS = settings.TS;
        resolve(true);
      }
    });
  }
}
