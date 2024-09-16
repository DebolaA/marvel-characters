import { Component } from '@angular/core';
import { EndpointService } from './services/endpoint.service';
import { ICharacter } from './model/character.td';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'marvel-characters';
  constructor(private endpointService: EndpointService) {
    console.log('start');
    this.endpointService.getMarvelCharacters().subscribe({
      next: (data: ICharacter[]) => {
        this.endpointService.characterList$.next(data);
        console.log(data);
      },
      error: (err: Error) => console.log(err),
    });
  }
  ngOnInit() {}
}
