import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../shared/services/auth';
import { Router } from '@angular/router';



@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css'
})

export class Registration implements OnInit {
  @Output() switchForm = new EventEmitter<'login' | 'register'>();
  form!: FormGroup;
  submitted = false;

  errorMessage = '';
  successMessage = '';

  constructor(private formBuilder: FormBuilder, private auth: Auth, private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      this.errorMessage = 'Por favor corrige los errores del formulario.';
      return;
    }

    const { confirmPassword, ...userData } = this.form.value;
    this.auth.register(userData).subscribe({
      next: (res: any): void => {
        this.successMessage = res.message;
        this.errorMessage = '';
        this.form.reset();
        this.submitted = false;
        this.switchForm.emit('login');

      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al registrar el usuario.';
        this.successMessage = '';
        console.error(err);
      }
    });
  }

  switchToLogin() {
    this.switchForm.emit('login');
  }
}
