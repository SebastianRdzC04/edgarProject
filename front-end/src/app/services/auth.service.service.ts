import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }


  register(data: registerModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }

}
