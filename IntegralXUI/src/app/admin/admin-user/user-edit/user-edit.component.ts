import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientService } from 'src/app/services/client/client.service';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { LoadingService } from 'src/app/common/loadingPanel/loading.service';
@Component({
  selector: 'app-user-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent {
  passwordchanged: boolean;
  clientData: any;
  childValue: number = 0;
  receivedData: any;
  userForm!: FormGroup;
  userId?: number;
  clients: { id: number; name: string }[] = []; // Load from API
  selectedClientId!: number;
  options = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' }
  ];
  selectedOptionId: number = 0;

  constructor(private clientService: ClientService, private fb: FormBuilder, private router: Router, private sharedDataService: SharedDataService,private ls:LoadingService) {
    this.receivedData = this.sharedDataService.getData();
    this.childValue = this.receivedData.id;
  }

  nofify($event: Event) {
    throw new Error('Method not implemented.');
  }
  backToUsers() {
    this.router.navigate(["user"]);
  }



  ngOnInit() {
    this.loadClientsDDL();
    this.userForm = this.fb.group({
      id: [this.childValue],
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email],[this.emailValidator.bind(this)]],
      role: [{ value: 'Admin', disabled: true }, Validators.required],
      contactNumber: ['', Validators.required,[this.contactValidator.bind(this)]],
      userName: ['', Validators.required,[this.userNameValidator.bind(this)]],
      clientId: [null, Validators.required],
      password: ['', Validators.required],
      sendNotification: [false],
      active: [true],
      isAdmin: [true],
      isSuperAdmin: [false],
      isPasswordChanged: [false],
      isLocked: [true]
    });

    this.loadUserDetails();

    this.userForm.get('clientId')?.valueChanges.subscribe(() => {
      this.userForm.get('email')?.updateValueAndValidity();
      this.userForm.get('contactNumber')?.updateValueAndValidity();
      this.userForm.get('userName')?.updateValueAndValidity();
    });
  }
  loadUserDetails() {
    this.clientService.getClientAdminUserDetais(this.childValue).subscribe((data: any) => {
     
      this.userForm.patchValue({
        id: this.childValue,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        contactNumber: data.contactNumber,
        role: data.isLocked ? 'User Admin' : 'Admin',
        password: data.password,
        userName: data.userName,
        clientId: data.clientId,
        isLocked: data.isLocked,
        isPasswordChanged: data.isPasswordChanged
      });
      this.passwordchanged = data.isPasswordChanged;
    });
  }
  onModeChange(event: any) {
    if (event.target.checked) {
      this.userForm.patchValue({
        role: 'User admin',
        isLocked: true
      });
    }
    else {
      this.userForm.patchValue({
        role: 'Admin',
        isLocked: false
      });
    }
  }
  loadClientsDDL() {
    this.clientService.getClientsDDL().subscribe((data: any) => {
      this.clients = data;
    });
  }
  onDelete(): void {
  
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
        this.clientService.deleteUser(this.childValue).subscribe(
          () => this.backToUsers(),
          error =>
            Swal.fire('Delete failed:', error)
        );

      }
    });
  }


  emailValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    const clientId = this.userForm.get('clientId')?.value;
    // Skip validation if email is empty
    if (!email) {
      return new Observable<null>();
    }
  
    // Return the observable directly without subscribing
    return this.clientService.checkEmailExistsWithClient(clientId, this.childValue, email).pipe(
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
    const clientId = this.userForm.get('clientId')?.value;
    return this.clientService.checkContactExistsWithClient(clientId,this.childValue, contact).pipe(
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
    const clientId = this.userForm.get('clientId')?.value;
    return this.clientService.checkuserIdExistsWithClient(clientId, this.childValue, username).pipe(
      map((data: any) => {
        
        if (data) {
          return { userNameExists: true };
        }
        return null;
      })
    );
  }


  saveUser(): void {
    if (this.userForm.valid) {
      this.ls.showLoading();
      this.clientService.addClientAdminUser(this.userForm.value).subscribe(
        (response) => {
          this.ls.hideLoading();
          Swal.fire({
            title: 'Success!',
            text: 'User updated successfully',
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
    this.ls.hideLoading();
  }

  onCheckboxChange(event: any) {
    if (event.target.checked) {
      console.log('Notification will be sent to the user.');
      this.sendNotification();
    }
  }
  sendNotification() {
    console.log('Sending notification to:', this.userForm.value.email);
    // Here, you can integrate an actual email or notification API.
  }
  onClientChange(event: Event) {
    const selectElement = (event.target as HTMLSelectElement);
    const selectedText = selectElement.options[selectElement.selectedIndex].text;
    const selectedValue = selectElement.value
    if (selectedValue) {
      const generatedUserId = this.generateUserId(selectedText);
      const generatedPassword = this.generatePassword();
      this.userForm.patchValue({ userName: generatedUserId });
      this.userForm.patchValue({ password: generatedPassword });
    }
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

}
