import { Component, OnInit } from '@angular/core';

import { RestService } from '../rest.service';
import { ActivatedRoute, RouterModule, Router, Params, ParamMap } from '@angular/router';
import * as moment from 'moment';

import { userModel } from '../userModel';
import { logModel } from '../logModel';
import { logitemModel } from '../logitemModel';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})

export class LogComponent {
   
    private mode = 'logout';
    public startAt: string;
    name: string;
    email: string;
    key: string;
    points: number;
    userInfo:Array<userModel> = [];
    logs:any = [];
    
    constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) {}
    
    ngOnInit(){
        
    this.route.params.subscribe(params => {
      if (params['key']) {
        this.mode = 'login';
        this.key = params.key;
        this.onGetLogs(this.key);
        
      }else{
         this.mode = 'logout';
         this.key = null;
      }
    });
    }
    
    

    onGetLogs(key: string){
     this.logs = [];
     this.rest.getLogs(this.key).subscribe((data: {}) => {
         this.logs=data;
        
         this.startAt = moment(this.logs[0]['Logitem'].startAt, "HH:mm").format("HH:mm");
         this.name = this.logs[0]['User'].name;
         this.email = this.logs[0]['User'].email;
         this.points = this.logs[0]['User'].points;
         this.key = this.logs[0]['User'].key;
         
         
         console.log(JSON.stringify(data, null, 4));
     });
       
}
 


    addLog() {
    this.router.navigate(['/add']);
  }
/*
    delete(id) {
        this.rest.deleteLog(id)
          .subscribe(res => {
              this.getLogs();
            }, (err) => {
              console.log(err);
            }
          );
      }
  */
}
