import { Component, Input } from '@angular/core';
import { ICourse } from '../../interfaces/icourse';

@Component({
  selector: 'course',
  imports: [],
  templateUrl: './course.html',
  styleUrl: './course.css',
})
export class Course {
  @Input() course: ICourse | undefined;
}
