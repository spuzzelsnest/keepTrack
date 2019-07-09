import {Component, OnInit, Input} from "@angular/core";
import { ActivatedRoute, RouterModule, Router, Params, ParamMap } from '@angular/router';

import { RestService } from '../../rest.service';

@Component({
    selector: 'app-head',
    templateUrl: './head.component.html',
    styleUrls: ['./head.component.css']
})

export class HeadComponent {
    
    @Input() userName: string;
    
    private key: string;
    
    constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) {}
    
    ngOnInit(){
        this.route.params.subscribe(params => {
             if (params['key']) {
                
                this.key = params.key;
                console.log('KEY from head '+ this.key);
                 
             }else{
                console.log('No Key found');
             }
        });
    }
}