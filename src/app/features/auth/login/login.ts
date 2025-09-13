import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  constructor(private http: HttpClient, private router: Router) {}

  email: string = '';
  password: string = '';
  token: string = '';
  refreshToken: string = '';
  rememberMe: boolean = true;
  showPassword: boolean = false;
  loading: boolean = false;
  error: string = '';
  submitted: boolean = false;

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.submitted = true;
    this.error = '';

    if (!this.email || !this.password) {
      this.error = 'Please enter email and password';
      return;
    }

    this.loading = true;

    // Call your .NET API
    this.http
      .post<{ token: string; refreshToken: string; expiresIn: number }>(
        'http://localhost:7249/api/Auth/login',
        {
          email: this.email,
          password: this.password,
          rememberMe: this.rememberMe,
        }
      )
      .subscribe({
        next: (response) => {
          this.loading = false;

          // Store access token
          localStorage.setItem('token', response.token);
          localStorage.setItem('refreshToken', response.refreshToken);

          // Redirect to dashboard
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.loading = false;
          this.error = 'Invalid email or password';
          console.error(err);
        },
      });
  }
}
