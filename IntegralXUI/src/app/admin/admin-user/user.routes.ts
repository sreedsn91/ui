import { Routes } from '@angular/router';
import { UserLandingComponent } from './user-landing/user-landing.component';
import { UserEditComponent } from './user-edit/user-edit.component'; 
import { UserAddComponent } from './user-add/user-add.component'; 
import { UserListComponent } from './user-list/user-list.component';

export const USER_ROUTES: Routes = [
  {
    path: '',
    component: UserLandingComponent,
    children: [
        {path :'',redirectTo:'list'},
      { path: 'list', component: UserListComponent },
      { path: 'add', component: UserAddComponent },
      { path: 'edit', component: UserEditComponent }
    ]
  }
];
