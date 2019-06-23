import { Component, ngOnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent {
    
    private mode = 'logout';
    private key: string;
    private userId: number;
    value:any;
    logs:any = [];
    
    constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) {}
    
    OnInit(){
        
    this.route.params.subscribe(params => {
      console.log(params.key);
      if (paramMap.has('key')) {
        this.mode = 'login';
        this.key = params.key;
        this.getLogs(this.key);
        
      }else{
         this.mode = 'logout';
         this.key = null;
      }
          console.log(mode);
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
