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
  constructor() {}
  ngOnInit() {}
}
