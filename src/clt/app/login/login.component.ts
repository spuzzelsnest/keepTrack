import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,  Params, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';

import { RestService } from '../rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    
    private key: string;
    private userId: number;
    value:any;

    constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) {}
    
    ngOnInit(){}

    onLogin(form: NgForm){
        if (form.invalid){
            return;
        }
        this.rest.checkLogin(inputKey).subscribe((result) =>{
        const key = result[0].key;
        this.router.navigate([inputKey+'/logs']);
        },(err)=>{
            console.log(err);
        });
            form.resetForm();
   }
}
