import { Component } from '@angular/core';
import { TabsComponent } from '../../components/tabs/tabs.component';
import { UserListComponent } from '../../components/user-list/user-list.component';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';
import { UserPanelComponent } from '../../components/user-panel/user-panel.component';
import { ModalService } from '../../services/modal.service';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-users',
  imports: [TabsComponent, UserListComponent, HeaderComponent],
  standalone: true,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  users: any[] = [];

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAll().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {
        const message = err?.error?.message || 'Failed to load users.';
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

  createUser() {
    this.modalService.show(UserPanelComponent, 0, () => {
      this.loadUsers();
    });
  }
}
