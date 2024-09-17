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

  isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();

  constructor(private endpointService: EndpointService) {
    super();
  }

  ngOnInit(): void {
    this.getAllCharacters();
  }

  getAllCharacters() {
    this.isLoading.next(true);
    this.endpointService.getMarvelCharacters().subscribe({
      next: (characterList: ICharacter[]) => {
        this.endpointService.characterList$.next(characterList);
        this.characterList.next(characterList);
        this.isLoading.next(false);
      },
      error: (err: Error) => {
        console.log(err);
        this.errorMessageSubject.next(
          'Unable to load character list, please try again'
        );
        this.isLoading.next(false);
        return of([]);
      },
    });
  }
}
