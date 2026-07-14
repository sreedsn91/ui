import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators,FormsModule } from '@angular/forms';
import { lastValueFrom, map, Observable } from 'rxjs';
import { PlantService,PlantHierarchyCount } from 'src/app/services/plant/plant.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';
import { PlantDocs } from '../plant';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/common/loadingPanel/loading.service';
import { PdfViewerComponent } from '../../pdf-viewer/pdf-viewer.component';
import { MarkerData,Marker } from 'src/app/services/models/marker.model';

interface DashboardCard {
  title: string;
  count: number;
  icon: string;
  color: string;
  bgColor: string;
    route: string;
}


@Component({
  selector: 'app-plant-edit',
  imports: [ReactiveFormsModule, CommonModule, PdfViewerComponent,FormsModule],
  templateUrl: './plant-edit.component.html',
  styleUrl: './plant-edit.component.scss',
  providers: [DatePipe]
})
export class PlantEditComponent {

pdfFile: File | null = null;
 
  // Track if a file has been uploaded
  isFileUploaded: boolean = false;
  
  // Store uploaded file name
  uploadedFileName: string = '';
    // PDF file path
  pdfPath = '';
  
  // Load existing markers from backend or localStorage
  existingMarkers: MarkerData | null = null;
  
  // Store current markers
  currentMarkers: MarkerData | null = null;
  successMessage: string;
  errorMessage: string;

  loadExistingMarkers() {
    // Example: Load from localStorage
    const saved = this.receivedrefdocmappings;
    if (saved) {
      this.existingMarkers = JSON.parse(saved);
    }
    
    // OR load from API
    // this.http.get<MarkerData>('/api/markers').subscribe(data => {
    //   this.existingMarkers = data;
    // });
  }

  onMarkersChanged(data: MarkerData) {
    console.log('Markers updated:', data);
    this.currentMarkers = data;
    
    // Auto-save to localStorage
    localStorage.setItem('pdfMarkers', JSON.stringify(data));
  }
onFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    if (file && file.type === 'application/pdf') {
      // Create a URL for the uploaded file
      const fileUrl = URL.createObjectURL(file);
      
      // Update the PDF path
      this.pdfPath = fileUrl;
      this.isFileUploaded = true;
      this.uploadedFileName = file.name;
      this.pdfFile = file;

      // Clear markers when new file is uploaded
      this.existingMarkers = null;
      this.currentMarkers = null;
      
      console.log('New PDF uploaded:', file.name);
    } else {
      alert('Please select a valid PDF file');
    }
  }


  downloadMarkers() {
    if (this.currentMarkers) {
      const blob = new Blob([JSON.stringify(this.currentMarkers, null, 2)], 
        { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `markers-${Date.now()}.json`;
      a.click();
      window.URL.revokeObjectURL(url);
      
      alert('Markers downloaded successfully!');
    } else {
      alert('No markers to download');
    }
  }

  SaveMarkerss(): void {
    // Clear previous messages
    this.successMessage = '';
    this.errorMessage = '';

    // Create FormData matching your DTO
   

  }

  resetToDefault() {
    if (confirm('Reset to default PDF and clear all markers?')) {
      this.pdfPath = 'assets/Sample Floor Plan (PDF).pdf';
      this.isFileUploaded = false;
      this.uploadedFileName = '';
      this.existingMarkers = null;
      this.currentMarkers = null;
      localStorage.removeItem('pdfMarkers');
    }
  }
saveMarkers() {
  // Validation
  if (!this.pdfFile && !this.pdfPath) {
    Swal.fire({
      title: 'Error!',
      text: 'Please select a PDF file first',
      icon: 'error',
      confirmButtonText: 'Ok'
    });
    return;
  }

  if (!this.currentMarkers || this.currentMarkers.markers?.length === 0) {
    Swal.fire({
      title: 'Warning!',
      text: 'No markers to save. Please add at least one marker on the PDF.',
      icon: 'warning',
      confirmButtonText: 'Ok'
    });
    return;
  }

  console.log('Saving to server:', this.currentMarkers);

  const formDatareference = new FormData();
  formDatareference.append('ClientId', this.au.getClientId().toString());
  formDatareference.append('PlantId', this.childValue.toString());
  formDatareference.append('PdfFile', this.pdfFile);
  formDatareference.append('isFileUploaded', this.isFileUploaded.toString());
  formDatareference.append('Markers', JSON.stringify(this.currentMarkers));

  // Show loading state
  this.isLoading = true;
  this.ls.showLoading();

  this.plantService.addPlantReference(formDatareference).subscribe({
    next: (response) => {
      this.isLoading = false;
      this.ls.hideLoading();

      Swal.fire({
        title: 'Success!',
        text: 'Markers saved successfully',
        icon: 'success',
        confirmButtonText: 'Ok',
        timer: 2000,
        timerProgressBar: true
      }).then(() => {
        // Optional: Reset form or navigate
        // this.backToPlant();
        // this.resetMarkers();
      });

      console.log('Markers saved successfully:', response);
    },
    error: (error) => {
      this.isLoading = false;
      this.ls.hideLoading();

      console.error('Error saving markers:', error);

      // Extract error message
      let errorTitle = 'Error!';
      let errorMessage = 'Failed to save markers. Please try again.';

      if (error.status === 0) {
        errorTitle = 'Connection Error';
        errorMessage = 'Unable to connect to the server. Please check your internet connection.';
      } else if (error.status === 400) {
        errorTitle = 'Validation Error';
        if (error.error?.message) {
          errorMessage = error.error.message;
        } else if (error.error?.errors) {
          const validationErrors = Object.entries(error.error.errors)
            .map(([field, messages]: [string, any]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
            .join('\n');
          errorMessage = validationErrors || 'Please check your input and try again.';
        } else {
          errorMessage = 'Invalid data. Please check all fields.';
        }
      } else if (error.status === 401) {
        errorTitle = 'Unauthorized';
        errorMessage = 'Your session has expired. Please login again.';
      } else if (error.status === 403) {
        errorTitle = 'Access Denied';
        errorMessage = 'You do not have permission to perform this action.';
      } else if (error.status === 404) {
        errorTitle = 'Not Found';
        errorMessage = 'The requested resource was not found.';
      } else if (error.status === 413) {
        errorTitle = 'File Too Large';
        errorMessage = 'The PDF file is too large. Please upload a smaller file.';
      } else if (error.status === 500) {
        errorTitle = 'Server Error';
        errorMessage = 'An internal server error occurred. Please try again later.';
      } else if (error.error?.message) {
        errorMessage = error.error.message;
      } else if (typeof error.error === 'string') {
        errorMessage = error.error;
      }

      Swal.fire({
        title: errorTitle,
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#dc3545'
      });
    },
    complete: () => {
      // Cleanup code if needed
      console.log('Save markers request completed');
    }
  });
}

  downloadJson() {
    if (this.currentMarkers) {
      const blob = new Blob([JSON.stringify(this.currentMarkers, null, 2)], 
        { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `markers-${Date.now()}.json`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }



   plantData: PlantHierarchyCount | null = null;
  dashboardCards: DashboardCard[] = [];
  isLoading: boolean = true;
  error: string = '';

   showGeneral = true;
  showDesign = false;
  showMaintenance = false;
  showIntegration = false;
  showEnvironment = false;
  showRegulatory = false;
  showDocuments = false;
  showAudit = false;
  showDefaultValues = false;
  expand = false;
  receivedData: any;
  receivedrefdoc: any;
  receivedrefdocmappings: any;
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
      defaultMinimumThickness: [null],
      minOrDefaultCR: [null],
      maxRemainingLife: [null],
      minimumInspectionInterval: [null],
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
    this.loadPlantDashboard();
    this.ls.hideLoading();
  }
   loadPlantDashboard(): void {
    this.isLoading = true;
    this.error = '';

    this.plantService.GetPlantHierarchyCountAsync(this.childValue)
      .subscribe({
        next: (data) => {
          this.plantData = data;
          this.prepareDashboardCards();
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Failed to load plant dashboard data. Please try again.';
          console.error('Error loading plant data:', err);
          this.isLoading = false;
        }
      });
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
        defaultMinimumThickness: plantData.defaultMinimumThickness ?? null,
        minOrDefaultCR: plantData.minOrDefaultCR ?? null,
        maxRemainingLife: plantData.maxRemainingLife ?? null,
        minimumInspectionInterval: plantData.minimumInspectionInterval ?? null,
        addedOnDate: plantData.addedOnDate ? new Date(plantData.addedOnDate).toLocaleDateString('en-CA') : null,
        modifiedOnDate: plantData.modifiedOnDate ? new Date(plantData.modifiedOnDate).toLocaleDateString('en-CA') : null,
        addedByName : plantData.addedByName || '',
        modifiedByName: plantData.modifiedByName || '',
      });
  this.receivedrefdoc  = (plantData.refdocloc);
  this.receivedrefdocmappings = plantData.refdocpoint ;
  this.existingMarkers = plantData.refdocpoint ;
  this.pdfPath = plantData.refdocloc;
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
  this.showDefaultValues = state;
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
this.plantService.addPlant(formData).subscribe({
  next: (response) => {
    this.ls.hideLoading();
    
    Swal.fire({
      title: 'Success!',
      text: 'Plant details updated successfully',
      icon: 'success',
       confirmButtonText: 'Ok',
        timer: 2000,
        timerProgressBar: true
      }).then(() => {
        // Optional: Reset form or navigate
         this.backToPlant();
        // this.resetMarkers();
      });

  },
  error: (error) => {
    this.ls.hideLoading();
    
    // Extract error message
    let errorMessage = 'An error occurred while saving plant details';
    
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.error?.errors) {
      // Handle validation errors
      const validationErrors = Object.values(error.error.errors).flat();
      errorMessage = validationErrors.join(', ');
    } else if (error.message) {
      errorMessage = error.message;
    } else if (typeof error.error === 'string') {
      errorMessage = error.error;
    }
    
    Swal.fire({
      title: 'Error!',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Ok'
    });
    
    console.error('Plant save error:', error);
  },
  complete: () => {
    // Optional: Any cleanup code
    console.log('Plant save request completed');
  }
});
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




  prepareDashboardCards(): void {
    if (!this.plantData) return;

    this.dashboardCards = [
      {
        title: 'Areas',
        count: this.plantData.areaCount,
        icon: 'location_on',
        color: '#3b82f6',
        bgColor: '#dbeafe',
        route: `/plant/${this.childValue}/areas`
      },
      {
        title: 'Units',
        count: this.plantData.unitCount,
        icon: 'widgets',
        color: '#8b5cf6',
        bgColor: '#ede9fe',
        route: `/plant/${this.childValue}/units`
      },
      {
        title: 'Systems',
        count: this.plantData.systemCount,
        icon: 'settings',
        color: '#ec4899',
        bgColor: '#fce7f3',
        route: `/plant/${this.childValue}/systems`
      },
      {
        title: 'Circuits',
        count: this.plantData.circuitCount,
        icon: 'power',
        color: '#f59e0b',
        bgColor: '#fef3c7',
        route: `/plant/${this.childValue}/circuits`
      },
      {
        title: 'Equipment',
        count: this.plantData.equipmentCount,
        icon: 'precision_manufacturing',
        color: '#10b981',
        bgColor: '#d1fae5',
        route: `/plant/${this.childValue  }/equipment`
      }
    ];
  }

  getTotalAssets(): number {
    if (!this.plantData) return 0;
    return this.plantData.areaCount + 
           this.plantData.unitCount + 
           this.plantData.systemCount + 
           this.plantData.circuitCount + 
           this.plantData.equipmentCount;
  }

  getPercentage(count: number): number {
    const total = this.getTotalAssets();
    return total > 0 ? (count / total) * 100 : 0;
  }

  navigateToDetail(route?: string): void {
    if (route) {
      this.router.navigate([route]);
    }
  }

  refresh(): void {
    this.loadPlantDashboard();
  }

  goBack(): void {
    this.router.navigate(['/plants']);
  }


}
