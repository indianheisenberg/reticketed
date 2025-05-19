import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  user = signal<User | null>(null);

  constructor() {
    onAuthStateChanged(this.auth, user => this.user.set(user));
  }

  async googleSignIn() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      this.user.set(result.user);
    } catch (error) {
      console.error('Google sign-in failed:', error);
    }
  }

  async logout() {
    await signOut(this.auth);
    this.user.set(null);
  }

  async isLoggedIn() {
    return this.user() !== null;
  }

  getUser() {
    return this.user();
  }
}
