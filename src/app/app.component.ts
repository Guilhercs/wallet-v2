import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<router-outlet />`,
  styleUrl: './app.component.scss',
  imports: [CommonModule, RouterOutlet, AngularFireAuthModule],
  providers: [],
})
export class AppComponent {
  #authService = inject(AuthService);
  title = 'wallet-v2';

  ngOnInit() {
    this.#authService.getUser();
  }
}
