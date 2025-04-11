import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsComponent } from '../../components/tabs/tabs.component';
import { TaskService } from '../../services/task.service';
import { AlertService } from '../../services/alert.service';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { ModalService } from '../../services/modal.service';
import { TaskPanelComponent } from '../../components/task-panel/task-panel.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    TabsComponent,
    TaskListComponent,
    HeaderComponent,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements OnInit {
  myTasks: any[] = [];

  constructor(
    private taskService: TaskService,
    private alertService: AlertService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getMyTasks().subscribe({
      next: (tasks) => {
        this.myTasks = tasks;
      },
      error: (err) => {
        const message = err?.error?.message || 'Failed to load your tasks.';
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

  createTask() {
    this.modalService.show(TaskPanelComponent, 0, () => {
      this.loadTasks();
    });
  }
}
