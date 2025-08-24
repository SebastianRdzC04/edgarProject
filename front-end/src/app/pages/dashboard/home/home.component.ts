import { Component } from '@angular/core';
import { DashboardLayoutComponent } from '../../../layouts/dashboard-layout/dashboard-layout.component';
import { QuotesTableComponent } from '../../../components/tables/quotes-table/quotes-table.component';
import { MaterialsTableComponent } from '../../../components/tables/materials-table/materials-table.component';
import { QuotesFormComponent } from '../../../components/forms/quotes-form/quotes-form.component';


@Component({
  selector: 'app-home',
  imports: [DashboardLayoutComponent, QuotesTableComponent, MaterialsTableComponent, QuotesFormComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

}
