import { Component } from '@angular/core';
import { MaterialsTableComponent } from '../../../components/tables/materials-table/materials-table.component';
import { DashboardLayoutComponent } from '../../../layouts/dashboard-layout/dashboard-layout.component';


@Component({
  selector: 'app-materials',
  imports: [MaterialsTableComponent, DashboardLayoutComponent],
  templateUrl: './materials.component.html',
  styleUrl: './materials.component.css'
})
export class MaterialsComponent {

}
