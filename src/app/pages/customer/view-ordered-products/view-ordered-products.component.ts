import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-view-ordered-products',
  templateUrl: './view-ordered-products.component.html',
  styleUrls: ['./view-ordered-products.component.scss']
})
export class ViewOrderedProductsComponent implements OnInit{

  orderId: any = this._route.snapshot.params['orderId'];
  orderedProductDetailsList = [];
  totalAmount:any;

  constructor(
    private _route:ActivatedRoute,
    private _customerService: CustomerService
  ){}

  ngOnInit(): void {
    this.getOrderedProdcutsDetailsOrderId();
  }

  getOrderedProdcutsDetailsOrderId(){
    this._customerService.getOrderedProducts(this.orderId).subscribe(
      (resp) => {
        resp.productDtoList.forEach(element => {
          element.processedImg = 'data:image/jpg;base64,' + element.byteImg;
          this.orderedProductDetailsList.push(element);
        });
        this.totalAmount = resp.orderAmount;
      }
    )
  }

}
