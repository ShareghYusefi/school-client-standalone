import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl; // localhost:3000
  private tokenKey = 'jwt_token';

  // function for tracking login state via token
  private isLoggedIn(): boolean {
    // check if token is set
    if (!this.tokenKey) {
      return false;
    }
    // alternatively we could decode the token
    return true;
  }

  // BehaviorSubject tracks the returned state from isLoggedIn()
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return (
      this.http
        .post<any>(`${this.apiUrl}/login`, {
          email, // shorthand for email: email
          password, // shorthand for password: password
        })
        // pipe is used to handle response
        .pipe(
          // tap allows us to perform a side effect like updating the login state
          tap((response: { message: string; token: string }) => {
            if (response && response.token) {
              // update login state
              this.isLoggedInSubject.next(true);
            }
          })
        )
    );
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, {
      email, // shorthand for email: email
      password, // shorthand for password: password
    });
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
