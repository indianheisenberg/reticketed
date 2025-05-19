import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PrimaryButtonComponent } from '../common/primary-button/primary-button.component';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule, PrimaryButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  title = signal('Reticketed');
  subtitle = signal('resell your tickets effortlessly');
  logoUrl = signal('assets/logo.png');
  router = inject(Router);
  authService = inject(AuthService);
  user = this.authService.user;
  isLoggedIn = computed(() => !!this.user());

  navigationLinks = signal([
    { id: 1, name: 'Find Tickets', path: '/find-ticket' },
    { id: 2, name: 'Sell Tickets', path: '/sell-ticket' },
  ]);

  mobileMenuOpen = false;

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  onSellTicketClick() {
    // Logic to handle the sell ticket button click
    this.router.navigateByUrl('sell-ticket');
  }

  onLoginClick() {
    // Logic to handle the login button click
    this.router.navigateByUrl('login');
  }
}
