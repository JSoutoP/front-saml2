import { Routes } from '@angular/router';
import { SuccessPageComponent } from './success-page.component';
import { HomeComponent } from './home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'success-page', component: SuccessPageComponent },
];
