import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router, Params, ParamMap } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { NgForm } from '@angular/forms';

import { RestService } from '../rest.service';
import { EditComponent } from './edit/edit.component';
//import { userModel } from '../userModel';
//import { logModel } from '../logModel';
//import { logitemModel } from '../logitemModel';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})

export class OverviewComponent implements OnInit {
    
    key: string;
    logs:any = [];
    logId: string;
    logitem:any = [];
    isLoading = false;
    
  //  displayedColumns: string[] = ['startAt', 'breakIn', 'breakIn', 'endAt'];

  constructor(
    public rest:RestService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
  //Get the userLogin from Key
    this.route.params.subscribe(params => {
      if (params['key']) {
        this.key = params.key;
        this.onGetLogs(this.key);
      }else{
         this.key = null;
      }
    });
  }

  onGetLogs(key: string){
    this.logs = [];
    this.isLoading = true; //Loading Spinner
    this.rest.getLogs(this.key).subscribe((lBlocks: {}) => {
        this.isLoading = false; //stop spinner
        this.logs = lBlocks;
        //console.log(this.logs);
    });
  }

  onEdit(form: NgForm):void{
    console.log(form);
    this.logitem = [];
    this.logId = '40';
   
    this.rest.getLog(this.key, this.logId).subscribe((lBlock: {}) => {
        this.logitem = lBlock;
    
    const logItemPopup = new MatDialogConfig();
        logItemPopup.width = '600px';
        logItemPopup.height = '450px';
        logItemPopup.disableClose = true;
        logItemPopup.autoFocus = true;
        console.log('logId 1: '+ this.logId);
      
      
        //still had to set logId to the selected
        logItemPopup.data ={
            logId: this.logId
        }
        this.dialog.open(EditComponent, logItemPopup);
        }),(err)=>{console.log(err);};
  }
}