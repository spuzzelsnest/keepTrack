//Connection to the api Server

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, filter, tap } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { logModel } from './logModel';
import { userModel } from './userModel';
//const endpoint = environment.apiUrl;
const endpoint = 'http://localhost:1945/api/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
     // 'Content-Type':  'application/x-www-form-urlencoded'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {
 
  constructor(private http: HttpClient) { }
    
  private extractData(res: Response) {
      const logs = [];
      let body = Object(res['logs']);
      return body || { }; 
  }

  private userLogin(res: Response) {
      const users = [];
      let body = Object(res['key']);
      return body || { }; 
  }

checkLogin(key: string): Observable<userModel> {
  return this.http.get(endpoint + 'login/' + key).pipe(
    map(this.userLogin));
}

getLogs(id): Observable<logModel> {
  return this.http.get<logModel>(endpoint + 'logs').pipe(
    tap(_ => console.log('fetched Logs')),
    catchError(this.handleError('getLogs', [])),
    map(this.extractData),
  );
}

getLog(id: number): Observable<logModel> {
  return this.http.get<logModel>(endpoint + 'log/'+id)
    .pipe(
        filter(l => l.id === id),
        tap(_ => console.log(`fetched logs id=${id}`)),
        catchError(this.handleError<any>(`getLog id=${id}`))
    , takeUntil(this.unsubscribe$))
    .subscribe(logs => this.log = logs);
}

    
storeLog(log): Observable<logModel> {
  return this.http.post<logModel>(endpoint + 'add', JSON.stringify(log), httpOptions).pipe(
    tap((log) => console.log(`added log w/ id=${log.id}`)),
    catchError(this.handleError<any>('storeLog'))
  );
}

updateLog(id, log): Observable<any> {
  return this.http.put(endpoint + 'log/' + id, JSON.stringify(log), httpOptions).pipe(
    tap(_ => console.log(`updated log id=${id}`)),
    catchError(this.handleError<any>('updateLog'))
  );
}
/*
deleteLog(id): Observable<logModel> {
  return this.http.delete<logModel>(endpoint + 'log/' + id, httpOptions).pipe(
    tap(_ => console.log(`deleted log id=${id}`)),
    catchError(this.handleError<any>('deleteLog'))
  );
}    
*/ 
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}
