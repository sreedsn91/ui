import { Routes } from '@angular/router';
import { RoleLandingComponent } from '../roles/role-landing/role-landing.component';
import { RoleAddComponent } from '../roles/role-add/role-add.component';
import { RoleEditComponent } from '../roles/role-edit/role-edit.component';
import { RoleListComponent } from './role-list/role-list.component';

export const ROLE_ROUTES: Routes = [
  {
    path: '',
    component: RoleLandingComponent,
    children: [
      {path :'',redirectTo:'list'},
      { path: 'list', component: RoleListComponent },
      { path: 'add', component: RoleAddComponent },
      { path: 'edit', component: RoleEditComponent },
      { path: 'role', component: RoleListComponent },
    ]
  }
];
