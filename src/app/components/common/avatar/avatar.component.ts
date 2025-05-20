import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { User } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-avatar',
  imports: [MatMenuModule, MatIconModule, MatButtonModule, CommonModule, RouterModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent {
  @Input() user!: User;
  authService = inject(AuthService);
  router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
