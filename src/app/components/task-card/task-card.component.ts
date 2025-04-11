import { Component, Input } from '@angular/core';
import { TaskPanelComponent } from '../task-panel/task-panel.component';
import { ModalService } from '../../services/modal.service';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'task-card',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss',
})
export class TaskCardComponent {
  @Input('task') task?: any;

  constructor(
    private modalService: ModalService,
    private taskService: TaskService
  ) {}

  getTime(time: string): string {
    const date = new Date('2025-01-01T' + time);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  getDate(date: string): string {
    const localDate = new Date(date);
    return localDate.toLocaleDateString('en-US', {
      timeZone: 'UTC',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  editTask(uuid: string) {
    this.modalService.show(TaskPanelComponent, uuid, () => {
      this.loadTask(uuid);
    });
  }

  loadTask(uuid: string) {
    this.taskService.get(uuid).subscribe({
      next: (task) => {
        this.task = task;
        this.task.user_id = task.user.id;
      },
      error: (err) => {
        this.task = false;
      },
    });
  }
}
