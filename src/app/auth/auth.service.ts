import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  constructor(
    private http: HttpClient,
  ) { }

  createUser(email: string, password: string, username: string) {
    const authData: AuthData = {
      email: email,
      password: password,
      userName: username,
    };
    this.http.post(
      `${this.uri}/signup`,
      authData
    )
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
  }

  loginUser(email: string, password: string) {
    const authData: AuthData = {
      email: email,
      password: password,
    };
    this.http.post<{token: string}>(
      `${this.uri}/signin`,
      authData
    )
      .subscribe(
        (response) => {
          const token = response.token;
          this.token = token;
          if(token) {
            this.authStatusListener.next(true);
            this.isAuthenticated = true;
          }
        }
      );
  }

  logoutUser() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
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
