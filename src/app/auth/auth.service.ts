import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private uri = 'http://localhost:3434/api/users';
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private tokenTimer: any;
  isSignupSuccess = false;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  createUser(email: string, password: string, username: string) {
    const authData: AuthData = {
      email: email,
      password: password,
      userName: username,
    };
    this.http.post<{message: string}>(
      `${this.uri}/signup`,
      authData
    )
      .subscribe(
        (response) => {
          // console.log(response);
          (response.message) ? this.isSignupSuccess = true : this.isSignupSuccess = false;
        }
      );
  }

  loginUser(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password,
    };
    this.http.post<{token: string, expiresIn: number}>(
      `${this.uri}/signin`,
      authData
    )
      .subscribe(
        (response) => {
          const token = response.token;
          this.token = token;
          if(token) {
            const expiresInDuration = response.expiresIn;
            console.log(expiresInDuration);
            this.tokenTimer = setTimeout(
              () => {
                this.logoutUser();
              }, expiresInDuration * 1000
            );
            this.authStatusListener.next(true);
            this.isAuthenticated = true;
            this.router.navigate(['/']);
          }
        }
      );
  }

  logoutUser() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
    clearTimeout(this.tokenTimer);
  }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }
}
