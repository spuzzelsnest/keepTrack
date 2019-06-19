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

    constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) {
    /*
        this.route.params.subscribe(params => {
            console.log(params);
            if (params["key"]) {
                this.getLogs(params["key"]);
            }
        });
    
    */
    }
    
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
