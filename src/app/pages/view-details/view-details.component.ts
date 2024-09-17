import { Component, OnInit } from '@angular/core';
import { UnSub } from '../../utils/unsubscribe';
import { ActivatedRoute, Router } from '@angular/router';
import { EndpointService } from '../../services/endpoint.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ICharacter } from '../../model/character.td';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrl: './view-details.component.scss',
})
export class ViewDetailsComponent extends UnSub implements OnInit {
  messageSubject = new BehaviorSubject<string>('');
  messageAction$ = this.messageSubject.asObservable();
  error: boolean = false;
  paramSub: Subscription;
  character: ICharacter | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private endpointService: EndpointService
  ) {
    super();
    this.paramSub = this.route.params.subscribe((params: any) => {
      const id: number | undefined = params
        ? parseInt(params['id'])
        : undefined;
      if (id) {
        this.endpointService.getCharacterWithId(id).subscribe({
          next: (data: ICharacter | null) => {
            data
              ? (this.character = data)
              : this.messageSubject.next('No such character exists');
          },
          error: (error: Error) => {
            this.messageSubject.next('No such character exists');
          },
        });
      }
    });
  }

  ngOnInit(): void {}

  navigateBack() {
    this.router.navigate(['/character']);
  }
}
