import { Routes } from '@angular/router';
import { PlantComponent } from './plant.component'; 
import { PlantAddComponent } from './plant-add/plant-add.component'; 
import { PlantEditComponent } from './plant-edit/plant-edit.component';
import { PlantListComponent } from './plant-list/plant-list.component'; 

export const PLANT_ROUTES: Routes = [
  {
    path: '',
    component: PlantComponent,
    children: [
      {path :'',redirectTo:'list'},
      { path: 'list', component: PlantListComponent },
      { path: 'add', component: PlantAddComponent },
      { path: 'edit', component: PlantEditComponent },
      { path: 'plant', component: PlantListComponent },
    ]
  }
];
