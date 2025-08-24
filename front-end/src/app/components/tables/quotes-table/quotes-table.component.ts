import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteServiceService } from '../../../services/quote.service.service';
import { QuoteResponseAll, QuoteBase } from '../../../models/quote.model';


@Component({
  selector: 'app-quotes-table',
  imports: [CommonModule],
  templateUrl: './quotes-table.component.html',
  styleUrl: './quotes-table.component.css'
})
export class QuotesTableComponent {
  private quoteService = inject(QuoteServiceService);
  quotes: QuoteBase[] = [];

  constructor() {
    this.loadQuotes();
  }

  private loadQuotes(): void {
    this.quoteService.getAllQuotes().subscribe({
      next: (response: QuoteResponseAll) => {
        this.quotes = response.data.quotes;
      },
      error: (error) => {
        console.error('Error loading quotes:', error);
      }
    });
  }
}
