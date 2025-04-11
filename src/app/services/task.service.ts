import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  // GET /tasks
  getAll(): Observable<any> {
    return this.http.get<any>(this.apiUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  // GET /tasks/:id
  get(uuid: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${uuid}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // POST /tasks
  create(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, task, {
      headers: this.getAuthHeaders(),
    });
  }

  // PUT /tasks/:id
  update(uuid: string, task: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${uuid}`, task, {
      headers: this.getAuthHeaders(),
    });
  }

  // DELETE /tasks/:id
  delete(uuid: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${uuid}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // GET /my-tasks
  getMyTasks(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/my-tasks`, {
      headers: this.getAuthHeaders(),
    });
  }
}
