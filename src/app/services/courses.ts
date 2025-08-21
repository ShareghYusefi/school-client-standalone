import { Injectable } from '@angular/core';
import { ICourse } from '../interfaces/icourse';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Courses {
  // private courses: ICourse[] = [
  //   { id: 1, name: 'Math', level: 101 },
  //   { id: 1, name: 'Science', level: 101 },
  //   { id: 1, name: 'Biology', level: 100 },
  // ];

  // We can use a intance of HttpClient object to make API calls for data
  // This is accomplished by importing provideHttpClient module
  constructor(private httpClientInstance: HttpClient) {}

  getCourses(): Observable<ICourse[]> {
    // We can use < > to specify the type of data we expect from the API call
    return this.httpClientInstance.get<ICourse[]>(
      'http://localhost:3000/courses'
    );
  }
}
