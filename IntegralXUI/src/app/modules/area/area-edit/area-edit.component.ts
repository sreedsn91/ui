import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { AreaService } from 'src/app/services/area/area.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';
import { AreaDocs } from '../area';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/common/loadingPanel/loading.service';

@Component({
  selector: 'app-area-edit',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './area-edit.component.html',
  styleUrl: './area-edit.component.scss',
  providers: [DatePipe]
})
export class AreaEditComponent {
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
  areaForm: FormGroup;
  documents: AreaDocs[] = [];
  areaTypes: any[] = [];
  documentsToDelete: number[] = [];
  areaCategories: any[] = [];
  areaStatuses: any[] = [];
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
    private areaService: AreaService,
    private datePipe: DatePipe,
    private au: AuthService,
     private ls: LoadingService,
    private router: Router,
    private sharedDataService: SharedDataService) {
    this.canDelete = (this.au.getCanDelete());
    this.canEdit = (this.au.getCanEdit());
    this.receivedData = this.sharedDataService.getData();
    this.childValue = this.receivedData.id;
    this.areaForm = this.fb.group({
      id: [0],
      clientId: [this.au.getClientId()],
      name: ['', Validators.required, Validators.required, [this.areaNameValidator.bind(this)]],
      description: ['', Validators.required],
      plantId: ['', Validators.required],
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
  isFieldInvalid(field: string): boolean {
    return this.areaForm.get(field)?.invalid && (this.areaForm.get(field)?.touched || this.areaForm.get(field)?.dirty);
  }
  async ngOnInit() {
    this.ls.showLoading();
    await this.loadDropdowns();
    await this.loaddetails();
    this.ls.hideLoading();
  }
  loaddetails() {
    this.areaService.getAreaDetails(this.childValue).subscribe((areaData: any) => {
    
      this.areaForm.patchValue({
        id: areaData.id,
        name: areaData.name,
        plantId:areaData.plantId,
        description: areaData.description,
        location:  areaData.location || '',
        locationGpsCoordinates:  areaData.locationGpsCoordinates || '',
        facilityName:  areaData.facilityName || '',
        ownerOrOperator:  areaData.ownerOrOperator || '',
        commissioningDate:  areaData.commissioningDate ? new Date( areaData.commissioningDate).toLocaleDateString('en-CA') : null,
        builtDate:  areaData.builtDate ? new Date( areaData.builtDate).toLocaleDateString('en-CA') : null,
        statusId:  areaData.statusId || '',
        typeId:  areaData.typeId || '',
        categoryId:  areaData.categoryId || '',
        designLife:  areaData.designLife || null,
        primaryProducts:  areaData.primaryProducts || '',
        capacity:  areaData.capacity || null,
        marginPerDay:  areaData.marginPerDay || null,
        numberOfProcessingUnits:  areaData.numberOfProcessingUnits || null,
        operatingTemperatureRange:  areaData.operatingTemperatureRange || null,
        operatingPressureRange:  areaData.operatingPressureRange || null,
        corrosiveEnvironments:  areaData.corrosiveEnvironments || '',
        humidityLevel:  areaData.humidityLevel || '',
        seismicZoneClassification:  areaData.seismicZoneClassification || '',
        weatherConditions:  areaData.weatherConditions || '',
        totalPopulation:  areaData.totalPopulation || null,
        populationDensity:  areaData.populationDensity || null,
        governingRegulatoryBody:  areaData.governingRegulatoryBody || '',
        safetyEnvironmentalPermits:  areaData.safetyEnvironmentalPermits || '',
        complianceCertifications:  areaData.complianceCertifications || '',
        incidentHistory:  areaData.incidentHistory || '',
        shutdownTurnaroundFrequency:  areaData.shutdownTurnaroundFrequency || null,
        lastMajorOverhaulDate:  areaData.lastMajorOverhaulDate ? new Date( areaData.lastMajorOverhaulDate).toLocaleDateString('en-CA') : null,
        nextMajorOverhaulDate:  areaData.nextMajorOverhaulDate ? new Date( areaData.nextMajorOverhaulDate).toLocaleDateString('en-CA') : null,
        designCodesStandardId:  areaData.designCodesStandardId || null,
        processTypeId:  areaData.processTypeId || null,
        primaryFeedstockId:  areaData.primaryFeedstockId || null,
        currentMaintenanceStrategyId:  areaData.currentMaintenanceStrategyId || null,
        fireExplosionRiskId:  areaData.fireExplosionRiskId || null,
        hazardClassificationId:  areaData.hazardClassificationId || null,
        reliabilityMetricsId:  areaData.reliabilityMetricsId || null,
        modelAvailabilityId:  areaData.modelAvailabilityId || null,
        sapLinkedEquipmentDataId:  areaData.sapLinkedEquipmentDataId || null,
        historicalRecordsAvailabilityId:  areaData.historicalRecordsAvailabilityId || null,
        documents:  areaData.docs || null, // Handling documents separately
        modifiedBy: this.au.getUserId(),
        userId: this.au.getUserId(),
        eRPorCMMSPlantCode: areaData.erPorCMMSPlantCode || '',
        eRPorCMMSSystem :areaData.erPorCMMSSystem || '',
        functionalLocation: areaData.functionalLocation || '',
        externalSystemID : areaData.externalSystemID || '',
        syncStatus : areaData.syncStatus || '',
        addedOnDate: areaData.addedOnDate ? new Date(areaData.addedOnDate).toLocaleDateString('en-CA') : null,
        modifiedOnDate: areaData.modifiedOnDate ? new Date(areaData.modifiedOnDate).toLocaleDateString('en-CA') : null,
        addedByName : areaData.addedByName || '',
        modifiedByName: areaData.modifiedByName || '',
      });
      this.documents = (areaData.docs);
    });
  }
  formatDate(dateString: string): string | null {
    return this.datePipe.transform(dateString, 'dd-MM-yyyy');
  }
  markForDeletion(documentId: number) {
    this.documentsToDelete.push(documentId);
    this.documents = this.documents.filter(doc => doc.id !== documentId); // Remove from UI
  }

  downloadDocument(documentId: number, fileName: string) {
    this.areaService.downloadDocument(documentId).subscribe(blob => {
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
    this.areaService.getAreaTypes().subscribe((data: any) => {
      this.areaTypes = data;
    });
  
    this.areaService.getAreaCategories().subscribe((data: any) => {
      this.areaCategories = data;
    });
    this.areaService.getAreaStatuses().subscribe((data: any) => {
      this.areaStatuses = data;
    });
    this.areaService.getAreaPlants().subscribe((data: any) => {
      this.plants = data;
    });
    
    this. areaService.getPlantdesignCodesStandards().subscribe((data: any) => {
      this.designCodesStandards = data;
    });
    this. areaService.getPlantprocessTypes().subscribe((data: any) => {
      this.processTypes = data;
    });
    this. areaService.getPlantprimaryFeedstocks().subscribe((data: any) => {
      this.primaryFeedstocks = data;
    });
    this. areaService.getPlantmaintenanceStrategies().subscribe((data: any) => {
      this.maintenanceStrategies = data;
    });
    this. areaService.getPlantfireExplosionRisks().subscribe((data: any) => {
      this.fireExplosionRisks = data;
    });
    this. areaService.getPlanthazardClassifications().subscribe((data: any) => {
      this.hazardClassifications = data;
    });
    this. areaService.getPlantreliabilityMetrics().subscribe((data: any) => {
      this.reliabilityMetrics = data;
    });
    this. areaService.getPlantmodelAvailabilities().subscribe((data: any) => {
      this.modelAvailabilities = data;
    });

    this. areaService.getPlantsapLinkedEquipmentData().subscribe((data: any) => {
      this.sapLinkedEquipmentData = data;
    });
    this. areaService.getPlanthistoricalRecordsAvailability().subscribe((data: any) => {
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
  areaNameValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    const name = control.value;
    const clientId = this.areaForm.get('areaId')?.value;
    const plantId = this.areaForm.get('plantId')?.value;
    if (!name) {
      return new Observable<null>();
    }
    return this.areaService.checkAreaExists(0,plantId, name).pipe(
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
  saveArea() {
    if (this.areaForm.invalid) {
      return;
    }
    const formData = new FormData();
    Object.keys(this.areaForm.value).forEach(key => {
      const value = this.areaForm.value[key];

      // Only append values that are not empty strings or "null"
      if (value !== "" && value !== "null" && value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });
   
    formData.append('deletedFiles', JSON.stringify(this.documentsToDelete));

    this.documentPreviews.forEach(file => {
      formData.append('documents', file);
    });

    this.areaService.addArea(formData).subscribe(
      (response) => {


        Swal.fire({
          title: 'Success!',
          text: 'Area details updated successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.backToArea();
      }
    );
  }

  downloadFileExisting(documentId: number, fileName: string) {
    this.areaService.downloadDocument(documentId).subscribe(blob => {
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
  DeleteArea() {
     Swal.fire({
       title: 'Are you sure?You want to delete this Area!',
       text: 'All data associated with this area will be lost',
       icon: 'warning',
       width: '300px',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes, Delete it!'
     }).then((result) => {
       if (result.isConfirmed) {
         this.areaService.deleteArea(this.childValue).subscribe(
           () => this.backToArea(),
           error =>
             Swal.fire('Delete failed:', error)
         );
 
       }
     });
   }
  backToArea() {
    this.router.navigate(['/clientarea/list']);
  }

}
