import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms'

import { RestService } from '../rest.service';

@Component({
  selector: 'app-log-add',
  templateUrl: './log-add.component.html',
  styleUrls: ['./log-add.component.css']
})
export class LogAddComponent implements OnInit {

@Input() logData = {day:'', userId: ''};

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  storeLog(form: NgForm) {
    this.rest.storeLog(this.logData).subscribe((result) => {
      this.router.navigate(['/log/'+result._id]);
        console.log(result);
    }, (err) => {
      console.log(err);
    });
  }

}