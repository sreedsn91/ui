import { Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UsersAddComponent } from './users-add/users-add.component';
import { UsersEditComponent } from './users-edit/users-edit.component'; 
import { UsersListComponent } from './users-list/users-list.component'; 
import { RoleLandingComponent } from '../roles/role-landing/role-landing.component';
import { RoleAddComponent } from '../roles/role-add/role-add.component';
import { RoleEditComponent } from '../roles/role-edit/role-edit.component';

export const USERS_ROUTES: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {path :'',redirectTo:'list'},
      { path: 'list', component: UsersListComponent },
      { path: 'add', component: UsersAddComponent },
      { path: 'edit', component: UsersEditComponent },
      { path: 'role', component: RoleLandingComponent },
      { path: 'role/add', component: RoleAddComponent },
      { path: 'role/edit', component: RoleEditComponent }
    ]
  }
];
