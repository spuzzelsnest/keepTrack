import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, RouterModule, Router, Params, ParamMap } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { NgForm } from '@angular/forms';

import { RestService } from '../rest.service';
import { EditComponent } from './edit/edit.component';
import { userModel } from '../userModel';
import { logModel } from '../logModel';
import { logitemModel } from '../logitemModel';

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
    //Loading Spinner
    this.isLoading = true;
    this.rest.getLogs(this.key).subscribe((lBlocks: {}) => {
        this.isLoading = false; //stop spinner
        //set logs to lBlocks
        this.logs = lBlocks;
       // dataSource = lBlocks;
        //console.log(this.logs[0].Logitem);
        //console.log(lBlock);
    });
  }

  onEdit(form: NgForm){
    this.logitem =[]
    this.logId = form.value.logId;
      
    const logItemPopup = new MatDialogConfig();
        logItemPopup.width = '600px';
        logItemPopup.height = '450px';
        logItemPopup.disableClose = true;
        logItemPopup.autoFocus = true;
        console.log('logId: ');
        //still had to set logId to the selected
        logItemPopup.data ={
            logId: '2'
        }
      this.dialog.open(EditComponent, logItemPopup);
      
  }    
}