import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { AnalyticalService } from 'src/app/services/analitycs.service';

@Component({
  selector: 'app-anality',
  templateUrl: './anality.component.html',
  styleUrls: ['./anality.component.scss']
})
export class AnalityComponent implements OnInit {

  data:any = [];

  constructor(
    private adminService:AdminService,
    private analityService:AnalyticalService
  ){}

  ngOnInit(): void {
    this.analityService.getAnalysis().subscribe(
      resp => {
        console.log(resp);
        this.data = resp;
        
      }
    )

  }


}
