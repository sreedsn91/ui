import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./auth-signin/auth-signin.component').then((m)=>m.AuthSigninComponent)
      },
      {
        path: 'signin',
        loadComponent: () => import('./auth-signin/auth-signin.component').then((m)=>m.AuthSigninComponent)
      },
      {
        path: 'signup',
        loadComponent: () => import('./auth-signup/auth-signup.component').then((m)=>m.default)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {}
