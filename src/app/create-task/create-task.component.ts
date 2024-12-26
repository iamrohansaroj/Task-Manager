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
  selector: 'app-create-task',
  standalone: true,
  imports: [NgForOf, NgIf, FormsModule, CommonModule], 
  templateUrl: './create-task.component.html',
})
export class CreateTaskComponent {

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
      this.tasks = JSON.parse(savedTasks);
    }
  }

  createOrUpdateTask() {
    if (
      this.task.entity_name &&
      this.task.task_type &&
      this.task.time_of_task &&
      this.task.contact_person
    ) {
      if (this.task.id) {
        const index = this.tasks.findIndex(t => t.id === this.task.id);
        if (index !== -1) {
          this.tasks[index] = { ...this.task };
          this.message = 'Task updated successfully!';
        }
      } else {
        this.tasks.push({ ...this.task, id: new Date().getTime(), date: new Date() });
        this.message = 'Task created successfully!';
      }

      localStorage.setItem('tasks', JSON.stringify(this.tasks));

      this.task = {
        entity_name: '',
        task_type: '',
        time_of_task: '',
        contact_person: 'Amit',
        note: '',
        status: 'open',
        date: new Date(),
      };
    } else {
      this.message = 'Please fill all the required fields.';
    }
  }

  editTask(taskToEdit: Task) {
    this.task = { ...taskToEdit };
  }

  deleteTask(taskId: number | undefined) {
    if (taskId !== undefined) {
      const index = this.tasks.findIndex(task => task.id === taskId);
      if (index !== -1) {
        this.tasks.splice(index, 1);
        this.message = 'Task deleted successfully!';
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      }
    } else {
      this.message = 'Invalid task ID.';
    }
  }

  changeStatus(task: Task, newStatus: string) {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      this.tasks[index].status = newStatus; 
      this.message = 'Task status updated successfully!';
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }
}
