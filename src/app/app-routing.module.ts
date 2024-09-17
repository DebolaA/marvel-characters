import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'characters',
    pathMatch: 'full',
  },
  {
    path: 'characters',
    loadChildren: () =>
      import('./pages/landing-page/landing-page.module').then(
        (mod) => mod.LandingPageModule
      ),
  },
  {
    path: 'view-details/:id',
    loadChildren: () =>
      import('./pages/view-details/view-details.module').then(
        (mod) => mod.ViewDetailsModule
      ),
  },
  {
    path: '**',
    redirectTo: 'characters',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
