import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientService } from 'src/app/services/client/client.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';
import { LoadingService } from 'src/app/common/loadingPanel/loading.service';
@Component({
  selector: 'app-user-add',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.scss'
})
export class UserAddComponent {
  childValue: number = 0;
  clientval: number = 0;
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

  constructor(private clientService:ClientService, private fb: FormBuilder,private router: Router,private sharedDataService: SharedDataService,private ls:LoadingService ) {
    this.receivedData = this.sharedDataService.getData();
    this.childValue = this.receivedData.ClientId;
    if (typeof this.childValue === 'number' && !isNaN(this.childValue)) {
      this.clientval = this.childValue
      this.selectedClientId = this.clientval;
    } 
  }
   
  ngOnInit() {
    this.loadClientsDDL();
    this.userForm = this.fb.group({
      id:[0],
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email],[this.emailValidator.bind(this)]],
      role: [{ value: 'User admin', disabled: true }, Validators.required], 
      contactNumber: ['', Validators.required,[this.contactValidator.bind(this)]],
      userName: ['', Validators.required,[this.userNameValidator.bind(this)]],
      clientId: [this.clientval > 0 ? this.clientval : null, Validators.required,[this.userNameValidator.bind(this)]],
      password: ['', Validators.required],
      sendNotification: [false],
      active:[true],
      isAdmin:[true],
      isLocked:[true],
      isSuperAdmin:[false]
    });
    
    this.userForm.get('clientId')?.valueChanges.subscribe(() => {
      this.userForm.get('email')?.updateValueAndValidity();
      this.userForm.get('contactNumber')?.updateValueAndValidity();
      this.userForm.get('userName')?.updateValueAndValidity();
    });
  }
 

  loadClientsDDL() {
    this.clientService.getClientsDDL().subscribe((data: any) => {
      this.clients = data;
    });
  }
  onSubmit() {
    if (this.userForm.valid) {
      if (this.userId) {
       // this.userService.updateUser(this.userForm.value).subscribe(() => this.router.navigate(['/users']));
      } else {
       // this.userService.addUser(this.userForm.value).subscribe(() => this.router.navigate(['/users']));
      }
    }
  }
  clientValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    const clientId = this.userForm.get('clientId')?.value;
    this.childValue = this.receivedData.ClientId;
  
    if (!clientId) {
      return of(null);
    }
  
    if (typeof clientId === 'number' && !isNaN(clientId) && clientId !== this.childValue) {
      return of({ clientSelectExists: true });
    }
  
    return of(null);
  }
  
  emailValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    const clientId = this.userForm.get('clientId')?.value;
    if (!email) {
      return new Observable<null>();
    }
    return this.clientService.checkEmailExistsWithClient(clientId,0, email).pipe(
      map((data: any) => {
        
        if (data) {
          return { emailExists: true };
        }
        return null;
      })
    );
  }
  contactValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    const contact = control.value;
    const clientId = this.userForm.get('clientId')?.value;
    if (!contact) {
      return new Observable<null>();
    }
    return this.clientService.checkContactExistsWithClient(clientId,0, contact).pipe(
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
    const clientId = this.userForm.get('clientId')?.value;
    if (!username) {
      return new Observable<null>();
    }
    return this.clientService.checkuserIdExistsWithClient(clientId,0, username).pipe(
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
            text:  'User added successfully',
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
             text:  'Invalid details, Please try again',
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
  onModeChange(event: any) {
    if (event.target.checked) {
      this.userForm.patchValue({
        role: 'User admin',
        isLocked:true
      }); 
    }
    else{
      this.userForm.patchValue({
        role: 'Admin',
        isLocked:false
      }); 
    }
  }
  sendNotification() {
    console.log('Sending notification to:', this.userForm.value.email);
    // Here, you can integrate an actual email or notification API.
  }
  onClientChange(event: Event) {
    const selectElement = (event.target as HTMLSelectElement);
    const selectedText = selectElement.options[selectElement.selectedIndex].text;
    const selectedValue  = selectElement.value
   
    if (selectedValue) {
      this.clientval = Number(selectedValue);
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
  cancel() {
    throw new Error('Method not implemented.');
    }

    nofify($event: Event) {
      throw new Error('Method not implemented.');
      }
      backToUsers() {
        this.router.navigate(["user"]);
      }
      
      
}
