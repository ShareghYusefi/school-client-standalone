import { Routes } from '@angular/router';
import { Courses } from './components/courses/courses';
import { Home } from './components/home/home';
import { NotFound } from './components/not-found/not-found';
import { CourseForm } from './components/course-form/course-form';
import { LoginForm } from './components/login-form/login-form';
import { RegisterForm } from './components/register-form/register-form';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: 'courses/:id',
    component: CourseForm,
    canActivate: [authGuard],
  },
  {
    path: 'courses',
    component: Courses,
    canActivate: [authGuard],
  },
  // login
  {
    path: 'login',
    component: LoginForm,
  },
  {
    path: 'register',
    component: RegisterForm,
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
