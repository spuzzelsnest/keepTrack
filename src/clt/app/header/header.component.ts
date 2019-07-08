import {Component, OnInit, Input} from "@angular/core";
import { RestService } from '../rest.service';
import { ActivatedRoute, RouterModule, Router, Params, ParamMap } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent {
    
    @Input() userName: string;
    
    private key: string;
    
    constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) {}
    
    ngOnInit(){
        this.route.params.subscribe(params => {
             if (params['key']) {
                
                this.key = params.key;
                console.log('KEY from header '+ this.key);
                 
             }else{
                console.log('No Key found');
             }
        });
    }
}