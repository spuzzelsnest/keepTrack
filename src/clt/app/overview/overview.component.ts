import { Component, OnInit } from '@angular/core';

import { RestService } from '../rest.service';
import { ActivatedRoute, RouterModule, Router, Params, ParamMap } from '@angular/router';

import { userModel } from '../userModel';
import { logModel } from '../logModel';
import { logitemModel } from '../logitemModel';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
    
    key: string;
    logs:any = [];
    
    displayedColumns: string[] = ['startAt', 'breakIn', 'breakIn', 'endAt'];

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
  //Get the userLogin from Key  
    this.route.params.subscribe(params => {
      if (params['key']) {
    
        this.key = params.key;
        this.onGetLogs(this.key);
        
      }else{
         this.key = null;
      }
    });
  }

    onGetLogs(key: string){
        this.logs = [];
        this.rest.getLogs(this.key).subscribe((data: {}) => {
        this.logs=data;
    })}
    
}