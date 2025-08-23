import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientUserService } from 'src/app/services/client-User/client-user.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/common/loadingPanel/loading.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-user-add',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './users-edit.component.html',
  styleUrl: './users-edit.component.scss'
})
export class UsersEditComponent {
  logoFile!: File;
  logoPreview: string | null = null;
  admin: boolean;
  passwordChanges: boolean;
  receivedData: any;
  childValue: number = 0;
  canEdit: boolean = false;
  canDelete: boolean = false;
  currentUser:number;
  constructor(
    private clientUserService: ClientUserService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
     private ls:LoadingService,
    private sharedDataService: SharedDataService) {
    this.receivedData = this.authService.getData();
    this.childValue = this.receivedData.id;
  }

  ngOnInit() {
    this.ls.showLoading();
    this.canEdit = (this.authService.getCanEdit());
    // if (!this.canEdit) {
    //   this.backToUsers();
    // }
    this.currentUser = this.authService.getUserId();
    this.canDelete = (this.authService.getCanDelete());
    this.loadUserDetails();
    this.loadRolesDDL();
    this.userForm = this.fb.group({
      id: [this.childValue],
      firstName: ['', Validators.required],
      lastName: [''],
      userId: [''],
      clientId: [this.authService.getClientId()],
      email: ['', [Validators.required, Validators.email],[this.emailValidator.bind(this)]],
      roleId: [Number, Validators.required],
      contactNumber: ['', Validators.required,[this.contactValidator.bind(this)]],
      userName: ['', Validators.required,[this.userNameValidator.bind(this)]],
      password: ['', [Validators.required, Validators.minLength(6)]], // Password must be at least 6 characters
      ConfirmPassword: ['', Validators.required],
      details: [''],
      isActive: [true],
      isAdmin: [false],
      logo: [null]
    },
      { validator: this.matchPasswords('password', 'ConfirmPassword') } // Custom validator added here
    );
    this.ls.hideLoading();
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


  loadUserDetails() {
    this.clientUserService.getClientUserDetails(this.childValue).subscribe((data: any) => {

      this.userForm.patchValue({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        userId: data.userId,
        clientId: data.clientId,
        email: data.email,
        roleId: data.roleId,
        contactNumber: data.contactNumber,
        userName: data.userName,
        password: data.password,
        ConfirmPassword: data.password,
        isActive: data.isActive,
        logo: data.imagePath,
        details: data.details,
        isAdmin: data.isAdmin,
        isPasswordChanges: data.IsPasswordChanged,
      });
     
      this.admin = data.isAdmin;
      this.passwordChanges = data.IsPasswordChanged;
      this.logoPreview = data.imagePath;

      const reader = new FileReader();
      reader.onload = () => this.logoPreview = reader.result as string;
      // reader.readAsDataURL(this.logoFile);
    });
  }
  matchPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get(passwordKey)?.value;
      const confirmPassword = formGroup.get(confirmPasswordKey)?.value;

      if (password !== confirmPassword) {
        formGroup.get(confirmPasswordKey)?.setErrors({ mustMatch: true });
        return { mustMatch: true };
      } else {
        formGroup.get(confirmPasswordKey)?.setErrors(null);
        return null;
      }
    };
  }
  loadRolesDDL() {
    this.clientUserService.getRoles().subscribe((data: any) => {
      this.roles = data;
    });
  }

  emailValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    
    // Skip validation if email is empty
    if (!email) {
      return new Observable<null>();
    }
  
    // Return the observable directly without subscribing
    return this.clientUserService.checkEmailExists(this.childValue, email).pipe(
      map((data: any) => {
        
        if (data) {
          // If email exists, return the error
          return { emailExists: true };
        }
        // If email does not exist, validation passes
        return null;
      })
    );
  }
  
  contactValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    const contact = control.value;
    if (!contact) {
      return new Observable<null>();
    }
    return this.clientUserService.checkContactExists(this.childValue, contact).pipe(
      map((data: any) => {
        
        if (data) {
          return { contactExists: true };
        }
        return null;
      })
    );
  }
   userNameValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    const username = control.value;
    if (!username) {
      return new Observable<null>();
    }
    return this.clientUserService.checkuserIdExists(this.childValue, username).pipe(
      map((data: any) => {
        
        if (data) {
          return { userNameExists: true };
        }
        return null;
      })
    );
  }

  saveUser(): void {
    
    const controls = this.userForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
       
      }
    }

    if (this.userForm.valid) {
      this.ls.showLoading();
      let formData = new FormData();
      // Append form values
      Object.keys(this.userForm.value).forEach(key => {
        formData.append(key, this.userForm.value[key]);
      });

      // Append logo
      if (this.logoFile) {
        formData.append('logo', this.logoFile);
      }


      this.clientUserService.addClientUser(formData).subscribe(
        (response) => {
          this.ls.hideLoading();
          Swal.fire({
            title: 'Success!',
            text: 'Client added successfully',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.backToUsers();
        }
      );
    } else {
      this.ls.hideLoading();
      Swal.fire({
        title: 'Error!',
        text: 'Invalid details, Please try again',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }
  DeleteUser() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this client!',
      icon: 'warning',
      width: '300px',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientUserService.deleteItem(this.childValue).subscribe(
          () => this.backToUsers(),
          error =>
            Swal.fire('Delete failed:', error)
        );

      }
    });
  }

  generatePassword(length: number = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // No special characters
    let password = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }

    return password;
  }
  generateUserId(clientName: string): string {
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
    return `${clientName}_${randomNum}`;
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
