import { Routes } from '@angular/router';
import { CorrossionLoopComponent } from './corrossion-loop/corrossion-loop.component';
import { CorrossionLoopAddComponent } from './corrossion-loop-add/corrossion-loop-add.component'; 
import { CorrossionLoopEditComponent } from './corrossion-loop-edit/corrossion-loop-edit.component';
import { CorrossionLoopListComponent } from './corrossion-loop-list/corrossion-loop-list.component';

export const CL_ROUTES: Routes = [
  {
    path: '',
    component: CorrossionLoopComponent,
    children: [
      {path :'',redirectTo:'list'},
      { path: 'list', component: CorrossionLoopListComponent },
      { path: 'add', component: CorrossionLoopAddComponent },
      { path: 'edit', component: CorrossionLoopEditComponent },
      { path: 'equipment', component: CorrossionLoopComponent },
    ]
  }
];
