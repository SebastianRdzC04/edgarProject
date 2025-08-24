import { Component } from '@angular/core';
import { QuotesTableComponent } from '../../../components/tables/quotes-table/quotes-table.component';
import { DashboardLayoutComponent } from '../../../layouts/dashboard-layout/dashboard-layout.component';

@Component({
  selector: 'app-quotes',
  imports: [QuotesTableComponent, DashboardLayoutComponent],
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.css'
})
export class QuotesComponent {

}
