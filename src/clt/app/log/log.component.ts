import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  logs:any = [];
  
    constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
      this.getLogs();
  }
  
 getLogs(){
     this.logs = [];
     this.rest.getLogs().subscribe((data: {}) => {
         console.log(data);
         this.logs=data;
     });
 }
    
<<<<<<< HEAD
addLog() {
    this.router.navigate(['/add']);
=======
add() {
    this.router.navigate(['/log/add']);
>>>>>>> 209e556e85d5ef9c78556ecd6e27ba0871a68582
  }

delete(id) {
    this.rest.deleteLog(id)
      .subscribe(res => {
          this.getLogs();
        }, (err) => {
          console.log(err);
        }
      );
  }
}
