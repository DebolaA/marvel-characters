import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, throwError } from 'rxjs';
import { ICharacter } from '../model/character.td';
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
      .set('limit', 10)
      .set('ts', this.settingsService.apiTS)
      .set('apikey', this.settingsService.apiKey)
      .set('hash', this.settingsService.apiHash);

    return this.http
      .get<ICharacter[]>(`${this.settingsService.baseUrl}characters`, {
        params: params,
      })
      .pipe(catchError(this.handleError));
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
