import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { CardComponent } from '../../components/card/card.component';
import { SearchComponent } from '../../components/search/search.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LandingPageComponent, CardComponent, SearchComponent],
  imports: [CommonModule, LandingPageRoutingModule, FormsModule],
})
export class LandingPageModule {}
