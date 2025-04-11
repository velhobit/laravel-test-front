import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'tabs',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class TabsComponent {
  @Input('selected') selected: string = 'Users';

  constructor(private router: Router) {}

  goTo(route: string) {
    this.router.navigate([route]);
  }
}
