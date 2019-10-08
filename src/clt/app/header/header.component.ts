import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterModule, Router, Params, ParamMap } from '@angular/router';


import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent {
    
   mode: boolean;
   private key: string;
    
    constructor(public auth:AuthService,
                private route: ActivatedRoute,
                private router: Router) {}
    
    ngOnInit(){
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
             if (paramMap.has('key')) {
                this.mode = true;
                this.key = paramMap.get('key');
             }else{
                 this.mode = false;
             }
        });
    }

  logout(){
       this.auth.logout();
  }

}