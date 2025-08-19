import { Component, OnInit } from '@angular/core';
import { Courses as CourseService } from '../../services/courses';
import { Course } from '../course/course';
import { ICourse } from '../../interfaces/icourse';

@Component({
  selector: 'courses',
  imports: [Course],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses implements OnInit {
  // ! lets typescript know that a value will be provided
  courses!: ICourse[];

  // Dependency Injection
  constructor(private service: CourseService) {}

  ngOnInit(): void {
    // initialize courses array with data from service class
    this.courses = this.service.getCourses();
  }
}
