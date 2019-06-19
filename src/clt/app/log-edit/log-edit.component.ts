import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-log-edit',
  templateUrl: './log-edit.component.html',
  styleUrls: ['./log-edit.component.css']
})
export class LogEditComponent implements OnInit {

    @Input() logData:any = {day: '', userId: ''};

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
   /*
   this.rest.getLogs(this.route.snapshot.params['id']).subscribe((data: {}) => {
     //console.log(data);
      //this.logData = data;
    });
    */
  }

  updateLog() {
    this.rest.updateLog(this.route.snapshot.params['id'], this.logData).subscribe((result) => {
      this.router.navigate(['/log/'+result._id]);
    }, (err) => {
      console.log(err);
    });
  }

}