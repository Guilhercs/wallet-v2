import { Component, inject } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  #authService = inject(AuthService);

  logout() {
    this.#authService.logout();
  }
}
