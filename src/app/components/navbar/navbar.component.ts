import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStorageService } from 'src/app/pages/auth/storage/user-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  implements OnInit{

  isCustomerLoggedIn: boolean = UserStorageService.isUserLoggetIn();
  isAdminLoggedIn: boolean = UserStorageService.isAdminLoggedIn();

  constructor(
    private _router:Router,
  ){}

  ngOnInit(): void {
    this._router.events.subscribe(event => {
      this.isCustomerLoggedIn = UserStorageService.isUserLoggetIn();
      this.isAdminLoggedIn = UserStorageService.isAdminLoggedIn();
    })  
  }

  logout(){
    UserStorageService.signOut();
    this._router.navigateByUrl('login');
  }



}
