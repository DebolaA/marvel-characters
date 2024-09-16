import { Router } from '@angular/router';
import { ICharacter } from './../../model/character.td';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit {
  @Input() character: ICharacter | undefined = undefined;
  @Output() deleteUser = new EventEmitter<ICharacter>();
  constructor(private router: Router) {}

  ngOnInit(): void {}
}
