import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Courses } from '../../services/courses';
import { ICourse } from '../../interfaces/icourse';
import { FileService } from '../../services/file-service';
import { IFile } from '../../interfaces/ifile';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-course-form',
  imports: [JsonPipe, ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './course-form.html',
  styleUrl: './course-form.css',
})
export class CourseForm implements OnInit {
  apiUrl = environment.apiUrl;
  step = 1; // current step
  courseForm!: FormGroup;
  files: any[] = []; // Can be native File or IFile objects

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  levels: string[] = ['100', '200', '300'];

  // We can use a FormBuilder instance via Dependency injection to create a form group
  constructor(
    private formBuilderInstance: FormBuilder,
    private route: ActivatedRoute,
    private service: Courses,
    private fileService: FileService,
    private router: Router
  ) {
    // create a form group with two form controls: name, level
    this.courseForm = this.formBuilderInstance.group({
      step1: this.formBuilderInstance.group({
        id: [0],
        cover: [null],
        name: ['', [Validators.required, Validators.minLength(2)]],
      }),
      step2: this.formBuilderInstance.group({
        level: [[], [Validators.required]],
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
    // assign files signal value to local files array
    this.files = this.fileService.files();

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
            this.getStepGroup(1).patchValue({
              id: response.id,
              cover: '',
              name: response.name,
            });

            this.getStepGroup(2).patchValue({
              level: response.level,
            });
            // update local files array with existing course files
            this.files = response.files ? response.files : [];
            // update files signal in file service
            this.fileService.files.set(this.files);
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

  get cover() {
    return this.getStepGroup(1).get('cover');
  }

  get level() {
    return this.getStepGroup(2).get('level');
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.fileService.addFiles(input.files);
      // update local files array
      this.files = this.fileService.files();
      // update input value to an empty string to allow re-upload of the same file
      input.value = '';
      // update reactive form control for cover
      // this.getStepGroup(1).patchValue({
      //   cover: this.files[0],
      // });
      // check the updateValueAndValidity() method to trigger validation
      // this.getStepGroup(1).get('cover')?.updateValueAndValidity();
    }
  }

  remove(file: File | IFile) {
    this.fileService.removeFile(file);
    // update local files array
    this.files = this.fileService.files();
  }

  onSubmit() {
    if (this.courseForm.invalid) {
      return;
    }

    // create a formData object to allow file upload
    let formData = new FormData();
    formData.append('id', this.getStepGroup(1).get('id')?.value);
    formData.append('name', this.getStepGroup(1).get('name')?.value);
    formData.append('level', this.getStepGroup(2).get('level')?.value);

    // append the cover file if it exists
    // const coverFile = this.getStepGroup(1).get('cover')?.value;
    // if (coverFile && coverFile instanceof File) {
    //   formData.append('cover', coverFile);
    // }

    // append files to formData
    this.files.forEach((file) => {
      formData.append('files', file as Blob);
    });

    console.log('New Course:', formData);

    // check if we have an id in our URL
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // update the course data
      this.service.updateCourse(parseInt(id), formData).subscribe(
        (response: ICourse) => {
          console.log('Course Updated:', response);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      // create a new course
      this.service.addCourse(formData).subscribe(
        (response: ICourse) => {
          console.log('Course Added:', response);

          // reset form
          this.courseForm.reset();
          this.fileInput.nativeElement.value = '';
          this.step = 1;
          // clear files from file service
          this.fileService.clearAll();
          // redirect to home
          this.router.navigate(['/']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
