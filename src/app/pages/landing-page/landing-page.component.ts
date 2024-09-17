import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { UnSub } from '../../utils/unsubscribe';
import { ICharacter, IQueryPayload } from '../../model/character.td';
import { EndpointService } from '../../services/endpoint.service';
import { Router } from '@angular/router';

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

  payload: IQueryPayload = {
    limit: 50,
    name: '',
    offset: 0,
    orderBy: 'name',
    page: 1,
  };

  constructor(
    private endpointService: EndpointService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.getAllCharacters();
  }

  getAllCharacters() {
    this.isLoading.next(true);

    this.endpointService.getMarvelCharacters(this.payload).subscribe({
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

  performSearch(searchString: string): void {
    this.payload.name = searchString;
    this.getAllCharacters();
  }

  loadMoreBtn() {
    this.payload.offset = this.payload.page * 50;
    this.payload.page += 1;
    this.getAllCharacters();
  }

  viewCharacterDetails(character: ICharacter) {
    this.router.navigate(['/view-details', character?.id]);
  }

  updatePayload(): IQueryPayload {
    return this.payload;
  }
}
