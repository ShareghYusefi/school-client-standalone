import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm implements OnInit {
  // ! tells TypeScript that this property will be initialized later
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    // Initialize form or fetch data if needed
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form Submitted!', this.email?.value, this.password?.value);
      this.authService
        .login(this.email?.value, this.password?.value)
        .subscribe({
          // next is called on success
          next: (response) => {
            console.log('Login successful');
            // Store the JWT token in localStorage within browser
            localStorage.setItem('jwt_token', response.token);
          },
          error: (err) => console.error('Login failed', err),
        });
    } else {
      console.log('Form is invalid');
    }
  }
}
