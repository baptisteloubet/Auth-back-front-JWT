import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {User } from '../models/User'

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) { }

  // User registration
  register(user: User): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/auth/register', user);
  }

  // Login
  signin(user: User): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/auth/login', user);
  }

  // Access user profile
  profileUser(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/auth/user-profile');
  }

  //Reset password
  sendResetPasswordLink(data: any) {
    return this.http.post('http://127.0.0.1:8000/api/auth/reset-password-request', data)
  }

  resetPassword(data:any) {
    return this.http.post('http://127.0.0.1:8000/api/auth/change-password', data)
  }
}
