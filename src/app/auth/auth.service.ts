import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private uri = 'http://localhost:3434/api/users';

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
}
