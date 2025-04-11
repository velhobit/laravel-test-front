import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UserPanelComponent } from '../user-panel/user-panel.component';
import { ModalService } from '../../services/modal.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'user-card',
  imports: [CommonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input('user') user?: any;

  constructor(
    private modalService: ModalService,
    private userService: UserService
  ) {}

  formatPhone(phone: string | number): string {
    const digits = phone.toString().replace(/\D/g, '');

    if (digits.length === 11) {
      return digits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (digits.length === 10) {
      return digits.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }

    return phone.toString();
  }

  editUser(id: number) {
    this.modalService.show(UserPanelComponent, id, () => {
      this.loadUser(id);
    });
  }

  loadUser(id: number) {
    this.userService.get(id).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => {
        this.user = false;
      },
    });
  }
}
