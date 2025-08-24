import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // added
import { HeaderPublicComponent } from '../../components/header-public/header-public.component';
import { BaseModalComponent } from '../../components/modals/base-modal/base-modal.component';
import { QuotesFormComponent } from '../../components/forms/quotes-form/quotes-form.component';
import { BaseAlertComponent } from '../../components/alerts/base-alert/base-alert.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, HeaderPublicComponent, BaseModalComponent, QuotesFormComponent, BaseAlertComponent], // CommonModule included
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  modalOpen = false;

  // alert/toast control at page level
  showAlert = false;
  alertTitle = '';
  alertText = '';
  alertType: 'success' | 'alert' | 'danger' = 'success';

  openModal(): void {
    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = false;
  }

  // Handle result emitted by QuotesForm: close modal + show toastr
  onQuoteResult(event: { type: 'success' | 'alert' | 'danger'; title: string; text: string }): void {
    // cerrar modal
    this.modalOpen = false;

    // mostrar toastr en la página principal
    this.alertType = event.type;
    this.alertTitle = event.title;
    this.alertText = event.text;
    this.showAlert = true;

    // ocultar despues de unos segundos
    setTimeout(() => {
      this.showAlert = false;
    }, 4000);
  }
}
