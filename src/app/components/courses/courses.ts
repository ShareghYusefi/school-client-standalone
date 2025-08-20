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
  // Non-null Assertion Operator (!) lets typescript know that a value will be provided
  courses!: ICourse[];

  // Dependency Injection
  constructor(private service: CourseService) {}

  ngOnInit(): void {
    // initialize courses array with data from service class
    this.courses = this.service.getCourses();
  }

  deleteCourse(id: number) {
    // find the index of course with given id
    let index = this.courses.findIndex((course) => course.id === id);
    // index of -1 returns when no matching record is found
    if (index === -1) {
      return; // exits function at this line
    }

    // found the course, remove it from our array
    this.courses.splice(index, 1);
  }
}
