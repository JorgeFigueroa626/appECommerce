import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{


  productForm!:FormGroup;
  categories: any = [];
  products: any = [];
  product:any;
  selectFile:File | null;
  imagePreview: string | ArrayBuffer | null;

  constructor(
    private _fb:FormBuilder,
    private _router:Router,
    private _snackBar:MatSnackBar,
    private _adminService: AdminService,
    private _productService: ProductService,
    private _categoryService: CategoryService,

  ){}

  onFileSelected(event:any){
    this.selectFile = event.target.files[0];
    this.previewImage();
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectFile);
  }

  ngOnInit(): void {
    this.productForm = this._fb.group({
      categoryId: [null, [Validators.required]],
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });

    this.getAllCategories();
    this.getAllProducts();
  }

  getAllCategories(){
    this._categoryService.getAllCategories().subscribe(
      (data)=> {
        this.categories = data;
      }
    )
  }

  addProduct(): void{
    if (this.productForm.valid) {
      const formData : FormData = new FormData();
      formData.append('img', this.selectFile);
      formData.append('categoryId', this.productForm.get('categoryId').value)
      formData.append('name', this.productForm.get('name').value);
      formData.append('description', this.productForm.get('description').value);
      formData.append('price', this.productForm.get('price').value);

      this._productService.addProduct(formData).subscribe(
        (data) => {
          if (data.id != null) {
            this._snackBar.open('Product Posted Successfully', 'OK',{duration: 3000});
          this._router.navigateByUrl('admin/dashboard');
          } else {
            this._snackBar.open(data.message, 'ERROR', {duration: 3000});
          }
        }
      )
    } else {
      for(const i in this.productForm.controls){
        this.productForm.controls[i].markAsDirty();
        this.productForm.controls[i].updateValueAndValidity();
      }
    }
  }

  getAllProducts(){
    this._productService.getAllProducts().subscribe(
      (resp) =>{
        resp.forEach((element) => {
          element.processedImg = 'data:image/jpg;base64,' + element.byteImg;
          this.products.push(element);
          //console.log(element);
        });
        this.products = resp;
        console.log(this.products);
        
      }
    )
  }

  deleteByProductId(productId:number){
    this._productService.deleteByProductId(productId).subscribe(
      (resp)=>{
        this.products = this.products.filter((prod:any)=> prod.productId != productId);
        this._snackBar.open('Product delete successfully', 'OK', {duration: 3000});
        this.getAllProducts()
      },(error)=>{
        this._snackBar.open(error.message, 'Error delete product', {duration: 3000})
      }
    )
  }

}
