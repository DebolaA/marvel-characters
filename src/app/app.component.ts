import { Component } from '@angular/core';
import { EndpointService } from './services/endpoint.service';
import { IApiResponse, ICharacter } from './model/character.td';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'marvel-characters';
  constructor(private endpointService: EndpointService) {
    this.endpointService.getMarvelCharacters().subscribe({
      next: (characterList: ICharacter[]) => {
        this.endpointService.characterList$.next(characterList);
        console.log(characterList);
      },
      error: (err: Error) => console.log(err),
    });
  }
  ngOnInit() {}
}
