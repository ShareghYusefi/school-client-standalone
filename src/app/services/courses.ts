import { Injectable } from '@angular/core';
import { ICourse } from '../interfaces/icourse';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Courses {
  private API_URL = environment.apiUrl; // localhost:3000

  // We can use a intance of HttpClient object to make API calls for data
  // This is accomplished by importing provideHttpClient module
  constructor(private httpClientInstance: HttpClient) {}

  getCourses(): Observable<ICourse[]> {
    // We can use < > to specify the type of data we expect from the API call
    return this.httpClientInstance.get<ICourse[]>(this.API_URL + '/courses');
  }

  getCourse(id: number): Observable<ICourse> {
    // We can use < > to specify the type of data we expect from the API call
    return this.httpClientInstance.get<ICourse>(
      this.API_URL + '/courses/' + id
    );
  }

  addCourse(course: ICourse | FormData): Observable<ICourse> {
    // We can use < > to specify the type of data we expect from the API call
    return this.httpClientInstance.post<ICourse>(
      this.API_URL + '/courses',
      course
    );
  }

  updateCourse(
    id: number,
    updatedCourse: ICourse | FormData
  ): Observable<ICourse> {
    // We can use < > to specify the type of data we expect from the API call
    return this.httpClientInstance.patch<ICourse>(
      this.API_URL + '/courses/' + id,
      updatedCourse
    );
  }

  deleteCourse(id: number): Observable<ICourse> {
    // We can use < > to specify the type of data we expect from the API call
    return this.httpClientInstance.delete<ICourse>(
      this.API_URL + '/courses/' + id
    );
  }
}
