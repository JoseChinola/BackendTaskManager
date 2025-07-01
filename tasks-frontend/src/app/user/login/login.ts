import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../shared/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  constructor(public formBuilder: FormBuilder, private auth: Auth, private router: Router) { }
  form!: FormGroup;

  @Output() switchForm = new EventEmitter<'login' | 'register'>();
  errorMessage = '';
  successMessage = '';

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  switchToRegister() {
    this.switchForm.emit('register');
  }

  onSubmit() {
    this.auth.login(this.form.value).subscribe({
      next: (res: any) => {
        this.successMessage = res.message;
        setTimeout(() => {
          this.successMessage = '';
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al iniciar sesión.';
        console.error(err.error?.message);
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);
      }
    })
  }
}
