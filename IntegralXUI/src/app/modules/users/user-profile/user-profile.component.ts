import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientUserService } from 'src/app/services/client-User/client-user.service'; 
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-add',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  logoFile!: File;
  logoPreview: string | null = null;
  receivedData: any;
  childValue: number = 0;

  constructor(
    private clientUserService:ClientUserService, 
    private authService:AuthService,
    private fb: FormBuilder,
     private router:Router, 
  private sharedDataService: SharedDataService) {
      this.receivedData = this.sharedDataService.getData();
      this.childValue = this.authService.getUserId()
    }
   


nofify($event: Event) {
throw new Error('Method not implemented.');
}
backToUsers() {
  this.router.navigate(['/clientuser/list']);
}


  userForm!: FormGroup;
  userId?: number;
  roles: { id: number; name: string }[] = []; // Load from API
  selectedClientId!: number;
  options = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' }
  ];
  selectedOptionId: number = 0;

  ngOnInit() {
    this.loadUserDetails();
    this.loadRolesDDL();
    this.userForm = this.fb.group({
      id:[this.childValue],
      firstName: ['', Validators.required],
      lastName: [''],
      userId: [''],
      clientId :[this.authService.getClientId()],
      email: ['', [Validators.required, Validators.email]],
      roleId: [Number, Validators.required], 
      contactNumber: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]], // Password must be at least 6 characters
      ConfirmPassword: ['', Validators.required],
      details: [''],
      isActive:[true],
      logo: [null]
    } // Custom validator added here
  );

  }

  loadUserDetails()
  {
  this.clientUserService.getClientUserDetails(this.childValue).subscribe((data: any) => {
   
      this.userForm.patchValue({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        userId: data.userId,
        clientId : data.clientId,
        email:  data.email,
        roleId:  data.roleId,
        contactNumber: data.contactNumber,
        userName: data.userName,
        password: data.password,
        ConfirmPassword: data.password,
        isActive: data.isActive,
        logo:  data.imagePath,
        details : data.details
      });

      this.logoPreview = data.imagePath;

      const reader = new FileReader();
      reader.onload = () => this.logoPreview = reader.result as string;
      // reader.readAsDataURL(this.logoFile);
    });
  }
  loadRolesDDL() {
    this.clientUserService.getRoles().subscribe((data: any) => {
      this.roles = data;
    });
  }

  goToEdit()
  {
    const userId  = this.authService.getUserId();
    this.authService.setData(userId); 
   
    this.router.navigate(['/clientuser/edit'], { 
      state: { clientData: { id: userId } } 
    });
  
}
  

  onFileSelect(event: any) {
    const files = event.target.files;

      this.logoFile = files[0];
      const reader = new FileReader();
      reader.onload = () => this.logoPreview = reader.result as string;
      reader.readAsDataURL(this.logoFile);
      this.userForm.patchValue({ logo: files }); 
  }
}
