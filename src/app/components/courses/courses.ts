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
    // Since the getCourses() returns an Observable object, we need to use subscribe handle the data
    this.service.getCourses().subscribe((response) => {
      this.courses = response; // assign response (array of courses) to local courses property
    });
  }

  deleteCourse(id: number) {
    this.service.deleteCourse(id).subscribe((response: ICourse) => {
      // find course in courses array using id field
      let course = this.courses.find((c) => c.id === response.id);

      // if course not found, return
      if (!course) return;

      // remove the course from courses array
      // found the course, remove it from our array
      this.courses.splice(this.courses.indexOf(course), 1);
    });
  }
}
