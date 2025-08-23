import { Routes } from '@angular/router';
import { ClientLandingComponent } from './client-landing/client-landing.component';
import { ClientAddComponent } from './client-add/client-add.component';
import { ClientEditComponent } from './client-edit/client-edit.component'; 
import { ClientListComponent } from './client-list/client-list.component';

export const CLIENT_ROUTES: Routes = [
  {
    path: '',
    component: ClientLandingComponent,
    children: [
        {path :'',redirectTo:'list'},
      { path: 'list', component: ClientListComponent },
      { path: 'add', component: ClientAddComponent },
      { path: 'edit', component: ClientEditComponent }
    ]
  }
];
