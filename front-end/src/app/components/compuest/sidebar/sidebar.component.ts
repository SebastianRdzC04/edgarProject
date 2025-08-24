import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthServiceService } from '../../../services/auth.service.service';
import { IUser } from '../../../models/user.mode';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  private authService = inject(AuthServiceService);
  isAuthenticated = false;
  user: IUser | null = null;


  constructor() {
    this.authService.isAuthenticated().subscribe(isAuth => {
      if (isAuth) {
        this.isAuthenticated = true;
        this.user = JSON.parse(localStorage.getItem('user') || 'null');

      } else {
        this.isAuthenticated = false;
      }
    });
  }

  logout() {
    this.isAuthenticated = false;
    this.user = null;
  }
}
