import { Component, OnInit, Inject } from '@angular/core';
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
    }

    setStartTime(fetchedId, createdAt){
    //Find or Create LOGITEM
        this.loginTime = new Date(createdAt).getHours()+ ':'+ (new Date(createdAt).getMinutes() < 10 ? "0" : "")+ (new Date(createdAt).getMinutes());
        //console.log('passed ID: ' +fetchedId+ ' and '+ this.loginTime);
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
        console.log('fetchedLogitem: ' +this.key+ ' and '+  this.fetchedId);
    }
    
    setClockTime(event){
        
        this.clockTime = new Date().getHours()+ ':'+ (new Date().getMinutes() < 10 ? "0" : "")+ (new Date().getMinutes());
        this.buttonId = event.currentTarget.getAttribute('id');
        console.log('Clicked on ' + this.buttonId + ' at '+ this.clockTime + ' id '+ this.fetchedId + ' for '+ this.key);
        
       if(this.buttonId == '1'){
            const clockLog ={
                logId: this.logId,
                breakOut: this.clockTime
            }
            this.rest.updateLog(this.key, this.fetchedId, clockLog).subscribe(res =>{
                console.log(res);
            }, (err)=>{ console.log(err); 
           });
        }

        if(this.buttonId == '2'){
            const clockLog ={
                logId: this.logId,
                breakIn: this.clockTime
            }
            this.rest.updateLog(this.key, this.fetchedId, clockLog).subscribe(res =>{
                console.log(res);
            }, (err)=>{ console.log(err); 
           });
        }

          if(this.buttonId == '3'){
            const clockLog ={
                logId: this.logId,
                endAt: this.clockTime
            }
            this.rest.updateLog(this.key, this.fetchedId, clockLog).subscribe(res =>{
                console.log(res);
            }, (err)=>{ console.log(err); 
           });        
        }
    }

    viewLogs(){
        this.dialogRef.close(); 
        this.router.navigate(['/'+this.key+'/logs']);
        }
    
    closeUser(){
        this.dialogRef.close();
    }

}
