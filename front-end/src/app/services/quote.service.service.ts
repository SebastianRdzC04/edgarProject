import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { QuoteCreate, QuoteResponse, QuoteResponseAll } from '../models/quote.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuoteServiceService {
  private http = inject(HttpClient)

  createQuote(quote: QuoteCreate): Observable<QuoteResponse> {
    return this.http.post<QuoteResponse>(`${environment.apiUrl}/quotes`, quote);
  }

  getQuote(id: string): Observable<QuoteResponse> {
    return this.http.get<QuoteResponse>(`${environment.apiUrl}/quotes/${id}`);
  }

  getAllQuotes(): Observable<QuoteResponseAll> {
    return this.http.get<QuoteResponseAll>(`${environment.apiUrl}/quotes`);
  }

  constructor() { }
}
