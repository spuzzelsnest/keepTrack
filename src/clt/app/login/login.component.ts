import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { RestService } from '../rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    users:any = [];
    enteredKey = '';

    
    constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }
    
    onLogin(form: NgForm){
       if (form.invalid){
           return;
       }
   }
}
