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
    key: string;
    userName: string;
    
    constructor(
        public rest:RestService,
        private route: ActivatedRoute,
        private router: Router,
        private dialogRef: MatDialogRef<UserComponent>, 
        @Inject(MAT_DIALOG_DATA) data) {
            
            this.today = data.day;
            this.key = data.key;
            this.userName = data.userName;
        }

    ngOnInit() {}

    next(){
        this.dialogRef.close(); this.router.navigate(['/'+this.key+'/logs']);
        }
    
    close(){
        this.dialogRef.close();
    }
}
