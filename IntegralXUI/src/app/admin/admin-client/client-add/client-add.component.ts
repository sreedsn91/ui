
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientService } from 'src/app/services/client/client.service';
import { Client } from '../client';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { map, Observable } from 'rxjs';
import { LoadingService } from 'src/app/common/loadingPanel/loading.service';
@Component({
  selector: 'app-client-add',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './client-add.component.html',
  styleUrl: './client-add.component.scss'
})
export class ClientAddComponent {
  @Input() childValue: number = 0;
  @Output() updateGrid: EventEmitter<string> = new EventEmitter();
  clientForm: FormGroup;
  logoFile!: File;
  logoPreview: string | null = null;
  uploadedDocuments: File[] = [];
  selectedFiles: File[] = [];
  modules:any[];


  constructor(private fb: FormBuilder , private apiService:ClientService, private router:Router, private ls:LoadingService) { }



  ngOnInit(): void {
    // Initialize form with validation
    this.clientForm = this.fb.group({
      id:[0],
      name: ['', [Validators.required, Validators.maxLength(100)],[this.nameValidator.bind(this)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)],[this.emailValidator.bind(this)]],
      website: ['', [Validators.required, Validators.maxLength(255)]],
      totalUsers: ['', [Validators.required, Validators.min(1)]],
      purchaseDate: ['', Validators.required],
      expiryDate: [''],
      details: [''],
      selectedModules: [[]],
      
      documents: [[]]
    });
    this. loadModules();
  }

  loadModules() {
   
    this.apiService.getModules().subscribe((data: any) => {
      this.modules = data;
    });
  }
  onModuleChange(event: any, moduleId: number) {
    const selectedModules = this.clientForm.get('selectedModules')?.value || [];
    if (event.target.checked) {
      selectedModules.push({ 
        id: moduleId, 
        name: '', 
        selected: true 
      } );
    } else {
      const index = selectedModules.indexOf(moduleId);
      if (index > -1) {
        selectedModules.splice(index, 1);
      }
    }
    
    this.clientForm.patchValue({ selectedModules });
  }
  onFileSelect(event: any, fileType: string) {
    const files = event.target.files;

    if (fileType === 'logo' && files.length > 0) {
      this.logoFile = files[0];
      const reader = new FileReader();
      reader.onload = () => this.logoPreview = reader.result as string;
      reader.readAsDataURL(this.logoFile);
      this.clientForm.patchValue({ logo: files });
    }

    if (fileType === 'documents' && files.length > 0) {
      this.uploadedDocuments = [...this.uploadedDocuments, ...files];
      this.selectedFiles.push(files);
      this.clientForm.patchValue({ documents: this.selectedFiles });
    }
  }
  
   onSubmit(): void {
      if (this.clientForm.valid) {
        this.ls.showLoading();

        if(this.clientForm.value.details== null){this.clientForm.value.details=' ';}
       
        let formData = new FormData();
        // Append form values
        Object.keys(this.clientForm.value).forEach(key => {
          formData.append(key, this.clientForm.value[key]);
        });
  
        // Append selected modules JSON
        const selectedModules = JSON.stringify(this.clientForm.value.selectedModules);
        formData.append('selectedModulesJson', selectedModules);
  
        // Append logo
        if (this.logoFile) {
          formData.append('logo', this.logoFile);
        }
  
        console.log()
        // Append documents
        this.selectedFiles.forEach(item => {
          Object.keys(item).forEach(key => {
            const file = item[key]; // Get the file object
            formData.append('documents', file); // Append to FormData
          });
        });
  
        
  
        this.apiService.addClient(formData).subscribe(
          (response) => {
           this.ls.hideLoading();
        
          Swal.fire({
              title: 'Success!',
              text:  'Client added successfully',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
            this.backToClient();
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

  backToClient()
  {
    this.router.navigate(['/clients']);
  }
 emailValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    
    // Skip validation if email is empty
    if (!email) {
      return new Observable<null>();
    }
  
    // Return the observable directly without subscribing
    return this.apiService.checkClientEmailExists(0, email).pipe(
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

  nameValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    const name = control.value;
    
    // Skip validation if email is empty
    if (!name) {
      return new Observable<null>();
    }
  
    // Return the observable directly without subscribing
    return this.apiService.checkClientNameExists( 0,name).pipe(
      map((data: any) => {
      
        if (data) {
          // If email exists, return the error
          return { nameExists: true };
        }
        // If email does not exist, validation passes
        return null;
      })
    );
  }

}
