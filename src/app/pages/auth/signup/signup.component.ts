import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!:FormGroup;
  hidePassword = true;

  constructor(
    private _fb:FormBuilder,
    private _snackBar:MatSnackBar,
    private _router:Router,
    private _authService: AuthService
  ){}


  ngOnInit(): void {
    this.signupForm = this._fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]

    })
  }

  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword;
  }

  onSubmit():void{
    const password = this.signupForm.get('password')?.value;
    const confirmPassword = this.signupForm.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this._snackBar.open('Password do not match.', 'Close', {duration: 3000, panelClass: 'error-snackbar'})
      return;
    }

    this._authService.register(this.signupForm.value).subscribe(
      (response) => {
        this._snackBar.open('Sign Up successful!', 'Close', {duration: 3000});
        this._router.navigateByUrl('/login')
      },
      (error) => {
        this._snackBar.open('Sign up failed. Please try again.', 'Close', {
          duration: 3000, panelClass: 'error-snackbar'})
      }
    )

  }


}
