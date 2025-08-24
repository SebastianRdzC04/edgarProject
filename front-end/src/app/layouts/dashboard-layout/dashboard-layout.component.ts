import { Component } from '@angular/core';
import { HeaderDashboardComponent } from '../../components/header-dashboard/header-dashboard.component';
import { SidebarComponent } from '../../components/compuest/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard-layout',
  imports: [HeaderDashboardComponent, SidebarComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {

}
