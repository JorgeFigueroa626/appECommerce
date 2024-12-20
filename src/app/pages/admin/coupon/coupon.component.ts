import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { CouponService } from 'src/app/services/coupon.service';
import { PostCouponComponent } from '../post-coupon/post-coupon.component';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit{


  couponForm!: FormGroup;
  coupons:any;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _adminService: AdminService,
    private _couponService: CouponService,
    private _dialog:MatDialog
  ){}


  ngOnInit(): void {
    this.couponForm = this._fb.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      discount: [null, [Validators.required]],
      expirationDate: [null, [Validators.required]],
    });
    this.getAllCoupons();
  }

  openDialog() {
    const dialogRef = this._dialog.open(PostCouponComponent, {
      width: '30%',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  addCoupon() {
    if (this.couponForm.valid) {
      this._couponService.addCoupons(this.couponForm.value).subscribe((data) => {
        if (data.id != null) {
          this._snackBar.open('Coupon Posted Successfully.', 'OK', {
            duration: 3000,
          });
          this.closeDialog();
          this.getAllCoupons();
          //this._router.navigateByUrl('/admin/dashboard');
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

  closeDialog(){
    this._dialog.closeAll()
  }
  

  getAllCoupons(){
    this._couponService.getAllCoupons().subscribe(
      (data) => {
        this.coupons = data;
      }
    )
  }

  deleteByCouponId(couponId:number){
    this._couponService.deleteByCouponId(couponId).subscribe(
      (resp)=>{
        this.coupons = this.coupons.filter((coup:any) => coup.couponId != couponId);
        this._snackBar.open('Coupon delete successfully', 'OK', {duration: 3000})
        this.getAllCoupons();
      },(error)=>{
        this._snackBar.open(error.message, 'Error delete coupon', {duration: 3000})
      }
    )
  }

}
