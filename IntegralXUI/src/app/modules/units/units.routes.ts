import { Routes } from '@angular/router';
import { UnitsComponent } from './units.component';
import { UnitAddComponent } from './unit-add/unit-add.component';
import { UnitEditComponent } from './unit-edit/unit-edit.component';
import { UnitListComponent } from './unit-list/unit-list.component';
export const UNITS_ROUTES: Routes = [
  {
    path: '',
    component: UnitsComponent,
    children: [
      {path :'',redirectTo:'list'},
      { path: 'list', component: UnitListComponent },
      { path: 'add', component: UnitAddComponent },
      { path: 'edit', component: UnitEditComponent },
      { path: 'plant', component: UnitListComponent },
    ]
  }
];
