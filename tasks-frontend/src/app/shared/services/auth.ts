import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
    return this.http.post(`${this.apiUrl}/login`, user, {
      withCredentials: true
    });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, {
      withCredentials: true
    });
  }


  getPerfil(): Observable<{ email: string; fullName: string }> {
    return this.http.get<{ email: string; fullName: string }>(`${this.apiUrl}/perfil`, {
      withCredentials: true
    });
  }
}
