import { Routes } from '@angular/router';
import { LogsComponent } from './logs.component'; 

export const LOG_ROUTES: Routes = [
  {
    path: '',
    component: LogsComponent,
    children: [
      {path :'',redirectTo:'list'},
      { path: 'list', component: LogsComponent },
    ]
  }
];
