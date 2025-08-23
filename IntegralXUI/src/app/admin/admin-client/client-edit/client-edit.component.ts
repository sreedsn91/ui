
import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientService } from 'src/app/services/client/client.service';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ClientDocument } from '../client';
import { NgApexchartsModule } from "ng-apexcharts";
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-client-add',
  imports: [CommonModule, ReactiveFormsModule, NgbNavModule, NgApexchartsModule],
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.scss'
})
export class ClientEditComponent {
  @ViewChild('chart') chartElement!: ElementRef;
  clientForm: FormGroup;
  message: string = 'Client added successfully.';
  clientData: any;
  childValue: number = 0;
  modules: any[];
  selected: any[];
  expiryInfo: any;
  chartOptions: any;
  logoFile!: File;
  logoPreview: string | null = null;
  uploadedDocuments: File[] = [];
  selectedFiles: File[] = [];
  documents: ClientDocument[] = [];
  logodoc: ClientDocument;
  documentsToDelete: number[] = [];
  receivedData: any;

  constructor(private fb: FormBuilder, private apiService: ClientService, private router: Router, private sharedDataService: SharedDataService) {
    this.receivedData = this.sharedDataService.getData();
    this.clientData = this.receivedData;
    this.childValue = this.clientData.id;
  }

  ngOnInit(): void {
    // Initialize form with validation
    this.clientForm = this.fb.group({
      id: [0],
      name: ['', [Validators.required, Validators.maxLength(100)],[this.nameValidator.bind(this)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)],[this.emailValidator.bind(this)]],
      website: ['', [Validators.required, Validators.maxLength(255)]],
      totalUsers: ['', [Validators.required, Validators.min(1)]],
      purchaseDate: ['', Validators.required],
      expiryDate: [''],
      details: [''],
      selectedModules: [[]],
      logo: [null],
      documents: [[]]

    });
    this.loadModules();
    this.loadClientdetails();
    this.loadExpiryInfo();
  }
 emailValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    const email = control.value;
    if (!email) {
      return new Observable<null>();
    }
    return this.apiService.checkClientEmailExists(this.childValue, email).pipe(
      map((data: any) => {
        if (data) {
          return { emailExists: true };
        }
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
    return this.apiService.checkClientNameExists(this.childValue, name).pipe(
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

  loadExpiryInfo() {
    const expiryCategories = [0, 0, 0];
    this.apiService.getClientExpiryInfo().subscribe((data: any) => {
   
      this.expiryInfo = data;
      this.createChart();
    });
  }

  loadClientdetails() {
    this.apiService.getClientDetails(this.childValue).subscribe((data: any) => {
    
      this.clientForm.patchValue({
        id: data.id,
        name: data.name,
        email: data.email,
        website: data.website,
        totalUsers: data.totalUsers,
        purchaseDate: new Date(data.purchaseDate).toISOString().substring(0, 10),
        expiryDate: new Date(data.expiryDate).toISOString().substring(0, 10),
        details: data.details,
        selectedModules: data.selectedModules

      });

      this.modules.forEach(module => {
        module.selected = data.selectedModules.some(m => m.id === module.id && m.selected);
      });
      this.documents = data.docs.filter(d => d.typeId == 2);
      this.logodoc = data.docs.find(d => d.typeId == 1);
      this.logoPreview = this.logodoc.docLocation;

      const reader = new FileReader();
      reader.onload = () => this.logoPreview = reader.result as string;
      reader.readAsDataURL(this.logoFile);
    });
  }

  loadModules() {
    this.apiService.getModules().subscribe((data: any) => {
      this.modules = data;
    });
  }

  ///////////////////////////////////////////////

  onModuleChange(event: any, moduleId: number) {
    let selectedModules = this.clientForm.get('selectedModules')?.value || [];

    if (event.target.checked) {
      selectedModules.push({
        id: moduleId,
        name: '',
        selected: true
      });
    } else {
      selectedModules = selectedModules.filter((m: any) => m.id !== moduleId);
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

  onFileSelected(event: any, isLogo: boolean = false): void {
    const file = event.target.files[0];
    if (file) {
      if (isLogo) {
        this.clientForm.patchValue({ logo: file });
      } else {
        this.selectedFiles.push(file);
        this.clientForm.patchValue({ documents: this.selectedFiles });
      }
    }
  }

  markForDeletion(documentId: number) {
    this.documentsToDelete.push(documentId);
    this.documents = this.documents.filter(doc => doc.id !== documentId); // Remove from UI
  }

  downloadDocument(documentId: number, fileName: string) {
    this.apiService.downloadDocument(documentId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      if (this.clientForm.value.details == null) { this.clientForm.value.details = ' '; }

      let formData = new FormData();
      // Append form values
      Object.keys(this.clientForm.value).forEach(key => {
        formData.append(key, this.clientForm.value[key]);
      });

      // Append selected modules JSON
      const selectedModules = JSON.stringify(this.clientForm.value.selectedModules);
      formData.append('selectedModulesJson', selectedModules);

      formData.append('deletedFileIds', JSON.stringify(this.documentsToDelete));


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

          Swal.fire({
            title: 'Success!',
            text: 'Client updated successfully',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.backToClient();
        }
      );
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Invalid details, Please try again',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
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
        this.apiService.deleteItem(this.childValue).subscribe(
          () => this.backToClient(),
          error =>
            Swal.fire('Delete failed:', error)
        );
        this.apiService.deleteItem(this.childValue);
        this.router.navigate(["clients"]);
      }
    });
  }

  backToClient() {
    this.router.navigate(['/clients']);
  }



  ///////////////////////// chart summart section
  createChart() {
    const currentDate = new Date();
    let expiryCategories = [0, 0, 0, 0]; // [Within 3 months, 3-6 months, More than 6 months]

    this.expiryInfo.forEach(client => {
      const monthsDiff = client.expiryStatus;

      if (monthsDiff < 0) {
        expiryCategories[0]++; // Status 1
      } else if (monthsDiff <= 1) {
        expiryCategories[1]++; // Status 2
      }
      else if (monthsDiff <= 6) {
        expiryCategories[2]++; // Status 2
      }
      else {
        expiryCategories[3]++; // Status 3
      }
    });
    this.chartOptions = {
      series: expiryCategories,
      chart: {
        type: 'pie'
      },
      labels: ['Expired clients', 'Expiring in 1 month', 'Expiring in 1-6 months', 'Expiring after 6 months'],
      colors: ['#FF4560', '#FEB019', '#00E396', '#775DD0']
    };
  }



  refreshChart() {
    setTimeout(() => {
      if (this.chartElement) {
        ApexCharts.exec('chart', 'updateOptions', this.chartOptions, true, true);
      }
    }, 300);
  }
  navigateTouserAdd()
  {
    const myData = { name: 'ClientId', ClientId: this.childValue  };
   this.sharedDataService.setData(myData); 
   
    this.router.navigate(['/user/add']);
  }
}
