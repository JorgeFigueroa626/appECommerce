import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit{

  orderForm!:FormGroup

  constructor(
    private _fb:FormBuilder,
    private _snackBar:MatSnackBar,
    private _customerService: CustomerService,
    private _router:Router,
    private _dialog:MatDialog
  ){}


  ngOnInit(): void {
    this.orderForm = this._fb.group({
      address: [null, [Validators.required]],
      orderDescription: [null]
    })
  }

  placeOrder(){
    this._customerService.placeOrder(this.orderForm.value).subscribe(
      (resp) => {
        if (resp.id != null) {
          this._snackBar.open('Order placed successfully', 'OK',{duration:3000});
          this._router.navigateByUrl('/customer/my-orders');
          this.closeForm();
        } else {
          this._snackBar.open('Something went wrong', 'Close', {duration: 3000})
        }
      }
    )
  }

  closeForm(){
    this._dialog.closeAll();
  }

}
