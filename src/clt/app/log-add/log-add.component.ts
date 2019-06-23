import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';

import { RestService } from '../rest.service';

@Component({
  selector: 'app-log-add',
  templateUrl: './log-add.component.html',
  styleUrls: ['./log-add.component.css']
})
export class LogAddComponent implements OnInit {
    
    private mode = 'create';
    private logId: string;
    private log = [];

  constructor(public rest:RestService, public route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) =>{
        if (paramMap.has('logId')){
            this.mode = 'edit';
<<<<<<< HEAD
            this.key = paramMap.get('key');
            console.log(this.key);
=======
            this.logId = paramMap.get('logId');
            this.log = this.rest.getLog(this.logId);
>>>>>>> 6c47cfe236e6b90a709f581272830ac5d4b33c7d
        }else{
          this.mode = 'add';
          this.logId = null;
        }
    });
  }

  storeLog(form: NgForm) {
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