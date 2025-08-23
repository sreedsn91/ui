import { Routes } from '@angular/router';
import { EquipmentComponent } from './equipment.component'; 
import { EquipmentAddComponent } from './equipment-add/equipment-add.component'; 
import { EquipmentEditComponent } from './equipment-edit/equipment-edit.component';
import { EquipmentListComponent } from './equipment-list/equipment-list.component'; 

export const EQUIPMENT_ROUTES: Routes = [
  {
    path: '',
    component: EquipmentComponent,
    children: [
      {path :'',redirectTo:'list'},
      { path: 'list', component: EquipmentListComponent },
      { path: 'add', component: EquipmentAddComponent },
      { path: 'edit', component: EquipmentEditComponent },
      { path: 'equipment', component: EquipmentListComponent },
    ]
  }
];
