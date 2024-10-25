import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-tracking-order',
  templateUrl: './tracking-order.component.html',
  styleUrls: ['./tracking-order.component.scss'],
})
export class TrackingOrderComponent implements OnInit {

  searchOrderForm!: FormGroup;
  order: any;

  constructor(private fb: FormBuilder, private customerService: CustomerService) {}

  ngOnInit(): void {
    this.searchOrderForm = this.fb.group({
      trackingId: [null, [Validators.required]],
    });
  }

  submitForm(){
    this.customerService.getOrderByTrackingId(this.searchOrderForm.get('trackingId').value).subscribe(
      resp => {
        console.log(resp);
        this.order = resp;
      }
    )
  }
}
