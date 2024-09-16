import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { CardComponent } from '../../components/card/card.component';

@NgModule({
  declarations: [LandingPageComponent, CardComponent],
  imports: [CommonModule, LandingPageRoutingModule],
})
export class LandingPageModule {}
