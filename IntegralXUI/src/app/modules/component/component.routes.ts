import { Routes } from '@angular/router';
import { ComponentComponent } from './component/component.component';
import { ComponentAddComponent } from './component-add/component-add.component';  
import { ComponentEditComponent } from './component-edit/component-edit.component';
import { ComponentListComponent } from './component-list/component-list.component';

export const EQUIPMENT_ROUTES: Routes = [
  {
    path: '',
    component: ComponentComponent,
    children: [
      {path :'',redirectTo:'list'},
      { path: 'list', component: ComponentListComponent },
      { path: 'add', component: ComponentAddComponent },
      { path: 'edit', component: ComponentEditComponent },
      { path: 'equipment', component: ComponentListComponent },
    ]
  }
];
