import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';

import { RestService } from '../rest.service';
import { logModel } from '../logModel';

@Component({
  selector: 'app-log-add',
  templateUrl: './log-add.component.html',
  styleUrls: ['./log-add.component.css']
})

export class LogAddComponent implements OnInit {
    
    private mode = 'create';
    private logId: string;
    log: logModel[] = [];
    logitem: logitemModel[] = [];
    value:any;

  constructor(public rest:RestService, public route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap : ParamMap) =>{
        if (paramMap.has('logId')){
            this.mode = 'edit';
            this.logId = paramMap.get('logId');
            console.log(this.logId);
            //this.log = this.rest.getLog(this.logId);
        }else{
          this.mode = 'add';
          this.logId = null;
        }
    });
  }

  onAddLog(form: NgForm) {
      if (form.invalid) {
          return;
      }
    this.rest.storeLog(form.value).subscribe((result) => {
      this.router.navigate(['/logs/']);
        console.log(result);
    }, (err) => {
      console.log(err);
    });
  }

}