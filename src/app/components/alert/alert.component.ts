import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Button {
  type: string;
  label: string;
  onClick?: () => void;
}

@Component({
  selector: 'alert',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  @Input('title') title: string = '';
  @Input('message') message: string = '';
  @Input('type') type: string = '';
  @Input('buttons') buttons: Button[] = [];

  onClick(onclick: () => void = () => {}) {
    onclick();
  }
}
