import { APP_INITIALIZER, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './common/layout/admin/admin.component'; 
import { GuestComponent } from './common/layout/guest/guest.component'; 
import { AuthGuard } from './services/auth/guard/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './services/config/config.service';

export function initializeApp(configService: ConfigService): () => Promise<void> {
  return () => configService.loadConfig();
}

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [AuthGuard], data: { moduleid: -1 } },
 { path: 'reload', loadComponent: () => import('./common/reload/reload.component').then(c => c.ReloadComponent), canActivate: [AuthGuard], data: { moduleid: 0 } },

      { path: 'dashboard', loadComponent: () => import('./modules/dashboard/dashboard.component').then(c => c.DashboardComponent), canActivate: [AuthGuard], data: { moduleid: -1 } },
      { path: 'profile', loadComponent: () => import('./modules/users/user-profile/user-profile.component').then(c => c.UserProfileComponent), canActivate: [AuthGuard], data: { moduleid: 0 } },
      { path: 'changepasword', loadComponent: () => import('./modules/users/change-password/change-password.component').then(c => c.ChangePasswordComponent), canActivate: [AuthGuard], data: { moduleid: 0 } },

      { path: 'clients', loadChildren: () => import('./admin/admin-client/client.routes').then(m => m.CLIENT_ROUTES), canActivate: [AuthGuard], data: { moduleid: -1 } },
      { path: 'user', loadChildren: () => import('./admin/admin-user/user.routes').then(m => m.USER_ROUTES), canActivate: [AuthGuard], data: { moduleid: -1 } },
      { path: 'users', redirectTo: 'clientuser' },

      // Grouping Client-related routes
      { path: 'clientdashboard', loadComponent: () => import('./modules/dashboard/dashboard.component').then(c => c.DashboardComponent), canActivate: [AuthGuard], data: { moduleid: 0} },
      { path: 'clientuser', loadChildren: () => import('./modules/users/users.routes').then(c => c.USERS_ROUTES), canActivate: [AuthGuard], data: { moduleid: 3 } },
      { path: 'clientroles', loadChildren: () => import('./modules/roles/roles.routes').then(c => c.ROLE_ROUTES), canActivate: [AuthGuard], data: { moduleid: 4 } },
      { path: 'clientlogs', loadChildren: () => import('./modules/logs/logs.routes').then(c => c.LOG_ROUTES), canActivate: [AuthGuard], data: { moduleid: 2 } },
      { path: 'logs', loadChildren: () => import('./modules/logs/logs.routes').then(c => c.LOG_ROUTES), canActivate: [AuthGuard], data: { moduleid: 2 } },
      { path: 'roles', loadChildren: () => import('./modules/roles/roles.routes').then(c => c.ROLE_ROUTES), canActivate: [AuthGuard], data: { moduleid: 4 } },
      { path: 'clientarea', loadChildren: () => import('./modules/area/area.routes').then(c => c.AREA_ROUTES), canActivate: [AuthGuard], data: { moduleid: 5 } },
      { path: 'area', loadChildren: () => import('./modules/area/area.routes').then(c => c.AREA_ROUTES), canActivate: [AuthGuard], data: { moduleid: 5 } },
      { path: 'plant', loadChildren: () => import('./modules/plant/plant.routes').then(c => c.PLANT_ROUTES), canActivate: [AuthGuard], data: { moduleid: 6 } },
      { path: 'clientplant', loadChildren: () => import('./modules/plant/plant.routes').then(c => c.PLANT_ROUTES), canActivate: [AuthGuard], data: { moduleid: 6 } },
      { path: 'clientunit', loadChildren: () => import('./modules/units/units.routes').then(c => c.UNITS_ROUTES), canActivate: [AuthGuard], data: { moduleid: 7 } },
      { path: 'clientsystem', loadChildren: () => import('./modules/system/system.routes').then(c => c.SYSTEM_ROUTES), canActivate: [AuthGuard], data: { moduleid: 8 } },
      { path: 'clientcircuit', loadChildren: () => import('./modules/circuit/circuit.routes').then(c => c.CIRCUIT_ROUTES), canActivate: [AuthGuard], data: { moduleid: 15 } },
      { path: 'clientcorrosionloop', loadChildren: () => import('./modules/corrossionLoop/corrossionLoop.routes').then(c => c.CL_ROUTES), canActivate: [AuthGuard], data: { moduleid: 16 } },
      { path: 'clientcomponent', loadChildren: () => import('./modules/component/component.routes').then(c => c.EQUIPMENT_ROUTES), canActivate: [AuthGuard], data: { moduleid: 10 } },
      { path: 'clientequipment', loadChildren: () => import('./modules/equipment/equipment.routes').then(c => c.EQUIPMENT_ROUTES), canActivate: [AuthGuard], data: { moduleid: 9 } },
      { path: 'clientciml', loadComponent: () => import('./modules/plant/plant.component').then(c => c.PlantComponent), canActivate: [AuthGuard], data: { moduleid: 11 } },
      { path: 'clientimport', loadComponent: () => import('./modules/import/import.component').then(c => c.ImportComponent), canActivate: [AuthGuard], data: { moduleid: 16 } },
     
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      { path: '', redirectTo: 'auth', pathMatch: 'full' },
      { path: 'auth', loadChildren: () => import('./authentication/authentication-routing.module').then(m => m.AuthenticationRoutingModule) },
      { path: 'login', loadChildren: () => import('./authentication/authentication-routing.module').then(m => m.AuthenticationRoutingModule) }
    ]
  }
];

@NgModule({
  imports: [HttpClientModule, RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService],
      multi: true,
    },
  ]
})
export class AppRoutingModule {}
