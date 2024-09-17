import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Output()
  searchEvt = new EventEmitter<string>();
  @ViewChild('search') searchInput!: ElementRef;
  constructor() {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    console.log(form.value.search);
    this.searchEvt.emit(form.value.search);
  }

  clearSearch() {
    this.searchInput.nativeElement.value = '';
    this.searchEvt.emit('');
  }
}
