import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { UserStorageService } from '../../auth/storage/user-storage.service';

@Component({
  selector: 'app-view-product-detail',
  templateUrl: './view-product-detail.component.html',
  styleUrls: ['./view-product-detail.component.scss']
})
export class ViewProductDetailComponent implements OnInit{

  productId: number = this.route.snapshot.params['productId']; 

  product: any;
  FAQS: any[] = [];
  reviews: any[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private customerService: CustomerService,
    private route: ActivatedRoute
  ){}



  ngOnInit(): void {
  this.getProductDetailsProductById()
  }

  getProductDetailsProductById(){
    this.customerService.getProductDetailById(this.productId).subscribe(
      (resp) => {
        this.product = resp.productDto;
        this.product.processedImg = 'data:image/jpg;base64,' + resp.productDto.byteImg;

        this.FAQS = resp.faqDtoList;

        resp.reviewDtoList.forEach(element => {
          element.processedImg = 'data:image/jpg;base64,' + element.returnedImg;
          this.reviews.push(element);
        });
      }
    )
  }

  addToWishlist(){
    const wishlistDto = {
      productId : this.productId,
      userId : UserStorageService.getUserId(),
    }

    this.customerService.addProductToWishlist(wishlistDto).subscribe(
      (resp) => {
        if (resp.id != null) {
          this.snackBar.open('Product Added to Wishlist Successfully!', 'OK', {duration: 3000});
        } else {
          this.snackBar.open('Already in Wishlist!', 'ERROR', {duration: 3000});
        }
      }
    )
  }

}
