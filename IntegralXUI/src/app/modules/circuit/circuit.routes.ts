import { Routes } from "@angular/router";
import { CircuitAddComponent } from "./circuit-add/circuit-add.component";
import { CircuitEditComponent } from "./circuit-edit/circuit-edit.component";
import { CircuitListComponent } from "./circuit-list/circuit-list.component";
import { CircuitComponent } from "./circuit.component";
export const CIRCUIT_ROUTES: Routes = [
  {
    path: '',
    component: CircuitComponent,
    children: [
      {path :'',redirectTo:'list'},
      { path: 'list', component: CircuitListComponent },
      { path: 'add', component: CircuitAddComponent },
      { path: 'edit', component: CircuitEditComponent },
      { path: 'system', component: CircuitComponent },
    ]
  }
];
