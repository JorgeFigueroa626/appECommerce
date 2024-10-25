import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit{


  coupons:any;

  constructor(
    private _adminService: AdminService,
  ){}


  ngOnInit(): void {
    this.getCoupons();
  }

  getCoupons(){
    this._adminService.getAllCoupons().subscribe(
      (data) => {
        this.coupons = data;
      }
    )
  }

}
