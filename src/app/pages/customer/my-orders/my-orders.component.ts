import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit{


  myOrders:any;

  constructor(private _customerService:CustomerService){}


  ngOnInit(): void {
    this.getMyOrders();
  }

  getMyOrders(){
    this._customerService.getOrdersByUserId().subscribe(
      (data) => {
        this.myOrders = data;
      }
    )
  }

}
