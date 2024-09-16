import { ICharacter } from './../model/character.td';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { IApiResponse } from '../model/character.td';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root',
})
export class EndpointService {
  characterList$ = new BehaviorSubject<ICharacter[]>([]);

  constructor(
    private http: HttpClient,
    private settingsService: SettingsService
  ) {}

  getMarvelCharacters(): Observable<ICharacter[]> {
    let params = new HttpParams()
      .set('limit', 50)
      .set('ts', this.settingsService.apiTS)
      .set('apikey', this.settingsService.apiKey)
      .set('hash', this.settingsService.apiHash);

    return this.http
      .get<IApiResponse>(`${this.settingsService.baseUrl}characters`, {
        params: params,
      })
      .pipe(
        map((response: IApiResponse) => {
          return response.data.results.map(
            (character: ICharacter) => character
          );
        }),
        catchError(this.handleError)
      );
  }

  getCharacterWithId(id: number): Observable<ICharacter | null> {
    const list: ICharacter[] = this.characterList$.value;
    const index = list.findIndex((x: ICharacter) => x.id === id);
    if (index > -1) return of(list[index]);
    else return of(null);
  }

  handleError(error: Error) {
    return throwError(() => {
      return `${error.message}`;
    });
  }
}
