import { Component } from '@angular/core';
import { DashboardLayoutComponent } from '../../../layouts/dashboard-layout/dashboard-layout.component';
import { QuotesTableComponent } from '../../../components/tables/quotes-table/quotes-table.component';


@Component({
  selector: 'app-home',
  imports: [DashboardLayoutComponent, QuotesTableComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

}
