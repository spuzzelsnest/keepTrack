import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router, Params, ParamMap } from '@angular/router';
import { MatDialog, MatDialogConfig, PageEvent } from '@angular/material';

import { RestService } from '../rest.service';
import { EditComponent } from './edit/edit.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})

export class OverviewComponent implements OnInit {
    userName: string;
    key: string;
    logs:any = [];
    logId: number;
    logitem:any = [];
    isLoading = false;
    logsPerPage = 5;
    currentPage = 1;
    allLogs: number;
    
    
  //  displayedColumns: string[] = ['startAt', 'breakIn', 'breakIn', 'endAt'];

  constructor(
    public rest:RestService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    //console.log('Start Loading');
    this.isLoading = true; //Loading Spinner
    
    this.route.params.subscribe(params => {
      if (params['key']) {
        this.key = params.key;
        this.onGetLogs(this.key, this.logsPerPage, this.currentPage);
      }
    
    });
  }

  onGetLogs(key: string, logsPerPage: number, currentPage: number){
      //console.log(this.currentPage)
      this.rest.getLogs(this.key, this.logsPerPage, this.currentPage)
      .subscribe((lBlocks: {}) => {
            this.isLoading = false; //stop spinner
            //console.log('Stopped Loading');
            this.logs = lBlocks["rows"];
            this.allLogs = lBlocks["count"];
            this.userName = this.logs[0].User.name;
            //console.log(JSON.stringify(lBlocks["count"], null, 4));
        });
      
  }
    
  onEdit(event){
      
    this.logId = event.currentTarget.getAttribute('id');
    console.log(this.logId)
      //console.log('form: '+ JSON.stringify(form, null, 4));
      
    this.rest.getLog(this.key, this.logId).subscribe((lBlock: {}) => {
        this.logitem = lBlock;
        //console.log('lblock: '+ JSON.stringify(lBlock, null, 4));
    
        const logItemPopup = new MatDialogConfig();
              logItemPopup.width = '600px';
              logItemPopup.height = '450px';
              logItemPopup.disableClose = true;
              logItemPopup.autoFocus = true;
              logItemPopup.data ={
                 key: this.key,
                 logId: this.logId, 
                 logitem: this.logitem
              }
            const dialogRef = this.dialog.open(EditComponent, logItemPopup)
            .afterClosed().subscribe(result => {
                console.log('The dialog was closed');
                this.ngOnInit();
            })
    }),(err)=>{console.log(err);}

  }

  onChangedPage(pageData: PageEvent){
    //console.log('Reloading ' + this.key);
    //console.log('lblock: '+ JSON.stringify(pageData, null, 4));
    this.isLoading = true; //Loading Spinner
    this.currentPage = pageData.pageIndex + 1;
    this.logsPerPage = pageData.pageSize;
    this.onGetLogs(this.key, this.logsPerPage, this.currentPage);
  }
}