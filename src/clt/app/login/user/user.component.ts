import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router,  Params, ParamMap } from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
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
    fetchedId: number;
    fetchedLogitem =[];
    
    constructor(
        public rest:RestService,
        private route: ActivatedRoute,
        private router: Router,
        private dialogRef: MatDialogRef<UserComponent>, 
        @Inject(MAT_DIALOG_DATA) data) {
            
            this.today = data.day;
            this.displayToday = data.display;
            this.key = data.key;
            this.userName = data.userName;
            this.userId = data.userId;
        }

    ngOnInit() {
  
        const log = {
            day: this.today,
            userId: this.userId
        };
        
        this.rest.storeLog(this.key, log).subscribe(res =>{
            this.fetchedId = res.log.id;
            this.startAt = res.log.createdAt;
        });
    }
    
    onCreate(log){
        console.log('log from: '+this.fetchedId);
        console.log('time from: '+(new Date(this.startAt)).getUTCHours());
        const logitem = {
            logId: this.fetchedId,
            startAt: '10:00'
        }
        this.rest.storeLogitem(this.key, this.fetchedId, logitem)
            .subscribe( res => {
                this.fetchedLogitem = res;
                console.log('fetchedLogitem', res);
        }, (err)=>{
            console.log(err);
            }
      )}

    next(){
        this.dialogRef.close(); this.router.navigate(['/'+this.key+'/logs']);
        }
    
    close(){
        this.dialogRef.close();
    }
}
