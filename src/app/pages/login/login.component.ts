import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  login() {
    if (!this.email || !this.password) {
      this.alertService.info(
        'Missing fields',
        'Please enter email and password.'
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.alertService.info(
        'Invalid email',
        'Please enter a valid email address.'
      );
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        if (response?.access_token) {
          this.authService.setToken(response.access_token);
          this.router.navigate(['tasks']);
        } else {
          this.alertService.info(
            'Authentication error',
            'Invalid response from server.'
          );
        }
      },
      error: (err) => {
        const message =
          err?.error?.message || 'Login failed. Please try again.';
        this.alertService.info('Authentication error', message);
      },
    });
  }
}
