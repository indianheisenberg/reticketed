import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-center bg-gray-100 p-30">
      <div class="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-lg">
        @if (!isLoggedIn()) {
          <h1 class="mb-4 text-2xl font-semibold">Sign in</h1>

          <button
            (click)="login()"
            class="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow transition hover:shadow-md"
          >
            <i class="fab fa-google text-lg"></i>
            <span>Continue with Google</span>
          </button>
        } @else {
          <h1 class="mb-4 text-2xl font-semibold">Welcome</h1>
          <img
            [src]="user()?.photoURL || ''"
            alt="User avatar"
            class="mx-auto mb-3 h-16 w-16 rounded-full"
          />
          <p class="font-semibold">{{ user()?.displayName }}</p>
          <p class="text-sm text-gray-500">{{ user()?.email }}</p>
          <button
            (click)="logout()"
            class="mt-4 w-full rounded-lg bg-red-500 py-2 text-white transition hover:bg-red-600"
          >
            <i class="fas fa-sign-out-alt mr-2"></i>
            Sign out
          </button>
        }
      </div>
    </div>
  `,
})
export class LoginComponent {
  private authService = inject(AuthService);

  user = this.authService.user;
  isLoggedIn = computed(() => !!this.user());
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  login() {
    const redirectTo = this.route.snapshot.queryParamMap.get('redirectTo') || '/';
    this.authService
      .googleSignIn()
      .then(() => {
        this.router.navigateByUrl(redirectTo);
      })
      .catch(console.error);
  }

  logout() {
    this.authService.logout();
  }
}
