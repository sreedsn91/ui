import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ClientUserService } from 'src/app/services/client-User/client-user.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  imports:[CommonModule,ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  userId = 1; // Replace with actual user ID from session or auth service

  constructor(private fb: FormBuilder, private http: HttpClient,  private clientUserService:ClientUserService,private auth:AuthService,private router: Router ) {
    this.changePasswordForm = this.fb.group({
      userId: [auth.getUserId()],
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')!.value === form.get('confirmPassword')!.value
      ? null
      : { passwordMismatch: true };
  }
  nvigate()
  {
    this.router.navigate(["users/list"]);
  }

  changePassword() {
    if (this.changePasswordForm.invalid) return;
    let formData = new FormData();
    // Append form values
    Object.keys(this.changePasswordForm.value).forEach(key => {
      formData.append(key, this.changePasswordForm.value[key]);
    });

      this.clientUserService.changePassword(formData).subscribe(
        response =>  { Swal.fire({
                    title: 'Success!',
                    text:  'Password changes successfully',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  })
                this.nvigate();
                } ,
        error => Swal.fire({
          title: 'Error!',
          text:  error.error.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        }) // Log actual validation errors
      );
   
  }
}
