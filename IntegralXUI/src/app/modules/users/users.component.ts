import { Component } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-users',
  imports: [AppRoutingModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
 
  constructor( private auth : AuthService,private location: Location,private router:Router) {
  }
   ngOnInit() {
     
  

  }
}
