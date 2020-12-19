import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '../../node_modules/@angular/common/http';
import { Observable, of } from '../../node_modules/rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Project } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectsUrl = 'api/projects';  // URL to web api

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

      // TODO: better job of transforming error for Project consumption


      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getProjects(): Observable<Project[]> {

    return this.http.get<Project[]>(this.projectsUrl)
      .pipe(catchError(this.handleError<Project[]>('getProjects', [])));
  }

  getProject(id: number): Observable<Project> {

    const url = `${this.projectsUrl}/${id}`;
    return this.http.get<Project>(url).pipe(
      catchError(this.handleError<Project>(`getProject id=${id}`))
    );
  }

  /** PUT: update the Project on the server */
  update(project: Project): Observable<Project> {
    const url = `${this.projectsUrl}`;

    return this.http.put<Project>(url, project, this.httpOptions).pipe(
      catchError(this.handleError<Project>('updateProject'))
    );
  }

  /** POST: add a new Project to the server */
  add(project: Project): Observable<Project> {
    return this.http.post<Project>(this.projectsUrl, project, this.httpOptions).pipe(
      catchError(this.handleError<Project>('addProject'))
    );
  }

  /** DELETE: delete the Project from the server */
  delete(project: Project | number): Observable<Project> {
    const id = typeof project === 'number' ? project : project.id;
    const url = `${this.projectsUrl}/${id}`;

    return this.http.delete<Project>(url, this.httpOptions).pipe(
      catchError(this.handleError<Project>('deleteProject'))
    );
  }
}
