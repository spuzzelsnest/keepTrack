import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule, Router, Params, ParamMap } from '@angular/router';
import { MatDialog, MatDialogConfig, PageEvent } from '@angular/material';
import { Subscription, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { UserIdleService } from 'angular-user-idle';

import { RestService } from '../rest.service';
import { EditComponent } from './edit/edit.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})

export class OverviewComponent implements OnInit, OnDestroy {

    private sub = new Subject();
    userName: string;
    key: string;
    logs:any = [];
    logId: number;
    logitem:any = [];
    isLoading = false;
    logsPerPage = 5;
    currentPage = 1;
    allLogs: number;

  constructor(
    public rest:RestService,
    public dialogRef: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private userIdle: UserIdleService) {}

  ngOnInit() {
    
    this.userIdle.startWatching();
    this.userIdle.onTimerStart()
        .pipe(takeUntil(this.sub))
        .subscribe(count =>{
        var eventList= ['click', 'mouseover','keydown','DOMMouseScroll','mousewheel','mousedown','touchstart','touchmove','scroll','keyup'];
        for(let event of eventList){
            document.body.addEventListener(event, () => {
                this.userIdle.resetTimer();
            });
        }
    });
      
   this.userIdle.onTimeout()
       .pipe(takeUntil(this.sub))
       .subscribe(() =>{
        this.dialogRef.closeAll();
        stop();
        this.router.navigate(['/','login']);
    });

    this.isLoading = true; //Loading Spinner

    this.route.params
    .pipe(takeUntil(this.sub))
    .subscribe(params => {
      if (params['key']) {
        this.key = params.key;
        this.onGetLogs(this.key, this.logsPerPage, this.currentPage);
      }
    });
  }

  onGetLogs(key: string, logsPerPage: number, currentPage: number): void {
    
      this.rest.getLogs(this.key, this.logsPerPage, this.currentPage)
      .pipe(takeUntil(this.sub))
      .subscribe((lBlocks: {}) => {
        this.isLoading = false; //stop spinner
        this.logs = lBlocks["rows"];
        this.allLogs = lBlocks["count"];
        this.userName = this.logs[0].User.name;
      });
  }

  onEdit(event){

    this.logId = event.currentTarget.getAttribute('id');

    this.rest.getLog(this.key, this.logId)
    .pipe(takeUntil(this.sub)).subscribe((lBlock: {}) => {
        this.logitem = lBlock;

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
        .afterClosed()
        .pipe(take(1))
        .subscribe(result => {
          this.onGetLogs(this.key, this.logsPerPage, this.currentPage)
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
    
   ngOnDestroy(){
       this.sub.next();
       this.sub.complete();
  }
}