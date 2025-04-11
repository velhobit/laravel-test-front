import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  // POST /login
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  // POST /logout
  logout(): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/logout`,
      {},
      {
        headers: this.getAuthHeaders(),
      }
    );
  }

  // GET /me (com token no header)
  getMe(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<any>(`${this.apiUrl}/me`, { headers });
  }

  // Guarda o token no localStorage
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Recupera o token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Remove o token (logout)
  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
