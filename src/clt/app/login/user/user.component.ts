import { Component, Directive, OnInit, Inject, Input } from '@angular/core';
import { ActivatedRoute, Router,  Params, ParamMap } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { RestService } from '../../rest.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
    
    today: string;
    displayToday: string;
    key: string;
    userName: string;
    userId: number;
    logId: number;
    createdAt: string;
    startAt: string;
    breakOut: string;
    breakIn: string;
    endAt: string;
    loginTime: string;
    fetchedId: number;
    fetchedLogitemId : number;
    fetchedLogitem =[];
    buttonId:string;
    clockTime:string;
    defaultImg: string = 'assets/users/none.png';
    @Input() src:string;
    
    constructor(
        public rest:RestService,
        private route: ActivatedRoute,
        private router: Router,
        private dialogRef: MatDialogRef<UserComponent>, 
        @Inject(MAT_DIALOG_DATA) uBlock) {
            this.today = uBlock.day;
            this.displayToday = uBlock.display;
            this.key = uBlock.key;
            this.userName = uBlock.userName;
            this.userId = uBlock.userId;
        }

    ngOnInit() {
    
    //Find or Create Today's Login Time
        const log = {
            day: this.today,
            userId: this.userId
        };
        
        this.rest.storeLog(this.key, log).subscribe(res =>{
            this.fetchedId = res.log.id;
            this.createdAt = res.log.createdAt;
            this.setStartTime( this.fetchedId, this.createdAt);
        });
    
    //Check profile picture
        this.src = "assets/users/"+this.userId+".jpg";
    
    }

    setStartTime(fetchedId, createdAt){
    //Find or Create LOGITEM
        this.loginTime = new Date(createdAt).getHours()+ ':'+ (new Date(createdAt).getMinutes() < 10 ? "0" : "")+ (new Date(createdAt).getMinutes());
        const logitem = {
            logId: this.fetchedId,
            startAt: this.loginTime
        }

        this.rest.storeLogitem(this.key, this.fetchedId, logitem).subscribe(res => {
                this.fetchedLogitemId = res.logitem.id;
                this.startAt = res.logitem.startAt;
                this.breakOut = res.logitem.breakOut;
                this.breakIn = res.logitem.breakIn;
                this.endAt = res.logitem.endAt;
            }, (err)=>{ console.log(err);
        });
    }
    
    setClockTime(event){
        
        this.clockTime = new Date().getHours()+ ':'+ (new Date().getMinutes() < 10 ? "0" : "")+ (new Date().getMinutes());
        this.buttonId = event.currentTarget.getAttribute('id');
        
        if(this.buttonId == '1'){
            const clockLog ={
                logId: this.logId,
                breakOut: this.clockTime
            }
            this.rest.updateLog(this.key, this.fetchedId, clockLog).subscribe(res =>{
                this.ngOnInit();
            }, (err)=>{ console.log(err); 
           });
        }

        if(this.buttonId == '2'){
            const clockLog ={
                logId: this.logId,
                breakIn: this.clockTime
            }
            this.rest.updateLog(this.key, this.fetchedId, clockLog).subscribe(res =>{
                this.ngOnInit();
            }, (err)=>{ console.log(err); 
           });
        }

        if(this.buttonId == '3'){
            const clockLog ={
                logId: this.logId,
                endAt: this.clockTime
            }
            this.rest.updateLog(this.key, this.fetchedId, clockLog).subscribe(res =>{
                this.dialogRef.close();
            }, (err)=>{ console.log(err); 
           });        
        }
    console.log(this.clockTime);
    
    }

    viewLogs(){
        this.dialogRef.close(); 
        this.router.navigate(['/'+this.key+'/logs']);
        }
    
    onError() {
        this.src = this.defaultImg;
    }
    
    checkPath(src) {
        return src ? src : this.defaultImg;
    }
    
    closeUser(){
        this.dialogRef.close();
    }
}
