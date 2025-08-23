import { Routes } from '@angular/router';
import { AreaComponent } from './area.component'; 
import { AreaAddComponent } from './area-add/area-add.component'; 
import { AreaEditComponent } from './area-edit/area-edit.component';
import { AreaListComponent } from './area-list/area-list.component'; 

export const AREA_ROUTES: Routes = [
  {
    path: '',
    component: AreaComponent,
    children: [
      {path :'',redirectTo:'list'},
      { path: 'list', component: AreaListComponent },
      { path: 'add', component: AreaAddComponent },
      { path: 'edit', component: AreaEditComponent },
      { path: 'area', component: AreaListComponent },
    ]
  }
];
