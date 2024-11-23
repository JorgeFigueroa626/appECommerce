import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryManagerComponent } from '../category-manager/category-manager.component';
import { Observable } from 'rxjs';

import firebase from 'firebase/compat/app';
import { AngularFireUploadTask } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {

  
  categoryForm!:FormGroup;
  categories:any[]=[];

  constructor(
    private _fb:FormBuilder,
    private _router: Router,
    private _categoryService: CategoryService,
    private _snackBar: MatSnackBar,
    private _dialog:MatDialog
  ){}

  ngOnInit(): void {
    this.categoryForm = this._fb.group({
      name: [null, [Validators.required]],
      descriptions: [null, [Validators.required]]
    });
    this.getAllCategories();
  }

  openDialog(category?:any) {
    const dialogRef = this._dialog.open(CategoryManagerComponent, {
      width: '40%',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  // addCategory(){
  //   if (this.categoryForm.valid) {
  //     this._categoryService.addCategory(this.categoryForm.value).subscribe(
  //       (data) => {
  //         if (data.id != null) {
  //           this._snackBar.open('Category Create Successfully!', 'OK', {
  //             duration: 3000
  //           })
  //           this._router.navigateByUrl('/admin/dashboard')
  //         } else {
  //           this._snackBar.open(data.message, 'Close', {
  //             duration: 3000, panelClass: 'error-snackbar'
  //           })
  //         } 
  //       }
  //     )
  //   } else {
  //     this.categoryForm.markAllAsTouched();
  //   }
  // }

  updateByCategoryId(categoryId:number){
    this._categoryService.updateByCategoryId(categoryId, this.categoryForm.value).subscribe(
      (resp) =>{
        //this.openDialog(this.categoryForm.value)
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
