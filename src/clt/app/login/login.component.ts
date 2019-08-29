import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,  Params, ParamMap } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserIdleService } from 'angular-user-idle';
import * as moment from 'moment';

import { RestService } from '../rest.service';
import { environment } from '../../environments/environment';
import { UserComponent } from './user/user.component';
import { logModel } from '../logModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    form: FormGroup;
    key: string;
    userName: string;
    userLogin:any = [];
    
    env = environment;

    constructor(
        public rest:RestService,
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private router: Router,
        private userIdle: UserIdleService) {}
    
    ngOnInit(){

        this.userIdle.startWatching();
        this.userIdle.onTimerStart().subscribe(count => console.log(count));
        this.userIdle.onTimeout().subscribe(() =>{ 
            console.log('Time is up!');
            window.location.reload();
        });
        
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
        this.rest.checkLogin(inputKey).subscribe((uBlock: {}) => {
            this.userLogin = uBlock;
            const userPopup = new MatDialogConfig();
            userPopup.width = '600px';
            userPopup.height = '650px';
            userPopup.disableClose = true;
            userPopup.autoFocus = true;
            userPopup.data ={
                day: moment().format('YYYY-MM-DD'),
                display: moment().format('D MMM YYYY'),
                key: inputKey,
                userName: this.userLogin.name,
                userId: this.userLogin.id
            }
            this.dialog.open(UserComponent, userPopup);
        }),(err)=>{
            console.log(err);
        };
      this.form.reset();
   }
    
  stop() {
    this.userIdle.stopTimer();
  }
 
  stopWatching() {
    this.userIdle.stopWatching();
  }
 
  startWatching() {
    this.userIdle.startWatching();
  }
 
  restart() {
    this.userIdle.resetTimer();
  }
}