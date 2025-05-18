import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SellTicketComponent } from './components/sell-ticket/sell-ticket.component';

export const routes: Routes = [
     { path: '', component: HomeComponent },
     { path: 'home', component: HomeComponent },
     // { path: '**', redirectTo: '' }, // Redirect to home for any unknown routes
     { path: 'sell-ticket', component: SellTicketComponent } 
];
