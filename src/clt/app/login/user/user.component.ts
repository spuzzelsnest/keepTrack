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
    startedAt: string;
    getlog = [];
    logitem =[];
    
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
        this.rest.storeLog(this.key, log).subscribe((res: Response)=>{
           res.json()
        });
    }
    
    onCreate(log){
        console.log(this.logId)
        const logitem = {
            logId: this.logId,
            startedAt: this.startedAt
        }
        this.rest.storeLogitem(this.key, this.logId, logitem).subscribe( res =>{
            console.log(logitem);
            res.json();
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
