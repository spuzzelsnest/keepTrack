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
    startAt: string;
    loginTime: string;
    fetchedId: number;
    fetchedLogitem =[];
    
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
            this.startAt = res.log.createdAt;
            this.setStartTime();
        });
    }

    setStartTime(){
    //Find or Create LOGITEM
        this.loginTime = new Date(this.startAt).getHours()+ ':'+ (new Date(this.startAt).getMinutes() < 10 ? "0" : "")+ (new Date(this.startAt).getMinutes());
        const logitem = {
            logId: this.fetchedId,
            startAt: this.loginTime
        }
        this.rest.storeLogitem(this.key, this.fetchedId, logitem).subscribe( res => {
                this.fetchedLogitem = res;
                console.log('fetchedLogitem', res);
            }, (err)=>{ console.log(err); }
        );
    }
    
    onCheck(log){
    // Display create time from Log 
       this.loginTime = (new Date(this.startAt)).getHours()+':'+(new Date(this.startAt)).getMinutes();
    }

    viewLogs(){
        this.dialogRef.close(); 
        this.router.navigate(['/'+this.key+'/logs']);
        }
    
    closeUser(){
        this.dialogRef.close();
    }
}
