// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AppComponent } from './app/app.component';
import { TasksComponent } from './app/tasks/tasks.component';
import { CreateTaskComponent } from './app/create-task/create-task.component';
import { FilterTaskComponent } from './app/filter-task/filter-task.component'; // Import FilterTasksComponent
import { SortTaskComponent } from './app/sort-task/sort-task.component'; // Import SortasksComponent

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: TasksComponent },
      { path: 'create-task', component: CreateTaskComponent },
      { path: 'filter-task', component: FilterTaskComponent }, // Add FilterTasksComponent route
      { path: 'sort-task', component: SortTaskComponent }, // Add FilterTasksComponent route
    ]),
    importProvidersFrom(HttpClientModule, FormsModule), // Add FormsModule here
  ],
}).catch(err => console.error(err));
