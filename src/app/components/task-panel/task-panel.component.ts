import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'task-panel',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './task-panel.component.html',
  styleUrl: './task-panel.component.scss',
})
export class TaskPanelComponent {
  @Input('id') id: string = '';
  @Input('close') close: () => void = () => {};
  task: any = {
    title: '',
    description: '',
    date: '',
    time: '',
    color: '#024ee6',
    user_id: null,
  };
  users: any[] = [];
  colors: { [key: string]: string } = {
    red: '#d11b1b',
    orange: '#e37507',
    yellow: '#b3a314',
    green: '#1bb307',
    blue: '#024ee6',
    violet: '#b114e0',
  };
  colorEntries = Object.entries(this.colors).map(([key, value]) => ({
    key,
    value,
  }));

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private authService: AuthService,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.loadUsers();
    if (this.id.length) {
      this.loadTask();
    } else {
      this.loadMe();
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      Object.values(form.controls).forEach((control) =>
        control.markAsTouched()
      );
      return;
    }
    let task = { ...this.task };
    task.time = task.time.split(':');
    task.time = `${task.time[0]}:${task.time[1]}`;
    if (task.description && !task.description.length && !this.id) {
      delete task.description;
    }
    if (this.id) {
      this.taskService.update(this.id, task).subscribe({
        next: () => {
          this.alertService.info('Success', 'Task updated successfully');
          this.close();
        },
        error: (err) => {
          const message = err?.error?.message || 'Error to update task';
          this.alertService.info('Erro', message);
        },
      });
    } else {
      this.taskService.create(task).subscribe({
        next: () => {
          this.alertService.info('Success', 'Task was created');
          this.close();
        },
        error: (err) => {
          const message = err?.error?.message || 'Error to create task.';
          this.alertService.info('Erro', message);
        },
      });
    }
  }

  onCancel() {
    this.close();
  }

  onDelete() {
    if (!this.id) return;

    this.alertService.confirm(
      'Remove Task',
      'Are you sure you want to remove the task?',
      () => {
        this.taskService.delete(this.id).subscribe({
          next: () => {
            this.alertService.info('Removed', 'Task removed successfully.');
            this.close();
          },
          error: (err) => {
            const message = err?.error?.message || 'Failed to remove task.';
            this.alertService.info('Erro', message);
          },
        });
      }
    );
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

  loadMe() {
    this.authService.getMe().subscribe({
      next: (user) => {
        this.task.user_id = user.id;
      },
      error: (err) => {
        const message = err?.error?.message || 'Failed to load current user.';
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

  loadTask() {
    this.taskService.get(this.id).subscribe({
      next: (task) => {
        this.task = task;
        this.task.user_id = task.user.id;
      },
      error: (err) => {
        const message = err?.error?.message || 'Can`t get task.';
        this.alertService.info('Error', message);
      },
    });
  }
}
