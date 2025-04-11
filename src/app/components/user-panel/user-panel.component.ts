import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-user-panel',
  imports: [CommonModule, FormsModule, NgxMaskDirective],
  standalone: true,
  providers: [provideNgxMask()],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.scss',
})
export class UserPanelComponent {
  @Input('id') id: number = 0;
  @Input('close') close: () => void = () => {};
  user: any = {
    name: '',
    email: '',
    password: '',
    phone: '',
    cpf: '',
    rg: '',
    address: '',
    city: '',
    state: '',
    birthdate: '',
    role: 'user',
  };

  constructor(
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    if (this.id) {
      this.loadUser();
    }
  }

  onCancel() {
    this.close();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      Object.values(form.controls).forEach((control) =>
        control.markAsTouched()
      );
      return;
    }
    if (this.id) {
      this.userService.update(this.id, this.user).subscribe({
        next: () => {
          this.alertService.info('Success', 'User updated successfully');
          this.close();
        },
        error: (err) => {
          const message = err?.error?.message || 'Error to update user';
          this.alertService.info('Erro', message);
        },
      });
    } else {
      let user = { ...this.user };
      if (!user.password.length) {
        delete user.password;
      }
      this.userService.create(user).subscribe({
        next: () => {
          this.alertService.info('Success', 'User was created');
          this.close();
        },
        error: (err) => {
          const message = err?.error?.message || 'Error to create user.';
          this.alertService.info('Erro', message);
        },
      });
    }
  }

  onDelete() {
    if (!this.id) return;

    this.alertService.confirm(
      'Remove User',
      'Are you sure you want to remove the user?',
      () => {
        this.userService.delete(this.id).subscribe({
          next: () => {
            this.alertService.info('Removed', 'User removed successfully.');
            this.close();
          },
          error: (err) => {
            const message = err?.error?.message || 'Failed to remove user.';
            this.alertService.info('Erro', message);
          },
        });
      }
    );
  }

  loadUser() {
    this.userService.get(this.id).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => {
        const message = err?.error?.message || 'Failed to load user.';
        if (message == 'Unauthenticated.') {
          this.alertService.info(
            'You`ve been disconnected',
            'Sorry, but you need to sign in again.'
          );
          return;
        }
        this.alertService.info('Error', message);
      },
    });
  }
}
