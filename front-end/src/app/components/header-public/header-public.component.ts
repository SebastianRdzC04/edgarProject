import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthServiceService } from '../../services/auth.service.service';

@Component({
  selector: 'app-header-public',
  imports: [RouterLink],
  templateUrl: './header-public.component.html',
  styleUrl: './header-public.component.css'
})
export class HeaderPublicComponent {
  private authService = inject(AuthServiceService);
  isAuth = false;

  constructor() {
    this.authService.isAuthenticated().subscribe((auth) => {
      this.isAuth = auth;
    });
  }

}
