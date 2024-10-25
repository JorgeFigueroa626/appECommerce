import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-post-product-faq',
  templateUrl: './post-product-faq.component.html',
  styleUrls: ['./post-product-faq.component.scss']
})
export class PostProductFaqComponent implements OnInit{

  productId: number = this._route.snapshot.params['productId'];
  faqForm!:FormGroup

  constructor(
    private _route: ActivatedRoute,
    private _router:Router,
    private _adminService:AdminService,
    private _snackBar:MatSnackBar,
    private _fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.faqForm = this._fb.group({
      question: [null, [Validators.required]],
      answer: [null, [Validators.required]]
    })
  }

  postFaq(){
    this._adminService.createFaq(this.productId, this.faqForm.value).subscribe(
      (resp) =>{
        if (resp.id != null) {
          this._snackBar.open('FAQ Posted Successfully', 'OK', {duration: 3000});
          this._router.navigateByUrl('/admin/dashboard');
        } else {
          this._snackBar.open('Something went wrong', 'ERROR', {duration: 3000, panelClass: 'error-snackbar'});
        }
      }
    )
  }

}
