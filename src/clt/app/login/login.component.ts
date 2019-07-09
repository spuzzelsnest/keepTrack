import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,  Params, ParamMap } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

import { RestService } from '../rest.service';
import { logModel } from '../logModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    private key: number;
    private userId: number;
    value:any;

    constructor(public rest:RestService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog) {}
    
    ngOnInit(){}

    onLogin(form: NgForm): void{
        if (form.invalid){
            return;
        }
        const inputKey = form.value.key;
        this.rest.checkLogin(inputKey)
        .subscribe((result) =>{
            this.router.navigate([inputKey+'/logs']);
        },(err)=>{
            console.log(err);
        });
            form.resetForm();
   }
}
