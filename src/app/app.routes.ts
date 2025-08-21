import { Routes } from '@angular/router';
import { Courses } from './components/courses/courses';
import { Home } from './components/home/home';
import { NotFound } from './components/not-found/not-found';
import { CourseForm } from './components/course-form/course-form';

export const routes: Routes = [
  {
    path: 'courses/:id',
    component: CourseForm,
  },
  {
    path: 'courses',
    component: Courses,
  },
  {
    path: 'home',
    component: Home,
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '**',
    component: NotFound,
  },
];
