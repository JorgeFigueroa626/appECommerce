import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/services/admin.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit{

  orders:any;

  constructor(
    private _adminService:AdminService,
    private _orderService:OrderService,
    private _snackBar:MatSnackBar
  ){}

  ngOnInit(): void {
    this.getPlacedOrders();
  }

  getPlacedOrders(){
    this._orderService.getPlaceOrders().subscribe(
      (data) =>{
        this.orders = data;
        console.log(data);
        
      }
    )
  }

  changeOrderStatus(orderId:number, status:string){
    this._orderService.changeOrderStatus(orderId, status).subscribe(
      rep =>{
        if (rep.id != null) {
          this._snackBar.open('Order status changed successfully', 'OK', {duration:3000});
          this.getPlacedOrders();
        } else {
          this._snackBar.open('Something went wrong', 'Close', {duration: 3000})
        }
      }
    )
  }

}
