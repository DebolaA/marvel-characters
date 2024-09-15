import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, throwError } from 'rxjs';
import { ICharacter } from '../model/character.td';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EndpointService {
  characterList$ = new BehaviorSubject<ICharacter[]>([]);

  constructor(private http: HttpClient) {}

  getMarvelCharacters(): Observable<ICharacter[]> {
    return this.http
      .get<ICharacter[]>(`${env.BASE_URL}character`)
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
