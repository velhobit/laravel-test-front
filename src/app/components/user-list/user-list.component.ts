import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
  selector: 'user-list',
  imports: [CommonModule, UserCardComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  @Input('users') users: any[] = [];
}
