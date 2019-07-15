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
    userLogin:any = [];

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
        this.userLogin = [];
        const inputKey = form.value.key;
        this.rest.checkLogin(inputKey).subscribe((data: {}) => {
            this.userLogin = data;
            console.log();
            const dialogConfig = new MatDialogConfig();
            dialogConfig.width = '600px';
            dialogConfig.height = '400px';
            
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.data ={
                day: this.today,
                key: inputKey,
                userName: this.userLogin.name,
                userId: this.userLogin.id
            }
            this.dialog.open(UserComponent, dialogConfig);
            console.log(JSON.stringify(data, null, 4));
        }),(err)=>{
            console.log(err);
        };
        
        form.resetForm();
   }
   
}