import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { NgForOf, NgIf } from '@angular/common';
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
  selector: 'app-filter-task',
  standalone: true,
  imports: [NgForOf, NgIf, FormsModule, CommonModule], // Add FormsModule here
  templateUrl: './filter-task.component.html',
  //styleUrls: ['./filter-task.component.css'],
})
export class FilterTaskComponent {

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

  filteredTasks: Task[] = [];  // Array to hold filtered tasks

  message: string = '';  // To show success or error message


  //@Input() tasks: Task[] = []; // Receive tasks from parent component
  //@Output() filteredTasksChange = new EventEmitter<Task[]>(); // Emit filtered tasks

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
      this.filteredTasks = [...this.tasks]; // Initialize filtered tasks
    }
  }

  // Apply filters to the task list
  applyFilters() {
    // Apply filtering based on the filter criteria
    this.filteredTasks = this.tasks.filter((task) => {
      const filterDate = this.filter.date ? new Date(this.filter.date) : null; // Convert filter.date to a Date object
      const taskDate = new Date(task.date); // Convert task.date to a Date object if it's a string
      return (
        (this.filter.teamMember ? task.contact_person === this.filter.teamMember : true) &&
        (this.filter.taskType ? task.task_type === this.filter.taskType : true) &&
        (this.filter.status ? task.status === this.filter.status : true) &&
        (this.filter.entityName ? task.entity_name.includes(this.filter.entityName) : true) &&
        (this.filter.contactPerson ? task.contact_person.includes(this.filter.contactPerson) : true) &&
        (filterDate ? taskDate.toDateString() === filterDate.toDateString() : true) // Compare dates without time
      );
    });

    // Apply sorting to the filtered tasks
    if (this.filter.date) {
      this.filteredTasks = this.filteredTasks.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (this.filter.entityName) {
      this.filteredTasks = this.filteredTasks.sort((a, b) => a.entity_name.localeCompare(b.entity_name));
    } else if (this.filter.status) {
      this.filteredTasks = this.filteredTasks.sort((a, b) => a.status.localeCompare(b.status));
    }
  }


  //  this.filteredTasksChange.emit(filteredTasks); // Emit the filtered tasks
  //}
}
