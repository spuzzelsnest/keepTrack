import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { environment } from '../environments/environment';

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
      let body = Object(res["logs"]);
      return body || { }; 
  }
    
getLogs(): Observable<any> {
  return this.http.get(endpoint + 'logs').pipe(
    map(this.extractData),
  );
}

getLog(id): Observable<any> {
  return this.http.get(endpoint + 'log/' + id).pipe(
    map(this.extractData));
}

storeLog(log): Observable<any> {
  return this.http.post<any>(endpoint + 'add', JSON.stringify(log), httpOptions).pipe(
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

deleteLog(id): Observable<any> {
  return this.http.delete<any>(endpoint + 'log/' + id, httpOptions).pipe(
    tap(_ => console.log(`deleted log id=${id}`)),
    catchError(this.handleError<any>('deleteLog'))
  );
}    
  
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
