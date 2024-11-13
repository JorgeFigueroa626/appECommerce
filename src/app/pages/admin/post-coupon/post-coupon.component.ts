import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { CouponService } from 'src/app/services/coupon.service';

@Component({
  selector: 'app-post-coupon',
  templateUrl: './post-coupon.component.html',
  styleUrls: ['./post-coupon.component.scss'],
})
export class PostCouponComponent implements OnInit {
  couponForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _adminService: AdminService,
    private _couponService:CouponService
  ) {}

  ngOnInit(): void {
    this.couponForm = this._fb.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      discount: [null, [Validators.required]],
      expirationDate: [null, [Validators.required]],
    });
  }

  addCoupon() {
    if (this.couponForm.valid) {
      this._couponService.addCoupons(this.couponForm.value).subscribe((data) => {
        if (data.id != null) {
          this._snackBar.open('Coupon Posted Successfully.', 'OK', {
            duration: 3000,
          });
          this._router.navigateByUrl('/admin/dashboard');
        } else {
          this._snackBar.open(data.message, 'Close', {
            duration: 3000,
            panelClass: 'error-snackbar',
          });
        }
      });
    } else {
      this.couponForm.markAllAsTouched();
    }
  }
}
