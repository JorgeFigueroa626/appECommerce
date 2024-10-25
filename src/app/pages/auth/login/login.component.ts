import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserStorageService } from '../storage/user-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword = true;

  constructor(
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    const username = this.loginForm.get('email')!.value;
    const password = this.loginForm.get('password')!.value;

    this._authService.login(username, password).subscribe(
      (resp) => {
        if (UserStorageService.isAdminLoggedIn()) {
          this._router.navigateByUrl('admin/dashboard');
          // this._snackBar.open('Login Success', 'Ok', { duration: 5000 });
        } else if (UserStorageService.isUserLoggetIn()) {
          this._router.navigateByUrl('customer/dashboard');
          // this._snackBar.open('Login Success', 'Ok', { duration: 5000 });
        }
      },
      (error) => {
        this._snackBar.open('Bad Credentials.', 'ERROR', { duration: 3000 });
      }
    );
  }
}
