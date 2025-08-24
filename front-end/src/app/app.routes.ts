import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { AuthenticateComponent } from './pages/authenticate/authenticate.component';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { MaterialsComponent } from './pages/dashboard/materials/materials.component';
import { QuotesComponent } from './pages/dashboard/quotes/quotes.component';


export const routes: Routes = [
  {
    path: "",
    component: IndexComponent
  },
  {
    path: "auth",
    component: AuthenticateComponent
  },
  {
    path: "dashboard",
    component: HomeComponent
  },
  {
    path: "dashboard/materials",
    component: MaterialsComponent
  },
  {
    path: "dashboard/quotes",
    component: QuotesComponent
  }

];
