import { Component } from '@angular/core';
import { Courses as CourseService } from '../../services/courses';

@Component({
  selector: 'courses',
  imports: [],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses {
  courses: string[];

  // Dependency Injection
  constructor(service: CourseService) {
    // initialize courses array with data from service class
    this.courses = service.getCourses();
  }
}
