import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router, Params, ParamMap } from '@angular/router';
import { MatDialog, MatDialogConfig, PageEvent } from '@angular/material';
import { UserIdleService } from 'angular-user-idle';

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
    public dialogRef: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private userIdle: UserIdleService) {}

  ngOnInit() {
    
    this.userIdle.startWatching();
    this.userIdle.onTimerStart().subscribe(count =>{
        var eventList= ['click', 'mouseover','keydown','DOMMouseScroll','mousewheel','mousedown','touchstart','touchmove','scroll','keyup'];
        for(let event of eventList){
            document.body.addEventListener(event, () =>this.userIdle.resetTimer());
        }
        console.log(count);
    });
      
    this.userIdle.onTimeout().subscribe(() =>{ 
        console.log('Time is up!');
        this.dialogRef.closeAll();
        this.router.navigate(['/']);
    });

    this.isLoading = true; //Loading Spinner
    
    this.route.params.subscribe(params => {
      if (params['key']) {
        this.key = params.key;
        this.onGetLogs(this.key, this.logsPerPage, this.currentPage);
      }
    
    });
  }

  onGetLogs(key: string, logsPerPage: number, currentPage: number){

      this.rest.getLogs(this.key, this.logsPerPage, this.currentPage)
      .subscribe((lBlocks: {}) => {
            this.isLoading = false; //stop spinner
            this.logs = lBlocks["rows"];
            this.allLogs = lBlocks["count"];
            this.userName = this.logs[0].User.name;
            //console.log(JSON.stringify(lBlocks["count"], null, 4));
        });
      
  }
    
  onEdit(event){
    console.log('Whos the king')
    this.logId = event.currentTarget.getAttribute('id');
      
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
            this.dialogRef.open(EditComponent, logItemPopup)
            .afterClosed().subscribe(result => {
              console.log('Bla'); 
            })
    }),(err)=>{console.log(err);}
  }

  onChangedPage(pageData: PageEvent){
      
    this.isLoading = true; //Loading Spinner
    this.currentPage = pageData.pageIndex + 1;
    this.logsPerPage = pageData.pageSize;
    this.onGetLogs(this.key, this.logsPerPage, this.currentPage);
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