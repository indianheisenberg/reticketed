import { Routes } from '@angular/router';
import { LoginComponent } from './components/common/login/login.component';
import { FindTicketComponent } from './components/find-ticket/find-ticket.component';
import { HomeComponent } from './components/home/home.component';
import { SellTicketComponent } from './components/sell-ticket/sell-ticket.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  // { path: '**', redirectTo: '' }, // Redirect to home for any unknown routes
  { path: 'sell-ticket', component: SellTicketComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'find-ticket', component: FindTicketComponent },
];
