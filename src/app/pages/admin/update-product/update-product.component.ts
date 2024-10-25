import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit{

  
  productId = this._route.snapshot.params['productId'];
  productForm!:FormGroup;
  categorys: any = [];
  selectFile:File | null;
  imagePreview: string | ArrayBuffer | null;

  existingImage: string |null = null;
  imgChanged = false; 

  constructor(
    private _fb:FormBuilder,
    private _router:Router,
    private _snackBar:MatSnackBar,
    private _adminService: AdminService,
    private _route:ActivatedRoute

  ){}

  onFileSelected(event:any){
    this.selectFile = event.target.files[0];
    this.previewImagen();

    this.imgChanged = true;
    this.existingImage = null;
  }

  previewImagen(){
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

    this.getAllCategorys();
    this.getByProductId();
  }

  getAllCategorys(){
    this._adminService.getAllCategorys().subscribe(
      (data)=> {
        this.categorys = data;
      }
    )
  }

  getByProductId(){
    this._adminService.getByProductId(this.productId).subscribe(
      (resp) => {
        this.productForm.patchValue(resp);
        this.existingImage = 'data:image/jpg;base64,' + resp.byteImg;
      }
    )
  }

  updateProduct(): void{
    if (this.productForm.valid) {
      const formData : FormData = new FormData();
      
      if (this.imgChanged && this.selectFile) {
        formData.append('img', this.selectFile);
      }

      formData.append('categoryId', this.productForm.get('categoryId').value)
      formData.append('name', this.productForm.get('name').value);
      formData.append('description', this.productForm.get('description').value);
      formData.append('price', this.productForm.get('price').value);

      this._adminService.updateProductId(this.productId, formData).subscribe(
        (data) => {
          if (data.id != null) {
            this._snackBar.open('Product update Successfully', 'OK',{duration: 3000});
          this._router.navigateByUrl('/admin/dashboard');
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

}
