import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit{
  
  categoryForm!:FormGroup;

  constructor(
    private _fb:FormBuilder,
    private _router: Router,
    private _categoryService: AdminService,
    private _snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.categoryForm = this._fb.group({
      name: [null, [Validators.required]],
      descriptions: [null, [Validators.required]]
    })
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

}
