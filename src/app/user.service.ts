import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '../../node_modules/@angular/common/http';
import { Observable, of } from '../../node_modules/rxjs';
import { User } from './user';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'api/users';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

     /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
   

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

getUsers(): Observable<User[]> {

 return this.http.get<User[]>(this.usersUrl)
 .pipe(catchError(this.handleError<User[]>('getUsers', [])));
}

getUser(id: number): Observable<User> {
 
 const url = `${this.usersUrl}/${id}`;
return this.http.get<User>(url).pipe(
 catchError(this.handleError<User>(`getUser id=${id}`))
);
}

/** PUT: update the User on the server */
update(user: User): Observable<User> {
  const url = `${this.usersUrl}`;
  
return this.http.put<User>(url, user, this.httpOptions).pipe(
 catchError(this.handleError<User>('updateUser'))
);
}

/** POST: add a new User to the server */
add(user: User): Observable<User> {
return this.http.post<User>(this.usersUrl, user, this.httpOptions).pipe(
 catchError(this.handleError<User>('addUser'))
);
}

/** DELETE: delete the User from the server */
delete(user: User | number): Observable<User> {
const id = typeof user === 'number' ? user : user.id;
const url = `${this.usersUrl}/${id}`;

return this.http.delete<User>(url, this.httpOptions).pipe(
 catchError(this.handleError<User>('deleteUser'))
);
}

}
