import { Component } from '@angular/core';
import { Courses as CourseService } from '../../services/courses';
import { Course } from '../course/course';
import { ICourse } from '../../interfaces/icourse';

@Component({
  selector: 'courses',
  imports: [Course],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses {
  courses: ICourse[];

  // Dependency Injection
  constructor(service: CourseService) {
    // initialize courses array with data from service class
    this.courses = service.getCourses();
  }
}
