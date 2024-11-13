import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  products: any[] = [];
  searchProductForm!: FormGroup;

  constructor(
    private _customerService: CustomerService,
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.searchProductForm = this._fb.group({
      title: [null, [Validators.required]],
    });
    this.getAllProducts();
    this.ngSubmit();
  }

  
  getAllProducts() {
    this.products = [];
    this._customerService.getAllProducts().subscribe((data) => {
      data.forEach((element) => {
        element.processedImg = 'data:image/jpg;base64,' + element.byteImg;
        this.products.push(element);
        console.log(element);
      });
    });
  }

  ngSubmit() {
    this.products = [];
    const title = this.searchProductForm.get('title')!.value;
    this._customerService.getAllProductByName(title).subscribe((data) => {
      data.forEach((element) => {
        element.processedImg = 'data:image/jpg;base64,' + element.byteImg;
        this.products.push(element);
      });
    });
  }

  addToCart(id: any) {
    this._customerService.addToCart(id).subscribe(
      (data) => {
        this._snackBar.open('Product added to cart successfully!', 'OK', {
          duration: 3000,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
