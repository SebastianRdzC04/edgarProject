import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthServiceService } from '../../services/auth.service.service';
import { loginModel, registerModel } from '../../models/auth.model';

@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent {
  private authService = inject(AuthServiceService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  mode: 'login' | 'register' = 'login';
  loading = false;
  errorMsg = '';
  successMsg = '';

  form = this.fb.group({
    name: new FormControl('', []), // solo requerido en register
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  private updateNameValidators() {
    if (this.mode === 'register') {
      this.form.get('name')?.setValidators([Validators.required]);
    } else {
      this.form.get('name')?.clearValidators();
    }
    this.form.get('name')?.updateValueAndValidity();
  }

  switchMode() {
    this.errorMsg = '';
    this.successMsg = '';
    this.mode = this.mode === 'login' ? 'register' : 'login';
    this.updateNameValidators();
    this.form.reset();
  }

  submit() {
    this.errorMsg = '';
    this.successMsg = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMsg = 'Por favor completa todos los campos correctamente.';
      return;
    }
    this.loading = true;
    if (this.mode === 'login') {
      this.login();
    } else {
      this.register();
    }
  }

  login() {
    const { email, password } = this.form.value;
    const loginData: loginModel = {
      email: email!,
      password: password!
    };
    this.authService.login(loginData).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: () => {
        this.loading = false;
        this.errorMsg = 'Error al iniciar sesión. Verifica tus datos.';
      }
    });
  }

  register() {
    const { name, email, password } = this.form.value;
    const registerData: registerModel = {
      fullName: name!,
      email: email!,
      password: password!
    };
    this.authService.register(registerData).subscribe({
      next: () => {
        this.loading = false;
        this.successMsg = 'Registro exitoso. Ahora puedes iniciar sesión.';
        this.mode = 'login';
        this.updateNameValidators();
        this.form.reset();
        setTimeout(() => {
          const emailInput = document.getElementById('email');
          if (emailInput) (emailInput as HTMLInputElement).focus();
        }, 0);
      },
      error: () => {
        this.loading = false;
        this.errorMsg = 'Error al registrarse. Intenta con otro correo.';
      }
    });
  }
}
