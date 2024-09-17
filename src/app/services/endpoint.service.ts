import { ICharacter, IQueryPayload } from './../model/character.td';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  filter,
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

  getMarvelCharacters(payload: IQueryPayload): Observable<ICharacter[]> {
    let params = new HttpParams()
      .set('limit', payload.limit)
      .set('ts', this.settingsService.apiTS)
      .set('apikey', this.settingsService.apiKey)
      .set('hash', this.settingsService.apiHash);

    if (payload.offset) params = params.append('offset', payload.offset);
    if (payload.name && payload.name.length)
      params = params.append('name', payload.name);
    if (payload.orderBy.length)
      params = params.append('orderBy', payload.orderBy);

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
    let params = new HttpParams()
      .set('limit', 20)
      .set('ts', this.settingsService.apiTS)
      .set('apikey', this.settingsService.apiKey)
      .set('hash', this.settingsService.apiHash);

    return this.http
      .get<IApiResponse>(`${this.settingsService.baseUrl}characters/${id}`, {
        params: params,
      })
      .pipe(
        map((response: IApiResponse) => {
          if (response.data.results.length) {
            return response.data.results[0];
          } else return null;
        }),
        catchError(this.handleError)
      );
  }

  handleError(error: Error) {
    return throwError(() => {
      return `${error.message}`;
    });
  }
}
