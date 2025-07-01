import { Component } from '@angular/core';
import { Registration } from "./registration/registration";
import { Login } from "./login/login";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [CommonModule, Registration, Login],
  templateUrl: './user.html',
  styleUrl: './user.css'
})
export class User {
  activeForm: 'login' | 'register' = 'login';
}
