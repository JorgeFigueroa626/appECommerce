import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { UploadImageService } from 'src/app/shared/services/upload-image.service';

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.scss'],
})
export class CategoryManagerComponent {
  categoryForm!: FormGroup;
  categories: any[] = [];

  //img
  selectedFile: File = null;
  //status
  percentage$!: Observable<number>;
  //url
  downloadURL!: string;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _categoryService: CategoryService,
    private _snackBar: MatSnackBar,
    private _uploadImage: UploadImageService,
    private _dialog: MatDialogRef<CategoryManagerComponent>
  ) {}

  ngOnInit(): void {
    this.categoryForm = this._fb.group({
      name: [null, [Validators.required]],
      descriptions: [null, [Validators.required]],
      image: [null, [Validators.required]],
    });
    this.getAllCategories();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this._uploadImage.uploadFile(this.selectedFile).subscribe({
        next: (url: string) => {
          this.downloadURL = url;  
          this.categoryForm.patchValue({ image: this.downloadURL });
        },
        error: (error) => {
          console.error('Error al send image:', error);  
        }
      });

      this.percentage$ = this._uploadImage.getUploadProgress();
    }
  }


  closeDialog() {
    this._dialog.close();
  }

  addCategory() {
    if (this.categoryForm.valid) {
      this._categoryService
        .addCategory(this.categoryForm.value)
        .subscribe((data) => {
          if (data.id != null) {
            this._snackBar.open('Category Create Successfully!', 'OK', {
              duration: 3000,
            });
            this.closeDialog();
            this.getAllCategories();
          } else {
            this._snackBar.open(data.message, 'Close', {
              duration: 3000,
              panelClass: 'error-snackbar',
            });
          }
        });
    } else {
      this.categoryForm.markAllAsTouched();
    }
  }

  updateByCategoryId(categoryId: number) {
    this._categoryService
      .updateByCategoryId(categoryId, this.categoryForm.value)
      .subscribe(
        (resp) => {
          this._snackBar.open('Update category successfully', 'OK', {
            duration: 3000,
          });
          this.getAllCategories();
        },
        (error) => {
          this._snackBar.open('Error update category', 'CLOSE', {
            duration: 3000,
          });
        }
      );
  }

  getAllCategories() {
    this._categoryService.getAllCategories().subscribe((resp) => {
      this.categories = resp;
      console.log(this.categories);
    });
  }

  deleteByCategoryId(categoryId: number) {
    this._categoryService.deleteByCategoryId(categoryId).subscribe(
      (resp) => {
        this.categories = this.categories.filter(
          (cat: any) => cat.categoryId != categoryId
        );
        this._snackBar.open('Category delete Successfully!', 'Ok', {
          duration: 3000,
        });
        this.getAllCategories();
      },
      (error) => {
        this._snackBar.open(error.message, 'Close', {
          duration: 3000,
          panelClass: 'error-snackbar',
        });
      }
    );
  }
}
