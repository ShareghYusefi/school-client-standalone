import { JsonPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Courses } from '../../services/courses';
import { ICourse } from '../../interfaces/icourse';

@Component({
  selector: 'app-course-form',
  imports: [JsonPipe, ReactiveFormsModule, NgIf],
  templateUrl: './course-form.html',
  styleUrl: './course-form.css',
})
export class CourseForm implements OnInit {
  courseForm!: FormGroup;

  // We can use a FormBuilder instance via Dependency injection to create a form group
  constructor(
    private formBuilderInstance: FormBuilder,
    private route: ActivatedRoute,
    private service: Courses
  ) {
    // create a form group with two form controls: name, level
    this.courseForm = this.formBuilderInstance.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      level: ['', [Validators.required, Validators.min(100)]],
    });
  }

  ngOnInit(): void {
    // get the course id from current URL via paramMap observable object
    this.route.paramMap.subscribe((params) => {
      // check if id is present in params
      let id = params.get('id');
      // If id is present, we can use it to get the course data from our API
      if (id) {
        // get course data using couse service class
        this.service.getCourse(parseInt(id)).subscribe(
          (response: ICourse) => {
            // update the form with course data
            this.courseForm.patchValue({
              name: response.name,
              level: response.level,
            });
          },
          (error) => {
            console.log(error);
          }
        );
      }
    });
  }

  // getter for loginFrom name formControl
  get name() {
    return this.courseForm.get('name');
  }

  get level() {
    return this.courseForm.get('level');
  }

  onSubmit() {
    if (this.courseForm.valid) {
      console.log(this.courseForm.value);
    }
  }
}
