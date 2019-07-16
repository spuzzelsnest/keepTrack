import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';

import { RestService } from '../rest.service';
import { logModel } from '../logModel';
import { logitemModel } from '../logitemModel';

@Component({
  selector: 'app-log-add',
  templateUrl: './log-add.component.html',
  styleUrls: ['./log-add.component.css']
})

export class LogAddComponent implements OnInit {
    
    private mode = 'add';
    private key: string;
    private logId: string;
    timelog:any = [];
    value:any;

  constructor(public rest:RestService, public route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap : ParamMap) =>{
        if (paramMap.has('logid')){
            this.mode = 'edit';
            this.key = paramMap.get('key');
            this.logId = paramMap.get('logid');
            this.timelog = this.rest.getLog(this.key,this.logId);
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
    this.rest.storeLog(this.key, form.value).subscribe((result) => {
      this.router.navigate([this.key+'/logs/']);
    }, (err) => {
      console.log(err);
    });
  }

    back(){
        this.router.navigate(['/'+this.key+'/logs']);
    }
}