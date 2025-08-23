import { Routes } from '@angular/router';
import { SystemComponent } from './system.component';
 import { SystemAddComponent } from './system-add/system-add.component';
 import { SystemEditComponent } from './system-edit/system-edit.component';
import { SystemListComponent} from './system-list/system-list.component';

export const SYSTEM_ROUTES: Routes = [
  {
    path: '',
    component: SystemComponent,
    children: [
      {path :'',redirectTo:'list'},
      { path: 'list', component: SystemListComponent },
     { path: 'add', component: SystemAddComponent },
       { path: 'edit', component: SystemEditComponent },
      { path: 'system', component: SystemListComponent }
    ]
  }
];
