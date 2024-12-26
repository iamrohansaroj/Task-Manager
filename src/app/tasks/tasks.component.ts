import { Component } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [NgForOf, NgIf, FormsModule], // Add FormsModule here
  templateUrl: './tasks.component.html',
})
export class TasksComponent {
  filters = {
    entity_name: '',
    status: '',
  };
}
