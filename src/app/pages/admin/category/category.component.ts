import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit{
  
  categoryForm!:FormGroup;
  categories:any[]=[];

  constructor(
    private _fb:FormBuilder,
    private _router: Router,
    private _categoryService: CategoryService,
    private _snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.categoryForm = this._fb.group({
      name: [null, [Validators.required]],
      descriptions: [null, [Validators.required]]
    });
    this.getAllCategories();
  }

  addCategory(){
    if (this.categoryForm.valid) {
      this._categoryService.addCategory(this.categoryForm.value).subscribe(
        (data) => {
          if (data.id != null) {
            this._snackBar.open('Category Create Successfully!', 'OK', {
              duration: 3000
            })
            this._router.navigateByUrl('/admin/dashboard')
          } else {
            this._snackBar.open(data.message, 'Close', {
              duration: 3000, panelClass: 'error-snackbar'
            })
          } 
        }
      )
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }

  updateByCategoryId(categoryId:number){
    this._categoryService.updateByCategoryId(categoryId, this.categoryForm.value).subscribe(
      (resp) =>{
        this._snackBar.open('Update category successfully', 'OK', {duration: 3000});
        this.getAllCategories();
      },
      (error) =>{
        this._snackBar.open('Error update category', 'CLOSE', {duration: 3000})
      }
    )
  }

  getAllCategories(){
    this._categoryService.getAllCategories().subscribe(
      (resp) =>{
        this.categories = resp;
        console.log(this.categories);
        
      }
    )
  }

  deleteByCategoryId(categoryId:number){
    this._categoryService.deleteByCategoryId(categoryId).subscribe(
      (resp) => {
        this.categories = this.categories.filter((cat:any) => cat.categoryId != categoryId);
        this._snackBar.open('Category delete Successfully!', 'Ok', {
          duration: 3000,
        });
        this.getAllCategories()
      },(error) =>{
        this._snackBar.open(error.message, 'Close', {
          duration: 3000,
          panelClass: 'error-snackbar',
        });
        
      }
    )
  }


}
