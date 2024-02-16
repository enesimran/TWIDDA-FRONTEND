import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard'

const routes: Routes = [
  { path: 'auth', loadComponent() {
      return import('./authpage/authpage.component').then(m => m.AuthpageComponent);
  }, },
  {
    path: 'home', loadComponent() {
        return import('./homepage/homepage.component').then(m => m.HomepageComponent);
    },
    canActivate: [authGuard]
  },
  {
    path: '', redirectTo: '/auth', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
