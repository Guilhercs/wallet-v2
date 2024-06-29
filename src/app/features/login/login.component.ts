import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
    trigger('expandCollapse', [
      state(
        'collapsed',
        style({
          height: '300px',
        })
      ),
      state(
        'expanded',
        style({
          height: '380px',
        })
      ),
      transition('collapsed <=> expanded', [animate('600ms ease-in-out')]),
    ]),
  ],
})
export class LoginComponent {
  public isExpanded = false;
  public hide = true;
  public form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  #authService = inject(AuthService);
  #router = inject(Router);

  public clickEvent(event: MouseEvent): void {
    event.preventDefault();
    this.hide = !this.hide;
    event.stopPropagation();
  }

  public login(): void {
    const { email, password } = this.form.getRawValue();
    if (email && password) {
      this.#authService
        .login(email, password)
        .then(() => this.#router.navigate(['/dashboard']))
        .catch((err) => console.log('Erro ao fazer login:', err));
    }
  }

  public register(): void {
    if (this.validatePassword()) {
      this.#authService
        .register(
          this.form.controls['email'].value!,
          this.form.controls['password'].value!
        )
        .then((result) => {
          console.log('User registered successfully!', result);
        })
        .catch((error) => {
          console.error('Error registering user', error);
        });
    }
  }

  private validatePassword(): boolean {
    const password = this.form.controls['password'].value;
    const confirmPassword = this.form.controls['confirmPassword'].value;
    return password === confirmPassword ? true : false;
  }

  public tabChange(): void {
    this.isExpanded = !this.isExpanded;
  }
}
