import { Injectable } from '@angular/core';
import { ICourse } from '../interfaces/icourse';

@Injectable({
  providedIn: 'root',
})
export class Courses {
  private courses: ICourse[] = [
    { id: 1, name: 'Math', level: 101 },
    { id: 1, name: 'Science', level: 101 },
    { id: 1, name: 'Biology', level: 100 },
  ];

  constructor() {}

  getCourses() {
    // Typically make call to API for all courses, but will use in memory array for now.
    return this.courses;
  }
}
