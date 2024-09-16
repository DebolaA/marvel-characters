import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { UnSub } from '../../utils/unsubscribe';
import { ICharacter } from '../../model/character.td';
import { EndpointService } from '../../services/endpoint.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent extends UnSub implements OnInit {
  errorMessageSubject = new BehaviorSubject<string>('');
  errorMessageAction$ = this.errorMessageSubject.asObservable();

  characterList = new BehaviorSubject<ICharacter[]>([]);
  characterList$ = this.characterList.asObservable();

  constructor(private endpointService: EndpointService) {
    super();
  }

  ngOnInit(): void {
    this.getAllCharacters();
  }

  getAllCharacters() {
    this.endpointService.characterList$
      .pipe(
        catchError((error) => {
          this.errorMessageSubject.next(error);
          return of([]);
        })
      )
      .subscribe({
        next: (characters: ICharacter[]) => {
          this.characterList.next(characters);
        },
        error: (error: any) => console.log(error),
      });
  }
}
