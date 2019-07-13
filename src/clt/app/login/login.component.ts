import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router,  Params, ParamMap } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { filter } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

import { RestService } from '../rest.service';
import { UserComponent } from './user/user.component';
import { logModel } from '../logModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    
    
    public key: string;
    public userName: string;
    public today: string = moment().format('D MMM YYYY');
    userLogin:[];

    constructor(
        public rest:RestService,
        private route: ActivatedRoute,
        private router: Router,
        public dialog: MatDialog) {}
    
    ngOnInit(){}

    onLogin(form: NgForm):void{
        if (form.invalid){
            return;
        }
        
        const inputKey = form.value.key;
        this.rest.checkLogin(inputKey).subscribe((data: {}) => {
        console.log(JSON.stringify(data, null, 4));
        
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.data ={
                day: this.today,
                key: inputKey,
                userName: 'Dolly'
            }
            this.dialog.open(UserComponent, dialogConfig);
        
    
        }),(err)=>{
            console.log(err);
        };
            form.resetForm();
   }
   
}