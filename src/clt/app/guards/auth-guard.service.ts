import { Injectable } from '@angular/core';
import { Router, Route, ActivatedRoute, CanActivate} from '@angular/router';
import { Observable } from 'rxjs';
import { RestService } from '../rest.service';

@Injectable()

export class AuthGuardService {
    
  constructor(
    public rest:RestService,
    private route: ActivatedRoute,
    private router: Router,
    ) {}
    
    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        if (this.rest.authUser()) {

        } else {
            this.router.navigate(['/']);
   
        }
    }
}