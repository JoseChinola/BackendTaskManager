import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface User {
  email: string,
  password: string,
  fullName: string
}

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private apiUrl = 'http://localhost:5201/api/auth';
  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post(`${this.apiUrl}/register`, user)
  }
  
  login(user: User) {
    return this.http.post(`${this.apiUrl}/login`, user)
  }
}
