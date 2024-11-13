import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from 'src/app/services/customer.service';
import { PlaceOrderComponent } from '../place-order/place-order.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  carItems: any[] = [];
  order: any;

  couponForm!: FormGroup;

  constructor(
    private _customerService: CustomerService,
    private _snackBar: MatSnackBar,
    private _fb: FormBuilder,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.couponForm = this._fb.group({
      code: [null, [Validators.required]],
    });
    this.getCart();
  }

  //////////////////////////////
  getCart() {
    this.carItems = [];
    this._customerService.getCartByUserId().subscribe((resp) => {
      this.order = resp;
      resp.carItems.forEach((element) => {
        element.processedImg = 'data:image/jpg;base64,' + element.returnedImg;
        this.carItems.push(element);
      });
    });
  }
  // getCart() {
  //   this._customerService.getCartByUserId().subscribe((resp) => {
  //     this.order = resp;
  //     this.carItems = (resp.carItems || []).map((element:any) => ({
  //       ...element,
  //       processedImg: 'data:image/jpg;base64,' + element.returnedImg
  //     }));
  //   });
  // }


  applyCoupon() {
    this._customerService
      .applyCouponByCode(this.couponForm.get(['code'])!.value)
      .subscribe(
        (resp) => {
          this._snackBar.open('Coupon Applied Successfully', 'OK', {
            duration: 3000,
          });
          this.getCart();
        },
        (error) => {
          this._snackBar.open(error.message, 'ERROR', { duration: 3000 });
        }
      );
  }

  increaseQuantity(productId: any) {
    this._customerService
      .increaseProductQuantity(productId)
      .subscribe((resp) => {
        this._snackBar.open('Product quantity increase.', 'OK', {
          duration: 3000,
        });
        this.getCart();
      });
  }

  decreaseQuantity(productId: any) {
    this._customerService
      .decreaseProductQuantity(productId)
      .subscribe((resp) => {
        this._snackBar.open('Product quantity decrease.', 'OK', {
          duration: 3000,
        });
        this.getCart();
      });
  }

  placeOrder() {
    this._dialog.open(PlaceOrderComponent);
  }
}
