import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <nav class="navbar">
      <div class="container">
        <a routerLink="/home" class="nav-link">Home</a>
        <a routerLink="/create-task" class="nav-link">Create Task</a>
        <a routerLink="/filter-task" class="nav-link">Filter Task</a>
        <a routerLink="/sort-task" class="nav-link">Sort Task</a>
      </div>
    </nav>
    <router-outlet></router-outlet>
  `,
  imports: [RouterOutlet, RouterLink],
  styles: [
    `
      .navbar {
        background-color: #333;
        padding: 1rem;
        border-radius: 10px; /* Rounded corners */
        width: 100%;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
        position: sticky; /* Makes the navbar sticky */
        top: 0; /* Sticks at the top of the viewport */
        z-index: 1000; /* Ensures it stays above other elements */
      }
      .container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto; /* Center the content */
      }
      .nav-link {
        color: white;
        text-decoration: none;
        font-size: 1.1rem;
        padding: 0.5rem 1.5rem;
        border-radius: 20px; /* Rounded buttons */
        transition: background-color 0.3s ease, color 0.3s ease; /* Smooth transitions */
      }
      .nav-link:hover {
        background-color: #555;
        color: #fff;
      }
      .nav-link:active {
        background-color: #777;
      }
      body {
        margin: 0;
        font-family: Arial, sans-serif;
      }
    `,
  ],
})
export class AppComponent { }
