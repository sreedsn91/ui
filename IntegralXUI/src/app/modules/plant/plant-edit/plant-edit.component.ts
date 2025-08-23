import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { lastValueFrom, map, Observable } from 'rxjs';
import { PlantService } from 'src/app/services/plant/plant.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';
import { PlantDocs } from '../plant';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/common/loadingPanel/loading.service';

@Component({
  selector: 'app-plant-edit',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './plant-edit.component.html',
  styleUrl: './plant-edit.component.scss',
  providers: [DatePipe]
})
export class PlantEditComponent {
   showGeneral = true;
  showDesign = false;
  showMaintenance = false;
  showIntegration = false;
  showEnvironment = false;
  showRegulatory = false;
  showDocuments = false;
  showAudit = false;
  expand = false;
  receivedData: any;
  clientData: any;
  childValue: number = 0;
  plantForm: FormGroup;
  documents: PlantDocs[] = [];
  plantTypes: any[] = [];
  documentsToDelete: number[] = [];
  plantCategories: any[] = [];
  plantStatuses: any[] = [];
  canEdit: boolean = false;
  canDelete: boolean = false;
  documentPreviews: File[] = [];
  existingDocuments: any[] = [];
  uploadedDocuments: File[] = [];
  selectedFiles: File[] = [];
  
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
    private plantService: PlantService,
    private datePipe: DatePipe,
    private au: AuthService,
    private router: Router,
    private ls: LoadingService,
    private sharedDataService: SharedDataService) {
    this.canDelete = (this.au.getCanDelete());
    this.canEdit = (this.au.getCanEdit());
    this.receivedData = this.sharedDataService.getData();
    debugger;
    this.childValue = this.receivedData.id;
     this.plantForm = this.fb.group({
      plantId: [0],
      id: [0],
      clientId: [this.au.getClientId()],
      name: ['' , Validators.required,[this.plantNameValidator.bind(this)]],
      description: ['' ,Validators.required],
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
      addedOn: [null],
      modifiedBy:[this.au.getUserId()],
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
    return this.plantForm.get(field)?.invalid && (this.plantForm.get(field)?.touched || this.plantForm.get(field)?.dirty);
  }

  async ngOnInit() {
    this.ls.showLoading();
    await this.loadDropdowns();
    await this.loaddetails();
    this.ls.hideLoading();
  }
  loaddetails() {
    this.plantService.getPlantDetails(this.childValue).subscribe((plantData: any) => {
      debugger;
      this.plantForm.patchValue({
        plantId: plantData.id || 0,
        id: plantData.id || 0,
        clientId: this.au.getClientId(),
        name: plantData.name || '',
        description: plantData.description || '',
        location: plantData.location || '',
        locationGpsCoordinates: plantData.locationGpsCoordinates || '',
        facilityName: plantData.facilityName || '',
        ownerOrOperator: plantData.ownerOrOperator || '',
        commissioningDate: plantData.commissioningDate ? new Date(plantData.commissioningDate).toLocaleDateString('en-CA') : null,
        builtDate: plantData.builtDate ? new Date(plantData.builtDate).toLocaleDateString('en-CA') : null,
        statusId: plantData.statusId || '',
        typeId: plantData.typeId || '',
        categoryId: plantData.categoryId || '',
        designLife: plantData.designLife || null,
        primaryProducts: plantData.primaryProducts || '',
        capacity: plantData.capacity || null,
        marginPerDay: plantData.marginPerDay || null,
        numberOfProcessingUnits: plantData.numberOfProcessingUnits || null,
        operatingTemperatureRange: plantData.operatingTemperatureRange || null,
        operatingPressureRange: plantData.operatingPressureRange || null,
        corrosiveEnvironments: plantData.corrosiveEnvironments || '',
        humidityLevel: plantData.humidityLevel || '',
        seismicZoneClassification: plantData.seismicZoneClassification || '',
        weatherConditions: plantData.weatherConditions || '',
        totalPopulation: plantData.totalPopulation || null,
        populationDensity: plantData.populationDensity || null,
        governingRegulatoryBody: plantData.governingRegulatoryBody || '',
        safetyEnvironmentalPermits: plantData.safetyEnvironmentalPermits || '',
        complianceCertifications: plantData.complianceCertifications || '',
        incidentHistory: plantData.incidentHistory || '',
        shutdownTurnaroundFrequency: plantData.shutdownTurnaroundFrequency || null,
        lastMajorOverhaulDate: plantData.lastMajorOverhaulDate ? new Date(plantData.lastMajorOverhaulDate).toLocaleDateString('en-CA') : null,
        nextMajorOverhaulDate: plantData.nextMajorOverhaulDate ? new Date(plantData.nextMajorOverhaulDate).toLocaleDateString('en-CA') : null,
        designCodesStandardId: plantData.designCodesStandardId || null,
        processTypeId: plantData.processTypeId || null,
        primaryFeedstockId: plantData.primaryFeedstockId || null,
        currentMaintenanceStrategyId: plantData.currentMaintenanceStrategyId || null,
        fireExplosionRiskId: plantData.fireExplosionRiskId || null,
        hazardClassificationId: plantData.hazardClassificationId || null,
        reliabilityMetricsId: plantData.reliabilityMetricsId || null,
        modelAvailabilityId: plantData.modelAvailabilityId || null,
        sapLinkedEquipmentDataId: plantData.sapLinkedEquipmentDataId || null,
        historicalRecordsAvailabilityId: plantData.historicalRecordsAvailabilityId || null,
        documents: plantData.docs || null, // Handling documents separately
        modifiedBy: this.au.getUserId(),
        userId: this.au.getUserId(),
        eRPorCMMSPlantCode: plantData.erPorCMMSPlantCode || '',
        eRPorCMMSSystem :plantData.erPorCMMSSystem || '',
        functionalLocation: plantData.functionalLocation || '',
        externalSystemID : plantData.externalSystemID || '',
        syncStatus : plantData.syncStatus || '',
        addedOnDate: plantData.addedOnDate ? new Date(plantData.addedOnDate).toLocaleDateString('en-CA') : null,
        modifiedOnDate: plantData.modifiedOnDate ? new Date(plantData.modifiedOnDate).toLocaleDateString('en-CA') : null,
        addedByName : plantData.addedByName || '',
        modifiedByName: plantData.modifiedByName || '',
      });
  
      this.documents = plantData.docs || [];
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
    this.plantService.downloadDocument(documentId).subscribe(blob => {
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
  async loadDropdowns() {
    try {
      this.plantTypes = await lastValueFrom(this.plantService.getPlantTypes()) as any[];
      this.plantCategories = await lastValueFrom(this.plantService.getPlantCategories()) as any[];
      this.plantStatuses = await lastValueFrom(this.plantService.getPlantStatuses()) as any[];
      this.designCodesStandards = await lastValueFrom(this.plantService.getPlantdesignCodesStandards()) as any[];
      this.processTypes = await lastValueFrom(this.plantService.getPlantprocessTypes()) as any[];
      this.primaryFeedstocks = await lastValueFrom(this.plantService.getPlantprimaryFeedstocks()) as any[];
      this.maintenanceStrategies = await lastValueFrom(this.plantService.getPlantmaintenanceStrategies()) as any[];
      this.fireExplosionRisks = await lastValueFrom(this.plantService.getPlantfireExplosionRisks()) as any[];
      this.hazardClassifications = await lastValueFrom(this.plantService.getPlanthazardClassifications()) as any[];
      this.reliabilityMetrics = await lastValueFrom(this.plantService.getPlantreliabilityMetrics()) as any[];
      this.modelAvailabilities = await lastValueFrom(this.plantService.getPlantmodelAvailabilities()) as any[];
      this.sapLinkedEquipmentData = await lastValueFrom(this.plantService.getPlantsapLinkedEquipmentData()) as any[];
      this.historicalRecordsAvailability = await lastValueFrom(this.plantService.getPlanthistoricalRecordsAvailability()) as any[];
    } catch (error) {
      console.error('Error loading dropdown data:', error);
    }
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
  plantNameValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    const name = control.value;
    const clientId = this.plantForm.get('plantId')?.value;
    if (!name) {
      return new Observable<null>();
    }
    return this.plantService.checkPlantExists(0, name).pipe(
      map((data: any) => {
        
        if (data) {
          return { userNameExists: true };
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
  savePlant() {
    if (this.plantForm.invalid) {
      return;
    }
    this.ls.showLoading();
    const formData = new FormData();
    Object.keys(this.plantForm.value).forEach(key => {
      const value = this.plantForm.value[key];

      // Only append values that are not empty strings or "null"
      if (value !== "" && value !== "null" && value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });
    
    formData.append('deletedFiles', JSON.stringify(this.documentsToDelete));

    this.documentPreviews.forEach(file => {
      formData.append('documents', file);
    });

    this.plantService.addPlant(formData).subscribe(
      (response) => {
        this.ls.hideLoading();

        Swal.fire({
          title: 'Success!',
          text: 'Plant details updated successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.backToPlant();
        this.ls.hideLoading();
      }
    );
  }

  downloadFileExisting(documentId: number, fileName: string) {
    this.plantService.downloadDocument(documentId).subscribe(blob => {
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
  DeletePlant() {
      Swal.fire({
        title: 'Are you sure?You want to delete this Plant!',
        text: 'All data associated with this plant will be lost',
        icon: 'warning',
        width: '300px',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.plantService.deletePlant(this.childValue).subscribe(
            () => this.backToPlant(),
            error =>
              Swal.fire('Delete failed:', error)
          );
  
        }
      });
    }
  backToPlant() {
    this.router.navigate(['/clientplant/list']);
  }

}
