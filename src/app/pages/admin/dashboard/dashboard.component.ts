import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/services/admin.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  searchProductForm!: FormGroup;

  constructor(
    private _adminService: AdminService,
    private _productService: ProductService,
    private _categoryService: CategoryService,
    private _fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllProducts(), 
    this.getAllCategories();
    this.searchProductForm = this._fb.group({
      title: [null, [Validators.required]],
    });
    this.ngSubmit();
  }

  ngSubmit() {
    this.products = [];
    const title = this.searchProductForm.get('title')!.value;
    this._productService.getAllProductsByName(title).subscribe((data) => {
      data.forEach((element:any) => {
        element.processedImg = 'data:image/jpg;base64,' + element.byteImg;
        this.products.push(element);
      });
    });
  }

  getAllProducts() {
    this.products = [];
    this._productService.getAllProducts().subscribe((data) => {
      data.forEach((element) => {
        element.processedImg = 'data:image/jpg;base64,' + element.byteImg;
        this.products.push(element);
        //console.log(element);
      });
    });
  }

  getAllCategories(){
    this._categoryService.getAllCategories().subscribe(
      (resp)=>{
        this.categories = resp;
      }
    )
  }

  deleteByProductId(productId: number) {
    this._productService.deleteByProductId(productId).subscribe((data) => {
      if (data?.body == null) {
        this._snackBar.open('Product delete Successfully!', 'Ok', {
          duration: 3000,
        });
        this.getAllProducts();
      } else {
        this._snackBar.open(data.message, 'Close', {
          duration: 3000,
          panelClass: 'error-snackbar',
        });
      }
    });
  }
}
