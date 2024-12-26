import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
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
  selector: 'app-filter-task',
  standalone: true,
  imports: [NgForOf, NgIf, FormsModule, CommonModule],
  templateUrl: './filter-task.component.html',
})
export class FilterTaskComponent {

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

  filteredTasks: Task[] = [];

  message: string = ''; 


  filter: any = {
    teamMember: '',
    taskType: '',
    status: '',
    date: '',
    entityName: '',
    contactPerson: '',
  };

  ngOnInit(): void {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
      this.filteredTasks = [...this.tasks];
    }
  }

  applyFilters() {
    this.filteredTasks = this.tasks.filter((task) => {
      const filterDate = this.filter.date ? new Date(this.filter.date) : null;
      const taskDate = new Date(task.date); 
      return (
        (this.filter.teamMember ? task.contact_person === this.filter.teamMember : true) &&
        (this.filter.taskType ? task.task_type === this.filter.taskType : true) &&
        (this.filter.status ? task.status === this.filter.status : true) &&
        (this.filter.entityName ? task.entity_name.includes(this.filter.entityName) : true) &&
        (this.filter.contactPerson ? task.contact_person.includes(this.filter.contactPerson) : true) &&
        (filterDate ? taskDate.toDateString() === filterDate.toDateString() : true)
      );
    });

    if (this.filter.date) {
      this.filteredTasks = this.filteredTasks.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (this.filter.entityName) {
      this.filteredTasks = this.filteredTasks.sort((a, b) => a.entity_name.localeCompare(b.entity_name));
    } else if (this.filter.status) {
      this.filteredTasks = this.filteredTasks.sort((a, b) => a.status.localeCompare(b.status));
    }
  }

}
