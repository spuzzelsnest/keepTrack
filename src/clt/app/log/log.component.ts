import { Component } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent {
  logs:any = [];
    constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) {
        this.route.params.subscribe(params => {
      console.log(params);
      if (params["key"]) {
        this.getLogs(params["key"]);
      }
    });
    }

 getLogs(key: string){
     this.logs = [];
     this.rest.getLogs().subscribe((data: {}) => {
         this.logs=data;
     });
 }

addLog() {
    this.router.navigate(['/add']);
  }
/*
delete(id) {
    this.rest.deleteLog(id)
      .subscribe(res => {
          this.getLogs();
        }, (err) => {
          console.log(err);
        }
      );
  }
  */
}
