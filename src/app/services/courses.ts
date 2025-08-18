import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Courses {
  private courses: string[] = ['Math 101', 'Science 101', 'Biology 100'];

  constructor() {}

  getCourses() {
    // Typically make call to API for all courses, but will use in memory array for now.
    return this.courses;
  }
}
