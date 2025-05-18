import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
     { path: '', component: HomeComponent },
     { path: 'home', component: HomeComponent },
     { path: '**', redirectTo: '' } // Redirect to home for any unknown routes
];
