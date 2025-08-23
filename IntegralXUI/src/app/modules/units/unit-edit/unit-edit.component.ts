import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { UnitService } from 'src/app/services/unit/unit.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';
import { UnitDocs } from '../units';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/common/loadingPanel/loading.service';

@Component({
  selector: 'app-unit-edit',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './unit-edit.component.html',
  styleUrl: './unit-edit.component.scss',
  providers: [DatePipe]
})
export class UnitEditComponent {
  showGeneral = true;
  showDesign = false;
  showMaintenance = false;
  showIntegration = false;
  showEnvironment = false;
  showRegulatory = false;
  showDocuments = false;
  showAudit = false
  expand = false;
  receivedData: any;
  clientData: any;
  childValue: number = 0;
  plants: any[] = [];
  unitForm: FormGroup;
  documents: UnitDocs[] = [];
  unitTypes: any[] = [];
  documentsToDelete: number[] = [];
  unitCategories: any[] = [];
  unitStatuses: any[] = [];
  canEdit: boolean = false;
  canDelete: boolean = false;
  documentPreviews: File[] = [];
  existingDocuments: any[] = [];
  uploadedDocuments: File[] = [];
  selectedFiles: File[] = [];
  areas: any[] = [];
   
  designCodesStandards: any[] = [];
  processTypes: any[] = [];
  primaryFeedstocks: any[] = [];
  maintenanceStrategies: any[] = [];
  fireExplosionRisks: any[] = [];
  hazardClassifications: any[] = [];
  reliabilityMetrics: any[] = [];
  modelAvailabilities: any[] = [];
  sapLinkedEquipmentData: any[] = [];
  historicalRecordsAvailability: any[] = [];

  constructor(private fb: FormBuilder,
    private unitService: UnitService,
    private datePipe: DatePipe,
    private au: AuthService,
     private ls: LoadingService,
    private router: Router,
    private sharedDataService: SharedDataService) {
    this.canDelete = (this.au.getCanDelete());
    this.canEdit = (this.au.getCanEdit());
    this.receivedData = this.sharedDataService.getData();
    this.childValue = this.receivedData.id;
    this.unitForm = this.fb.group({
      id: [0],
      clientId: [this.au.getClientId()],
      name: ['', Validators.required, Validators.required, [this.unitNameValidator.bind(this)]],
      description: ['', Validators.required],
      plantId: ['', Validators.required],
      areaId: ['', Validators.required],
      location: ['' ],
      locationGpsCoordinates: [''],
      facilityName: [''],
      ownerOrOperator: [''],
      commissioningDate: [null ],
      builtDate: [null ],
      statusId: ['' ],
      typeId: ['' ],
      categoryId: ['' ],
      designLife: [null, Validators.min(0)],
      primaryProducts: [''],
      capacity: [null, [  Validators.min(0)]],
      marginPerDay: [null, [  Validators.min(0)]],
      numberOfProcessingUnits: [null, Validators.min(0)],
      operatingTemperatureRange: [null, Validators.min(0)],
      operatingPressureRange: [null, Validators.min(0)],
      corrosiveEnvironments: [''],
      humidityLevel: [''],
      seismicZoneClassification: [''],
      weatherConditions: [''],
      totalPopulation: [null, [  Validators.min(0)]],
      populationDensity: [null, [  Validators.min(0)]],
      governingRegulatoryBody: [''],
      safetyEnvironmentalPermits: [''],
      complianceCertifications: [''],
      incidentHistory: [''],
      shutdownTurnaroundFrequency: [null, Validators.min(0)],
      lastMajorOverhaulDate: [null],
      nextMajorOverhaulDate: [null],
      addedBy: [this.au.getUserId()],
      addedOn: [new Date()],
      modifiedBy: [null],
      modifiedOn: [null],
      isDeleted: [false],
      isActive: [true],
      designCodesStandardId: [null],
      processTypeId: [null],
      primaryFeedstockId: [null],
      currentMaintenanceStrategyId: [null],
      fireExplosionRiskId: [null],
      hazardClassificationId: [null],
      reliabilityMetricsId: [null],
      modelAvailabilityId: [null],
      sapLinkedEquipmentDataId: [null],
      historicalRecordsAvailabilityId: [null],
      documents: [null], // File input handling separately
      deletedFiles: [''],
      userId: [this.au.getUserId()],
      eRPorCMMSPlantCode: [''],
      eRPorCMMSSystem : [''],
      functionalLocation: [''],
      externalSystemID : [''],
      syncStatus : [''],
      addedOnDate: [null],
      modifiedOnDate: [null],
      addedByName: [''],
      modifiedByName: ['']
    });
  }
  isFieldInvalid(field: string): boolean {
    return this.unitForm.get(field)?.invalid && (this.unitForm.get(field)?.touched || this.unitForm.get(field)?.dirty);
  }
  async ngOnInit() {
    this.ls.showLoading();
    await this.loadDropdowns();
    await this.loaddetails();
    this.unitForm.get('plantId')?.valueChanges.subscribe((plantId) => {
      
      this.unitForm.get('name')?.updateValueAndValidity(); 
      if (plantId) {
        this.loadAreasByPlant(plantId);
      } else {
        this.areas = []; // Reset area list if no plant is selected
      }
    });
    this.ls.hideLoading();
  }
  loadAreasByPlant(plantId: number) {
   
    this.unitService.getArea(plantId).subscribe((data: any[]) => {
      this.areas = data;
    });
  }
  loaddetails() {
    this.unitService.getUnitDetails(this.childValue).subscribe((unitData: any) => {
      
      this.unitForm.patchValue({
        id: unitData.id,
        name: unitData.name,
        plantId:unitData.plantId,
        areaId:unitData.areaId,
        description: unitData.description,
        location:  unitData.location || '',
        locationGpsCoordinates:  unitData.locationGpsCoordinates || '',
        facilityName:  unitData.facilityName || '',
        ownerOrOperator:  unitData.ownerOrOperator || '',
        commissioningDate:  unitData.commissioningDate ? new Date( unitData.commissioningDate).toLocaleDateString('en-CA') : null,
        builtDate:  unitData.builtDate ? new Date( unitData.builtDate).toLocaleDateString('en-CA') : null,
        statusId:  unitData.statusId || '',
        typeId:  unitData.typeId || '',
        categoryId:  unitData.categoryId || '',
        designLife:  unitData.designLife || null,
        primaryProducts:  unitData.primaryProducts || '',
        capacity:  unitData.capacity || null,
        marginPerDay:  unitData.marginPerDay || null,
        numberOfProcessingUnits:  unitData.numberOfProcessingUnits || null,
        operatingTemperatureRange:  unitData.operatingTemperatureRange || null,
        operatingPressureRange:  unitData.operatingPressureRange || null,
        corrosiveEnvironments:  unitData.corrosiveEnvironments || '',
        humidityLevel:  unitData.humidityLevel || '',
        seismicZoneClassification:  unitData.seismicZoneClassification || '',
        weatherConditions:  unitData.weatherConditions || '',
        totalPopulation:  unitData.totalPopulation || null,
        populationDensity:  unitData.populationDensity || null,
        governingRegulatoryBody:  unitData.governingRegulatoryBody || '',
        safetyEnvironmentalPermits:  unitData.safetyEnvironmentalPermits || '',
        complianceCertifications:  unitData.complianceCertifications || '',
        incidentHistory:  unitData.incidentHistory || '',
        shutdownTurnaroundFrequency:  unitData.shutdownTurnaroundFrequency || null,
        lastMajorOverhaulDate:  unitData.lastMajorOverhaulDate ? new Date( unitData.lastMajorOverhaulDate).toLocaleDateString('en-CA') : null,
        nextMajorOverhaulDate:  unitData.nextMajorOverhaulDate ? new Date( unitData.nextMajorOverhaulDate).toLocaleDateString('en-CA') : null,
        designCodesStandardId:  unitData.designCodesStandardId || null,
        processTypeId:  unitData.processTypeId || null,
        primaryFeedstockId:  unitData.primaryFeedstockId || null,
        currentMaintenanceStrategyId:  unitData.currentMaintenanceStrategyId || null,
        fireExplosionRiskId:  unitData.fireExplosionRiskId || null,
        hazardClassificationId:  unitData.hazardClassificationId || null,
        reliabilityMetricsId:  unitData.reliabilityMetricsId || null,
        modelAvailabilityId:  unitData.modelAvailabilityId || null,
        sapLinkedEquipmentDataId:  unitData.sapLinkedEquipmentDataId || null,
        historicalRecordsAvailabilityId:  unitData.historicalRecordsAvailabilityId || null,
        documents:  unitData.docs || null, // Handling documents separately
        modifiedBy: this.au.getUserId(),
        userId: this.au.getUserId(),
        eRPorCMMSPlantCode: unitData.erPorCMMSPlantCode || '',
        eRPorCMMSSystem :unitData.erPorCMMSSystem || '',
        functionalLocation: unitData.functionalLocation || '',
        externalSystemID : unitData.externalSystemID || '',
        syncStatus : unitData.syncStatus || '',
        addedOnDate: unitData.addedOnDate ? new Date(unitData.addedOnDate).toLocaleDateString('en-CA') : null,
        modifiedOnDate: unitData.modifiedOnDate ? new Date(unitData.modifiedOnDate).toLocaleDateString('en-CA') : null,
        addedByName : unitData.addedByName || '',
        modifiedByName: unitData.modifiedByName || '',
      });
      this.documents = (unitData.docs);
    });
  }
   toggle(section: string) {
      this[section] = !this[section];
    }
  expandAll() {
    this.setAll(true);
  }

  // Collapse all sections
  collapseAll() {
    this.setAll(false);
  }


  // Set all accordions to open (true) or close (false)
  private setAll(state: boolean) {
  this.expand = state;
  this.showGeneral = state;
  this.showDesign = state;
  this.showMaintenance = state;
  this.showIntegration = state;
  this.showEnvironment = state;
  this.showRegulatory = state;
  this.showDocuments = state;
   this.showAudit = state;
  }
  formatDate(dateString: string): string | null {
    return this.datePipe.transform(dateString, 'dd-MM-yyyy');
  }
  markForDeletion(documentId: number) {
    this.documentsToDelete.push(documentId);
    this.documents = this.documents.filter(doc => doc.id !== documentId); // Remove from UI
  }

  downloadDocument(documentId: number, fileName: string) {
    this.unitService.downloadDocument(documentId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
  loadDocs(docsList: any[]) {
    
    docsList.forEach(doc => {
      

      this.existingDocuments.push(this.fb.group({
        id: doc.id,
        name: doc.docName,
        url: doc.docLocation  // Assuming each document has a name and URL
      }));
    });
   
  }
  deleteFileExisting(documentId: number) {
    this.documentsToDelete.push(documentId);
    this.documents = this.documents.filter(doc => doc.id !== documentId); // Remove from UI
  }

  deleteFile(index: number) {
    this.documentPreviews.splice(index, 1);
    this.documentPreviews = [...this.documentPreviews]; // Ensure change detection

    const fileInput = document.getElementById('documents') as HTMLInputElement;
    if (fileInput && this.documentPreviews.length == 0) {
      fileInput.value = '';
    }
  }
  loadDropdowns() {
    // Load dropdown data from services
    this.unitService.getUnitTypes().subscribe((data: any) => {
      this.unitTypes = data;
    });
  
    this.unitService.getUnitCategories().subscribe((data: any) => {
      this.unitCategories = data;
    });
    this.unitService.getUnitStatuses().subscribe((data: any) => {
      this.unitStatuses = data;
    });
    this.unitService.getUnitPlants().subscribe((data: any) => {
      this.plants = data;
    });
    
    this. unitService.getPlantdesignCodesStandards().subscribe((data: any) => {
      this.designCodesStandards = data;
    });
    this. unitService.getPlantprocessTypes().subscribe((data: any) => {
      this.processTypes = data;
    });
    this. unitService.getPlantprimaryFeedstocks().subscribe((data: any) => {
      this.primaryFeedstocks = data;
    });
    this. unitService.getPlantmaintenanceStrategies().subscribe((data: any) => {
      this.maintenanceStrategies = data;
    });
    this. unitService.getPlantfireExplosionRisks().subscribe((data: any) => {
      this.fireExplosionRisks = data;
    });
    this. unitService.getPlanthazardClassifications().subscribe((data: any) => {
      this.hazardClassifications = data;
    });
    this. unitService.getPlantreliabilityMetrics().subscribe((data: any) => {
      this.reliabilityMetrics = data;
    });
    this. unitService.getPlantmodelAvailabilities().subscribe((data: any) => {
      this.modelAvailabilities = data;
    });

    this. unitService.getPlantsapLinkedEquipmentData().subscribe((data: any) => {
      this.sapLinkedEquipmentData = data;
    });
    this. unitService.getPlanthistoricalRecordsAvailability().subscribe((data: any) => {
      this.historicalRecordsAvailability = data;
    });
  }
  downloadFileWithURL(docUrl: string, fileName: string) {
    // const anchor = document.createElement('a');
    // anchor.href = docUrl;
    // anchor.download = fileName;
    // anchor.target = '_blank'; // Open in a new tab (optional)
    // anchor.click();
    fetch(docUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = fileName; // Ensures the file is downloaded
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        window.URL.revokeObjectURL(url); // Clean up
      })
      .catch(error => console.error('Error downloading file:', error));
  }
  unitNameValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    const name = control.value;
    const clientId = this.unitForm.get('unitId')?.value;
    const plantId = this.unitForm.get('plantId')?.value;
    if (!name) {
      return new Observable<null>();
    }
    return this.unitService.checkUnitExists(0,plantId, name).pipe(
      map((data: any) => {
        
        if (data) {
          return { nameExists: true };
        }
        return null;
      })
    );
  }

  onFileSelect(event: any) {
    const files = event.target.files;
    if (event.target.files.length > 0) {
      for (let file of event.target.files) {
        this.documentPreviews.push(file);
      }
    }

  }

  updateFileCount() {
    const fileCount = this.documentPreviews.length;
    const fileInput = document.getElementById('documents') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = fileCount + ' - files';
    }
  }


  // deleteFile(index: number) {
  //   this.documentPreviews.splice(index, 1);
  //   this.documentPreviews = [...this.documentPreviews]; // Ensure change detection

  //   const fileInput = document.getElementById('documents') as HTMLInputElement;
  //   if (fileInput) {
  //     fileInput.value = 'Upload files'; 
  // }
  // }
  saveUnit() {
    if (this.unitForm.invalid) {
      return;
    }
    const formData = new FormData();
    Object.keys(this.unitForm.value).forEach(key => {
      const value = this.unitForm.value[key];

      // Only append values that are not empty strings or "null"
      if (value !== "" && value !== "null" && value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });
    
    formData.append('deletedFiles', JSON.stringify(this.documentsToDelete));

    this.documentPreviews.forEach(file => {
      formData.append('documents', file);
    });

    this.unitService.addUnit(formData).subscribe(
      (response) => {


        Swal.fire({
          title: 'Success!',
          text: 'Unit details updated successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.backToUnit();
      }
    );
  }

  downloadFileExisting(documentId: number, fileName: string) {
    this.unitService.downloadDocument(documentId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    });
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
  DeleteUnit() {
     Swal.fire({
       title: 'Are you sure?You want to delete this Unit!',
       text: 'All data associated with this unit will be lost',
       icon: 'warning',
       width: '300px',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes, Delete it!'
     }).then((result) => {
       if (result.isConfirmed) {
         this.unitService.deleteUnit(this.childValue).subscribe(
           () => this.backToUnit(),
           error =>
             Swal.fire('Delete failed:', error)
         );
 
       }
     });
   }
  backToUnit() {
    this.router.navigate(['/clientunit/list']);
  }

}
