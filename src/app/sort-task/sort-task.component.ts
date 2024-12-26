import { Component } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


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
  imports: [NgForOf, NgIf, FormsModule, CommonModule],
  templateUrl: './sort-task.component.html',
})
export class SortTaskComponent {
  teamMembers: string[] = ['Amit', 'Ramesh', 'Rasik', 'Priya'];

  taskStatuses: string[] = ['open', 'in-progress', 'completed'];

  taskTypes: string[] = ['Development', 'Testing', 'Research'];

  sortOptions: string[] = ['Date', 'Entity Name', 'Status'];

  task: Task = {
    entity_name: '',
    task_type: '',
    time_of_task: '',
    contact_person: 'Amit',
    note: '',
    status: 'open',
    date: new Date(),
  };

  tasks: Task[] = []; 

  message: string = '';

  sortCriterion: string = 'date';
  sortOrder: string = 'asc';

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
        date: new Date(task.date),
      }));
    }
  }


  sortTasks(criterion: string) {
    if (this.sortCriterion === criterion) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortCriterion = criterion;
      this.sortOrder = 'asc';
    }

    this.tasks.sort((a, b) => {
      let comparison = 0;

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

      return this.sortOrder === 'asc' ? comparison : -comparison;
    });
  }
}
