import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';

import { RestService } from '../../rest.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {

    key: string;
    logId: string;
    timelog:any = [];
    value:any;

  constructor(
        public rest:RestService,
        public route: ActivatedRoute,
        private router: Router,
        private dialogRef: MatDialogRef<EditComponent>, 
        @Inject(MAT_DIALOG_DATA) lBlock) {
            this.timelog = lBlock;
        }

  ngOnInit() {
      //console.log('timeLog: '+ JSON.stringify(this.timelog, null, 4));
  }
    
  onAddLog(form: NgForm) {
      if (form.invalid) {
          return;
      }
    this.rest.storeLog(this.key, form.value).subscribe((result) => {
      this.router.navigate([this.timelog.key+'/logs/']);
    }, (err) => {
      console.log(err);
    });
  }
  closeEdit(){
        this.dialogRef.close();
    }
}