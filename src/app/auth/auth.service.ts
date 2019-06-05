import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private uri = 'http://localhost:3434/api/users';
  private token: string;

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
        }
      );
  }

  getToken() {
    return this.token;
  }
}