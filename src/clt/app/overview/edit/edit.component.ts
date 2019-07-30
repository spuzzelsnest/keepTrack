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
    logId: number;
    timelog:any = [];
    formData:any = [];
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
    this.key = this.timelog.key;
    this.logId = this.timelog.logId;
  }

  onSave(form: NgForm){
    if (form.invalid) {
          return;
    }

    this.rest.updateLog(this.key, this.logId, this.timelog).subscribe(res =>{
        const id = res['id'];    
    },(err) => {
        console.log(err);}
    );
  }
    
  closeEdit(){
        this.dialogRef.close();
    }
}