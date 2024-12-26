import { Component } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule


interface Task {
  id?: number;
  entity_name: string;
  task_type: string;
  time_of_task: string;
  contact_person: string;
  note: string;
  status: string;
  date: Date;
}

@Component({
  selector: 'app-sort-task',
  standalone: true,
  imports: [NgForOf, NgIf, FormsModule, CommonModule],  // Add CommonModule here
  templateUrl: './sort-task.component.html',
  //styleUrls: ['./sort-task.component.css'],
})
export class SortTaskComponent {
  // Predefined list of team members (contact persons)
  teamMembers: string[] = ['Amit', 'Ramesh', 'Rasik', 'Priya'];

  // Predefined task statuses
  taskStatuses: string[] = ['open', 'in-progress', 'completed'];

  // Predefined task types (for filtering)
  taskTypes: string[] = ['Development', 'Testing', 'Research'];

  // Predefined task sorting options
  sortOptions: string[] = ['Date', 'Entity Name', 'Status'];

  task: Task = {
    entity_name: '',
    task_type: '',
    time_of_task: '',
    contact_person: 'Amit',  // Default contact person
    note: '',
    status: 'open',  // Default to 'open'
    date: new Date(),  // Initialize with the current date
  };

  tasks: Task[] = [];  // Array to hold the tasks

  message: string = '';  // To show success or error message

  sortCriterion: string = 'date'; // Default sort by date
  sortOrder: string = 'asc'; // Default sort order

  // Filter criteria
  filter: any = {
    teamMember: '',
    taskType: '',
    status: '',
    date: '',
    entityName: '',
    contactPerson: ''
  };

  ngOnInit(): void {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks).map((task: Task) => ({
        ...task,
        date: new Date(task.date), // Convert date string to Date object
      }));
    }
  }


  sortTasks(criterion: string) {
    // If the selected criterion is the same as the previous one, toggle the order
    if (this.sortCriterion === criterion) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortCriterion = criterion;
      this.sortOrder = 'asc'; // Default to ascending order for new criteria
    }

    // Sorting logic
    this.tasks.sort((a, b) => {
      let comparison = 0;

      // Compare based on the selected criterion
      switch (criterion) {
        case 'entity_name':
          comparison = a.entity_name.localeCompare(b.entity_name);
          break;
        case 'task_type':
          comparison = a.task_type.localeCompare(b.task_type);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        case 'contact_person':
          comparison = a.contact_person.localeCompare(b.contact_person);
          break;
        case 'date':
          comparison = a.date.getTime() - b.date.getTime();
          break;
      }

      // If the order is descending, reverse the comparison
      return this.sortOrder === 'asc' ? comparison : -comparison;
    });
  }
}
