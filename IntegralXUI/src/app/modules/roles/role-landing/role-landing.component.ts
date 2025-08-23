import { Component } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-users',
  imports: [AppRoutingModule],
  templateUrl: './role-landing.component.html',
  styleUrl: './role-landing.component.scss'
})
export class RoleLandingComponent {
 
  constructor( private auth : AuthService,private location: Location,private router:Router) {
  }
   ngOnInit() {
  }
}
