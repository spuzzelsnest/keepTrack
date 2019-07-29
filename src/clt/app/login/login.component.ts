import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,  Params, ParamMap } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
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

    key: string;
    userName: string;
    today: string = moment().format('YYYY-MM-DD');
    displayToday: string = moment().format('D MMM YYYY');
    userLogin:any = [];

    constructor(
        public rest:RestService,
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private router: Router) {}
    
    ngOnInit(){}

    onLogin(form: NgForm):void{
        if (form.invalid){
            return;
        }
        this.userLogin = [];
        const inputKey = form.value.key;
        this.rest.checkLogin(inputKey).subscribe((uBlock: {}) => {
            this.userLogin = uBlock;
            const userPopup = new MatDialogConfig();
            userPopup.width = '600px';
            userPopup.height = '450px';
            
            userPopup.disableClose = true;
            userPopup.autoFocus = true;
            userPopup.data ={
                day: this.today,
                display: this.displayToday,
                key: inputKey,
                userName: this.userLogin.name,
                userId: this.userLogin.id
            }
            this.dialog.open(UserComponent, userPopup);
            //console.log(JSON.stringify(uBlock, null, 4));
        }),(err)=>{
            console.log(err);
        };
        
        form.resetForm();
   }
   
}