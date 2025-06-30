import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../shared/services/auth';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css'
})
export class Registration implements OnInit {
  form!: FormGroup;
  submitted = false;

  // 🔧 Añade estas dos propiedades
  errorMessage = '';
  successMessage = '';

  constructor(private formBuilder: FormBuilder, private auth: Auth) { }

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

    const { confirmPassword, ...userData } = this.form.value; // omitimos confirmPassword

    this.auth.register(userData).subscribe({
      next: (res) => {
        this.successMessage = 'Usuario registrado correctamente.';
        this.errorMessage = '';
        this.form.reset();
        this.submitted = false;
      },
      error: (err) => {
        this.errorMessage = 'Hubo un error al registrar el usuario.';
        this.successMessage = '';
        console.error(err);
      }
    });
  }
}
