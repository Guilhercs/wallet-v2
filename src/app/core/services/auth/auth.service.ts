import { Injectable, signal } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userData = signal<boolean>(false);

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  register(email: string, password: string): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  get isLoggedIn() {
    return this.userData();
  }

  getUser() {
    this.afAuth.authState.subscribe((res) => {
      this.userData.set(res?.email ? true : false);
    });
  }
}
