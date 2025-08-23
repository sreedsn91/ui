import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-auth-signin',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export  class AuthSigninComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Initialize the login form
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  
  onLogin(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.authService.login(username, password).subscribe(
        (response) => {
          if(this.authService.getSuper())
          {
            this.router.navigate(['/dashboard']);
          }
          else{this.router.navigate(['/clientdashboard']);}
          
        },
        (error) => {
          console.error('Login failed:', error);
          Swal.fire({
            title: 'Error!',
            text:  'Login failed!, Invalid username or password',
            icon: 'error',
            confirmButtonText: 'Ok'
                 });
        }
      );
    }
  }
}
