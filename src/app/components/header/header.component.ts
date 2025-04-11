import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  me?: any;
  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getMe();
  }

  getMe() {
    this.authService.getMe().subscribe({
      next: (user) => {
        this.me = user;
      },
      error: (err) => {
        this.clear();
      },
    });
  }

  logout() {
    this.alertService.confirm(
      'Logout',
      'Are you sure you want to logout?',
      () => {
        this.authService.logout().subscribe({
          next: (user) => {
            this.clear();
          },
          error: (err) => {
            this.alertService.info(
              'Error to logout',
              'Sorry, but you need to try it again.'
            );
          },
        });
      }
    );
  }

  clear() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
}
