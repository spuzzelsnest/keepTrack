import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-log-add',
  templateUrl: './log-add.component.html',
  styleUrls: ['./log-add.component.css']
})
export class LogAddComponent implements OnInit {

@Input() logData = { day:'', userId: '' };

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  addLog() {
    this.rest.addLog(this.logData).subscribe((result) => {
      this.router.navigate(['/log-details/'+result._id]);
    }, (err) => {
      console.log(err);
    });
  }

}