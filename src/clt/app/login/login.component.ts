import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { RestService } from '../rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    value:any;

    constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }
    
    ngOnInit(){
    }

    onLogin(form: NgForm){
        if (form.invalid){
            return;
        }

        this.rest.getLogin(this.value.key).subscribe((result) =>{
            this.router.navigate([result+'/logs']);
            console.log(result);
        }, (err)=>{
            console.log(err);
        });
   }
}
