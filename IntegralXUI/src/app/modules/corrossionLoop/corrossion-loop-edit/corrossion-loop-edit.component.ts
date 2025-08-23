import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/common/loadingPanel/loading.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CorrossionLoopService } from 'src/app/services/corrossionLoop/corrossion-loop.service'; 
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-corrossion-loop-edit',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './corrossion-loop-edit.component.html',
  styleUrl: './corrossion-loop-edit.component.scss'
})
export class CorrossionLoopEditComponent {

   documentsToDelete: number[] = [];
  canDelete: boolean = false;
   canEdit: boolean = false;
   receivedData: any;
  clForm!: FormGroup;
  
  dataLoaded = false;
    childValue: number = 0;
  documentPreviews: File[] = [];
  plants: any[] = [];
  areas: any[] = [];
  units: any[] = [];
  systems: any[] = [];
  circuits: any[] = [];
 documents: any[] = [];
   expand = true
  showGeneral: boolean = this.expand;
  showDocument: boolean = this.expand;

  constructor(private clService: CorrossionLoopService, private fb: FormBuilder, private au: AuthService, private router: Router, private sharedDataService: SharedDataService,private ls: LoadingService) {
   this.canDelete = (this.au.getCanDelete());
    this.canEdit = (this.au.getCanEdit());
    this.receivedData = this.sharedDataService.getData();
    this.childValue = this.receivedData.id;
      this.clForm = this.fb.group({
      id: [0],
      name: [null, Validators.required],
      description: [null, Validators.required],
      plantID: [null, Validators.required],
      areaID: [0],
      unitID: [0],
      systemID: [0],
      rBICircuitId: [''],
      corrosionLoopDrawing: [''],
      corrosionLoopFrom: [''],
      corrosionLoopTo: [''],
      // Audit
      createdBy: [this.au.getUserId()],
      createdDate: [null],
      lastModifiedBy: [this.au.getUserId()],
      lastModifiedDate: [null],
      isDeleted: [false],
      isActive: [true],

      // Custom fields
      clientId: [this.au.getClientId()],
    });
   
  }

 async ngOnInit() {
   this.ls.showLoading();
 await this.loadCLDetails();
  
    this.ls.hideLoading();

   
   await this.clForm.get('plantID')?.valueChanges.subscribe((plantID) => {
      this.clForm.get('name')?.updateValueAndValidity();
      if (plantID) {
        this.loadAreasByPlant(plantID);
        this.loadUnits(plantID, 0);
        this.loadSystems(plantID, 0, 0);
        //this.loadCircuits(plantID, 0, 0, 0);

      } else {
        this.areas = [];
        this.units = [];
        this.systems = [];
        this.circuits = []; // Reset area list if no plant is selected
      }
      });
       this.clForm.get('areaID')?.valueChanges.subscribe((areaID) => {

      this.clForm.get('name')?.updateValueAndValidity();
      if (areaID) {

        this.loadUnits(this.clForm.get('plantID').value, areaID);
        this.loadSystems(this.clForm.get('plantID').value, areaID, 0);
       // this.loadCircuits(this.clForm.get('plantID').value, areaID, 0, 0);

      } else {

        this.units = [];
        this.systems = [];
        this.circuits = []; // Reset area list if no plant is selected
      }
    });
    this.clForm.get('unitID')?.valueChanges.subscribe((unitID) => {

      this.clForm.get('name')?.updateValueAndValidity();
      if (unitID) {

        this.loadSystems(this.clForm.get('plantID').value, this.clForm.get('areaID').value, unitID);
       // this.loadCircuits(this.clForm.get('plantID').value, this.clForm.get('areaID').value, unitID, 0);

      } else {

        this.systems = []; // Reset area list if no plant is selected
        this.circuits = [];
      }
    });
    // this.clForm.get('systemID')?.valueChanges.subscribe((systemId) => {

    //   this.clForm.get('name')?.updateValueAndValidity();
    //   if (systemId) {

    //     this.loadCircuits(this.clForm.get('plantID').value, this.clForm.get('areaID').value, this.clForm.get('unitID').value, systemId);

    //   } else {

    //     this.circuits = []; // Reset area list if no plant is selected
    //   }
    // });
  this.clForm.get('plantID')?.valueChanges.subscribe(() => {
      this.clForm.get('name')?.updateValueAndValidity();
    });
    this.clForm.get('areaID')?.valueChanges.subscribe(() => {
      this.clForm.get('name')?.updateValueAndValidity();
    });
    this.clForm.get('unitID')?.valueChanges.subscribe(() => {
      this.clForm.get('name')?.updateValueAndValidity();
    });
    this.clForm.get('unitID')?.valueChanges.subscribe(() => {
      this.clForm.get('name')?.updateValueAndValidity();
    });
    this.clForm.get('systemId')?.valueChanges.subscribe(() => {
      this.clForm.get('name')?.updateValueAndValidity();
    });
    // this.clForm.get('circuitId')?.valueChanges.subscribe(() => {
    //   this.clForm.get('name')?.updateValueAndValidity();
    // });

 
  }
saveCL() {
 if (this.clForm.invalid) {
      return;
    }
   const formData = new FormData();
    Object.keys(this.clForm.value).forEach(key => {
      const value = this.clForm.value[key];

      // Only append values that are not empty strings or "null"
      if (value !== "" && value !== "null" && value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });
    formData.append('deletedFiles', JSON.stringify(this.documentsToDelete).toString());


    this.documentPreviews.forEach(file => {
      formData.append('documents', file);
    });

    this.clService.addCL(formData).subscribe(
      (response) => {


        Swal.fire({
          title: 'Success!',
          text: 'Equipment added successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.backToCL();
      }
    );
}

  deleteFile(index: number) {
    this.documentPreviews.splice(index, 1);
    this.documentPreviews = [...this.documentPreviews]; // Ensure change detection

    const fileInput = document.getElementById('documents') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = 'Upload files';
    }
  }

  downloadFile(file: File) {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

 backToCL() {
    this.router.navigate(['/clientcorrosionloop/list']);
  }
loadAreasByPlant(plantID: number) {

    this.clService.getArea(plantID).subscribe((data: any[]) => {
      this.areas = data;
    });
  }
  loadUnits(plantID: number, areaID: number) {

    this.clService.getUnits(plantID, areaID).subscribe((data: any[]) => {
      this.units = data;
    });
  }
  loadSystems(plantID: number, areaID: number, unitID: number) {

    this.clService.getSystems(plantID, areaID, unitID).subscribe((data: any[]) => {
      this.systems = data;
    });
  }

 
  expandAll() {
    this.setAll(true);
  }

  // Collapse all sections
  collapseAll() {
    this.setAll(false);
  }

  toggle(section: string) {
    this[section] = !this[section];
  }
   private setAll(state: boolean) {
    this.expand = state;
    this.showGeneral = state;
    this.showDocument = state;
   }

   
  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      for (let file of event.target.files) {
        this.documentPreviews.push(file);
      }
    }
    const fileInput = document.getElementById('documents') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = 'Upload files';
    }
  }


  async loadCLDetails() {
    this.clService.getCLDetails(this.childValue).subscribe((equipmentData: any) => {
      debugger;
   this.clService.getPlants().subscribe((data: any) => {
      this.plants = data;
    });
       this.loadAreasByPlant(equipmentData.plantID);
        this.loadUnits(equipmentData.plantID, 0);
        this.loadSystems(equipmentData.plantID, 0, 0);
  
      this.clForm.patchValue({
        id: equipmentData.id,
        name: equipmentData.name,
        description: equipmentData.description,
        plantID: equipmentData.plantID,
        areaID: equipmentData.areaID,
        unitID: equipmentData.unitID,
        systemID: equipmentData.systemID,
        rBICircuitId: equipmentData.rbiCircuitId,
        corrosionLoopDrawing: equipmentData.corrosionLoopDrawing,
        corrosionLoopFrom: equipmentData.corrosionLoopFrom,
        corrosionLoopTo: equipmentData.corrosionLoopTo,
      });
      this.documents = (equipmentData.docs);
       this.dataLoaded = true;
    });
  }

  DeleteCl() {
    Swal.fire({
      title: 'Are you sure?You want to delete this equipment!',
      text: 'All data associated with this circuit will be lost',
      icon: 'warning',
      width: '300px',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clService.deleteCL(this.childValue).subscribe(
          () => this.backToCL(),
          error =>
            Swal.fire('Delete failed:', error)
        );

      }
    });
  }

  downloadFileExisting(documentId: number, fileName: string) {
    this.clService.downloadDocument(documentId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
  deleteFileExisting(documentId: number) {
    this.documentsToDelete.push(documentId);
    this.documents = this.documents.filter(doc => doc.id !== documentId); // Remove from UI
  }
}
