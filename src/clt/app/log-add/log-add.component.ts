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
    private key: string;
    private id: number;

  constructor(public rest:RestService, public route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) =>{
        if (paramMap.has('id')){
            this.mode = 'edit';
            this.key = paramMap.get('id');
        }else{
          this.mode = 'create';
          this.key = null;
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