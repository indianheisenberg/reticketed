import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PrimaryButtonComponent } from '../common/primary-button/primary-button.component';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule, PrimaryButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title = signal('Reticketed');
  subtitle = signal('resell your tickets effortlessly');
  logoUrl = signal('assets/logo.png');
  router = inject(Router);

  navigationLinks = signal([
   
    { id: 1 , name: 'Movie Tickets', path: '/movies' },
    { id: 2 ,name: 'Concert Tickets', path: '/concerts' },
    { id: 3 ,name: 'Other Tickets', path: '/other' }

  ]);

  mobileMenuOpen = false;

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  onSellTicketClick() {
    // Logic to handle the sell ticket button click
    console.log('Sell Ticket button clicked');
    this.router.navigateByUrl('sell-ticket');
  }
}
