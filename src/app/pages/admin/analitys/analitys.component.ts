import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-analitys',
  templateUrl: './analitys.component.html',
  styleUrls: ['./analitys.component.scss']
})
export class AnalitysComponent implements OnInit {

  data:any = [];

  constructor(private adminService:AdminService){}

  ngOnInit(): void {
    this.adminService.getAnalitycs().subscribe(
      resp => {
        console.log(resp);
        this.data = resp;
        
      }
    )

  }


}
