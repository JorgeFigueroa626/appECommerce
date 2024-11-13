import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { UserStorageService } from '../../auth/storage/user-storage.service';

@Component({
  selector: 'app-review-ordered-product',
  templateUrl: './review-ordered-product.component.html',
  styleUrls: ['./review-ordered-product.component.scss'],
})
export class ReviewOrderedProductComponent implements OnInit {
  productId: number = this.route.snapshot.params['productId'];
  reviewForm!: FormGroup;
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reviewForm = this.fb.group({
      rating: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  submitForm() {
    const formData: FormData = new FormData();
    formData.append('img', this.selectedFile);
    formData.append('productId', this.productId.toString());
    formData.append('userId', UserStorageService.getUserId().toString());
    formData.append('rating', this.reviewForm.get('rating').value);
    formData.append('description', this.reviewForm.get('description').value);

    this.customerService.giveReview(formData).subscribe((resp) => {
      if (resp.id != null) {
        this.snackBar.open('Review Posted Successfully!', 'OK', {
          duration: 3000,
        });
        this.router.navigateByUrl('/customer/my_orders');
      } else {
        this.snackBar.open('Something went wrong!', 'ERROR', {
          duration: 3000,
        });
      }
    });
  }

  // submitForm() {
  //   const formData: FormData = new FormData();
  //   formData.append('img', this.selectedFile);
  //   formData.append('productId', this.productId.toString());
  //   formData.append('userId', UserStorageService.getUserId().toString());
  //   formData.append('rating', this.reviewForm.get('rating').value);
  //   formData.append('description', this.reviewForm.get('description').value);

  //   this.customerService.giveReview(formData).subscribe(
  //     (resp) => {
  //       this.snackBar.open('Review Posted Successfully!', 'OK', {
  //         duration: 3000,
  //       });
  //       this.router.navigateByUrl('/customer/my_orders');
  //     },
  //     (error)=> {
  //      this.snackBar.open('Something went wrong!', 'ERROR', {
  //        duration: 3000,
  //       });
  //     }, 
  //   );
  // }
}
