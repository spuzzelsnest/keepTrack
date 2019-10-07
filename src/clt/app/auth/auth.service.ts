import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {Observable,of, from } from 'rxjs';
import { map, catchError, filter, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { userModel } from '../userModel';

const endpoint = environment.apiUrl;

@Injectable()

export class AuthService {
    
  constructor(
    private http: HttpClient,
    private route: Router
    ) {}

  private userLogin(res: Response) {
      const userBlock = [];
      const body = Object(res['userLogin']);
      return body || { }; 
  }
    
checkLogin(key:string): Observable<userModel[]> {
    return this.http.get<userModel[]>(endpoint + 'login/' + key)
    .pipe(
        catchError(this.handleError(`Failed to Get user`)),
        map(this.userLogin)
    );
  }
    sendToken(token: string) {
    localStorage.setItem("LoggedInUser", token)
  }
  getToken() {
    return localStorage.getItem("LoggedInUser")
  }
  isLoggedIn() {
    return this.getToken() !== null;
  }
  logout() {
    localStorage.removeItem("LoggedInUser");
    this.route.navigate(["Login"]);
  }
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    console.error(error);
    console.log(`${operation} failed: ${error.message}`);

    return of(result as T);
  };
}
}