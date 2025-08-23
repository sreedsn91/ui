import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth.service'; 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const moduleId = route.data['moduleid']; // Defined in routing config

    if (this.authService.isAuthenticated()) {
      if (moduleId == 0) {
        return true;
      } else {
        const hasAccess = await this.authService.hasModuleAccess(moduleId);
      
        if (hasAccess.canAccess) {
          
          return true;
        } else {
          if(hasAccess.isSuperAdmin)
          { 
            this.router.navigate(['dashboard']); // Redirect to login page
          return false;
          }
          else
          {
            this.router.navigate(['clientdashboard']); // Redirect to login page
          return false;
          }
          
        }
      }
    } else {
      this.router.navigate(['login']); // Redirect to login page
      return false;
    }
  }
}
