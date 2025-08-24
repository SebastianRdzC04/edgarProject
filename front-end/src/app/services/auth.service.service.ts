import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { registerModel } from '../models/auth.model';

interface LoginCredentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private apiUrl = environment.apiUrl;
  private router = inject(Router);
  private http = inject(HttpClient);

  login(data: LoginCredentials): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }


  register(data: registerModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  isAuthenticated(): Observable<boolean> {
  const token = localStorage.getItem('token');
  if (token) {
    return this.http.post(`${this.apiUrl}/me`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
  return of(false);
}

}
