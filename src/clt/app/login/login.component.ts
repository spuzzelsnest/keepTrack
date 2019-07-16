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
        this.rest.checkLogin(inputKey).subscribe((data: {}) => {
            this.userLogin = data;
            const dialogConfig = new MatDialogConfig();
            dialogConfig.width = '600px';
            dialogConfig.height = '400px';
            
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.data ={
                day: this.today,
                display: this.displayToday,
                key: inputKey,
                userName: this.userLogin.name,
                userId: this.userLogin.id
            }
            this.dialog.open(UserComponent, dialogConfig);
            //console.log(JSON.stringify(data, null, 4));
        }),(err)=>{
            console.log(err);
        };
        
        form.resetForm();
   }
   
}