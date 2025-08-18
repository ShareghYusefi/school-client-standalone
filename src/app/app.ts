import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './components/home/home';
import { Navbar } from './components/navbar/navbar';
import { Courses } from './components/courses/courses';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home, Navbar, Courses],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('school-client-standalone');
}
