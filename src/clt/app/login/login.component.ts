import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router,  Params, ParamMap } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

import { RestService } from '../rest.service';
import { logModel } from '../logModel';

export interface DialogData {
  key: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    private key: string;
    private userId: number;
    today: string = moment().format('D MMM YYYY');
    value:any;

    constructor(public rest:RestService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog) {}
    
    ngOnInit(){}

    onLogin(form: NgForm){
        if (form.invalid){
            return;
        }
        
        const inputKey = form.value.key;
        this.rest.checkLogin(inputKey)
        .subscribe((result) =>{
            
        },(err)=>{
            console.log(err);
        });
            form.resetForm();
   }
   
     openDialog(): void {
        const dialogRef = this.dialog.open(Dialog, {
         height: '400px',
         width: '600px',
         data: {key: this.key}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.key = result;
        });
    }
   
}

@Component({
  selector: 'dialog',
  templateUrl: 'dialog.component.html',
})

export class Dialog{

  constructor(
    public rest:RestService, private route: ActivatedRoute, private router: Router,
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
    this.router.navigate([this.data.key+'/logs']);
  }

}