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
  step = 1; // current step
  courseForm!: FormGroup;

  // We can use a FormBuilder instance via Dependency injection to create a form group
  constructor(
    private formBuilderInstance: FormBuilder,
    private route: ActivatedRoute,
    private service: Courses
  ) {
    // create a form group with two form controls: name, level
    this.courseForm = this.formBuilderInstance.group({
      step1: this.formBuilderInstance.group({
        id: [0],
        name: ['', [Validators.required, Validators.minLength(2)]],
      }),
      step2: this.formBuilderInstance.group({
        level: ['', [Validators.required, Validators.min(100)]],
      }),
    });
  }

  getStepGroup(step: number): FormGroup {
    return this.courseForm.get(`step${step}`) as FormGroup;
  }

  next() {
    if (this.getStepGroup(this.step).valid) {
      this.step++;
    } else {
      this.getStepGroup(this.step).markAllAsTouched();
    }
  }

  prev() {
    this.step--;
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
              step1: {
                id: response.id,
                name: response.name,
              },
              step2: {
                level: response.level,
              },
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
    return this.getStepGroup(1).get('name');
  }

  get level() {
    return this.getStepGroup(2).get('level');
  }

  onSubmit() {
    if (this.courseForm.invalid) {
      return;
    }

    // iterate over courseForm controls and make a new object with form values
    let newCourse: ICourse = {
      id: this.getStepGroup(1).get('id')?.value,
      name: this.getStepGroup(1).get('name')?.value,
      level: this.getStepGroup(2).get('level')?.value,
    };

    console.log('New Course:', newCourse);

    // check if we have an id in our URL
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // update the course data
      this.service.updateCourse(parseInt(id), newCourse).subscribe(
        (response: ICourse) => {
          console.log('Course Updated:', response);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      // create a new course
      this.service.addCourse(newCourse).subscribe(
        (response: ICourse) => {
          console.log('Course Added:', response);

          // reset form
          this.courseForm.reset();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
