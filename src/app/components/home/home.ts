import { Component } from '@angular/core';
import { CourseForm } from '../course-form/course-form';

@Component({
  selector: 'app-home',
  imports: [CourseForm],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
