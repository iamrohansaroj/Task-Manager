import { Component } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule

interface Task {
  id?: number;  // Optional ID
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
  imports: [NgForOf, NgIf, FormsModule, CommonModule],  // Add CommonModule here
  templateUrl: './create-task.component.html',
})
export class CreateTaskComponent {
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

  //filteredTasks: Task[] = [];  // Array to hold filtered tasks

  message: string = '';  // To show success or error message

  //sortCriterion: string = 'date'; // Default sort by date
  //sortOrder: string = 'asc'; // Default sort order

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
      this.tasks = JSON.parse(savedTasks);  // Parse the stored tasks and set them
      //this.filteredTasks = [...this.tasks]; // Initialize filtered tasks
    }
  }

  // Function to create or update a task
  createOrUpdateTask() {
    if (
      this.task.entity_name &&
      this.task.task_type &&
      this.task.time_of_task &&
      this.task.contact_person
    ) {
      // If task has an ID (existing task), update the task in the list
      if (this.task.id) {
        const index = this.tasks.findIndex(t => t.id === this.task.id);
        if (index !== -1) {
          this.tasks[index] = { ...this.task }; // Update task
          this.message = 'Task updated successfully!';
        }
      } else {
        // If no task ID, create a new task
        this.tasks.push({ ...this.task, id: new Date().getTime(), date: new Date() });
        this.message = 'Task created successfully!';
      }

      localStorage.setItem('tasks', JSON.stringify(this.tasks));

      // Reset the form
      this.task = {
        entity_name: '',
        task_type: '',
        time_of_task: '',
        contact_person: 'Amit', // Reset to default contact person
        note: '',
        status: 'open', // Reset status to 'open'
        date: new Date(),
      };
      //this.filteredTasks = [...this.tasks]; // Reset filtered tasks
    } else {
      // If required fields are missing, show an error message
      this.message = 'Please fill all the required fields.';
    }
  }

  // Function to load task data into the form for editing
  editTask(taskToEdit: Task) {
    this.task = { ...taskToEdit }; // Copy the task data into the form
  }

  // Function to delete a task
  deleteTask(taskId: number | undefined) {
    if (taskId !== undefined) {
      const index = this.tasks.findIndex(task => task.id === taskId);
      if (index !== -1) {
        this.tasks.splice(index, 1); // Remove the task from the list
        this.message = 'Task deleted successfully!';
        //this.applyFilters(); // Reapply filters after deletion
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      }
    } else {
      this.message = 'Invalid task ID.';
    }
  }

  // Function to change the status of a task
  changeStatus(task: Task, newStatus: string) {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      this.tasks[index].status = newStatus; // Update the task status
      this.message = 'Task status updated successfully!';
      //this.applyFilters(); // Reapply filters after status update
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }
}
