import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,  Params, ParamMap } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import * as moment from 'moment';

import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment';
import { UserComponent } from './user/user.component';
import { logModel } from '../logModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    sub: Subscription;
    form: FormGroup;
    key: string;
    userName: string;
    userLogin:any = [];
    env = environment;

    constructor(
        public auth:AuthService,
        //private auth:AuthGuardService,
        public dialogRef: MatDialog,
        private route: ActivatedRoute,
        private router: Router) {}
    
    ngOnInit(){
        
        this.form = new FormGroup({
            key: new FormControl(null, {validators: [Validators.required]})
        })
    }

    onLogin(){

        if (this.form.invalid){
            return;
        }

        this.userLogin = [];
        const inputKey = this.form.value.key;
        this.auth.sendToken(this.form.value.key);
        this.sub = this.auth.checkLogin(inputKey)
            .pipe(take(1))
            .subscribe((uBlock: {}) => {
            this.userLogin = uBlock;
            const userPopup = new MatDialogConfig();
            userPopup.width = '600px';
            userPopup.height = '750px';
            userPopup.disableClose = true;
            userPopup.autoFocus = true;
            userPopup.data ={
                day: moment().format('YYYY-MM-DD'),
                display: moment().format('D MMM YYYY'),
                key: inputKey,
                userName: this.userLogin.name,
                userId: this.userLogin.id
            }
            this.dialogRef.open(UserComponent, userPopup);
        }),(err)=>{
            console.log(err);
        };
      this.form.reset();
   }

  ngOnDestroy() {
      if(this.sub) this.sub.unsubscribe();
  }
}