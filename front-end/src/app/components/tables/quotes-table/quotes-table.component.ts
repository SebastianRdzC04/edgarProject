import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteServiceService } from '../../../services/quote.service.service';
import { QuoteResponseAll, QuoteBase } from '../../../models/quote.model';
import { QuoteUpdateFormComponent } from '../../forms/quote-update-form/quote-update-form.component';
import { BaseModalComponent } from '../../modals/base-modal/base-modal.component';


@Component({
  selector: 'app-quotes-table',
  imports: [CommonModule, QuoteUpdateFormComponent, BaseModalComponent],
  templateUrl: './quotes-table.component.html',
  styleUrl: './quotes-table.component.css'
})
export class QuotesTableComponent {
  private quoteService = inject(QuoteServiceService);
  quotes: QuoteBase[] = [];

  // Modal state
  modalOpen = false;
  selectedQuoteId: string | null = null;

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

  openUpdateModal(quoteId: string): void {
    this.selectedQuoteId = quoteId;
    this.modalOpen = true;
  }

  closeUpdateModal(): void {
    this.modalOpen = false;
    this.selectedQuoteId = null;
  }
}
