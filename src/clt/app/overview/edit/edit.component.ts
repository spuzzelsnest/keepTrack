import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

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
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<EditComponent>, 
        @Inject(MAT_DIALOG_DATA) lBlock) {
            this.timelog = lBlock;
        }

    editLog: FormGroup;
    startAt = '';
    breakOut = '';
    breakIn = '';
    endAt = '';
    isLoadingResults = false;
    

  ngOnInit() {
    //console.log('timeLog: '+ JSON.stringify(this.timelog, null, 4));
    this.editLog = this.formBuilder.group({
        startAt: [null],
        breakOut: [null],
        breakIn: [null],
        endAt: [null]
  });
    this.key = this.timelog.key;
    this.logId = this.timelog.logId;
  }

  onSave(form: NgForm){

    this.rest.updateLog(this.key, this.logId, this.editLog.value).subscribe(res =>{
        console.log(res);
    },(err) => {
        console.log(err);
        this.isLoadingResults = false;
    });
  }
    
  closeEdit(){
        this.dialogRef.close();
    }
}