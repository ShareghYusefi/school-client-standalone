import { Routes } from '@angular/router';
import { Courses } from './components/courses/courses';
import { Home } from './components/home/home';
import { NotFound } from './components/not-found/not-found';

export const routes: Routes = [
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
