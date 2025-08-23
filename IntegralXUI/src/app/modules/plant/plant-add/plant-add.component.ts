import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { PlantService } from 'src/app/services/plant/plant.service';
import { AuthService } from 'src/app/services/auth/auth.service'; 
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/common/loadingPanel/loading.service';

@Component({
  selector: 'app-plant-add',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './plant-add.component.html',
  styleUrl: './plant-add.component.scss'
})
export class PlantAddComponent {
  showGeneral = true;
  showDesign = false;
  showMaintenance = false;
  showIntegration = false;
  showEnvironment = false;
  showRegulatory = false;
  showDocuments = false;
  plantForm: FormGroup;
  plantTypes: any[] = [];
  plantCategories: any[] = [];
  plantStatuses: any[] = [];
  canAdd: boolean = false; // Set based on user permissions
  documentPreviews: File[] = [];

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
  expand = true
  constructor(private fb: FormBuilder, private plantService: PlantService, private au:AuthService, private router:Router,private ls:LoadingService) {
    this.canAdd = (this.au.getCanAdd());
    this.plantForm = this.fb.group({
      plantId: [0],
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
      syncStatus : ['']
    });
    
  }
  isFieldInvalid(field: string): boolean {
    return this.plantForm.get(field)?.invalid && (this.plantForm.get(field)?.touched || this.plantForm.get(field)?.dirty);
  }
  ngOnInit(): void {
    this.loadDropdowns();
  }

  loadDropdowns() {
    // Load dropdown data from services
    this.plantService.getPlantTypes().subscribe((data: any) => {
      this.plantTypes = data;
    });
  
    this.plantService.getPlantCategories().subscribe((data: any) => {
      this.plantCategories = data;
    });
    this.plantService.getPlantStatuses().subscribe((data: any) => {
      this.plantStatuses = data;
    });

    this.plantService.getPlantdesignCodesStandards().subscribe((data: any) => {
      this.designCodesStandards = data;
    });
    this.plantService.getPlantprocessTypes().subscribe((data: any) => {
      this.processTypes = data;
    });
    this.plantService.getPlantprimaryFeedstocks().subscribe((data: any) => {
      this.primaryFeedstocks = data;
    });
    this.plantService.getPlantmaintenanceStrategies().subscribe((data: any) => {
      this.maintenanceStrategies = data;
    });
    this.plantService.getPlantfireExplosionRisks().subscribe((data: any) => {
      this.fireExplosionRisks = data;
    });
    this.plantService.getPlanthazardClassifications().subscribe((data: any) => {
      this.hazardClassifications = data;
    });
    this.plantService.getPlantreliabilityMetrics().subscribe((data: any) => {
      this.reliabilityMetrics = data;
    });
    this.plantService.getPlantmodelAvailabilities().subscribe((data: any) => {
      this.modelAvailabilities = data;
    });

    this.plantService.getPlantsapLinkedEquipmentData().subscribe((data: any) => {
      this.sapLinkedEquipmentData = data;
    });
    this.plantService.getPlanthistoricalRecordsAvailability().subscribe((data: any) => {
      this.historicalRecordsAvailability = data;
    });
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

updateFileCount() {
  const fileCount = this.documentPreviews.length;
  const fileInput = document.getElementById('documents') as HTMLInputElement;
  if (fileInput) {
    fileInput.value = fileCount+' - files'; 
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

deleteFile(index: number) {
  this.documentPreviews.splice(index, 1);
  this.documentPreviews = [...this.documentPreviews]; // Ensure change detection

  const fileInput = document.getElementById('documents') as HTMLInputElement;
  if (fileInput) {
    fileInput.value = 'Upload files'; 
}
}
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

    this.documentPreviews.forEach(file => {
      formData.append('documents', file);
    });
    
            this.plantService.addPlant(formData).subscribe(
              (response) => {
                this.ls.hideLoading();
            
              Swal.fire({
                  title: 'Success!',
                  text:  'Plant added successfully',
                  icon: 'success',
                  confirmButtonText: 'Ok'
                });
                this.backToPlant();
                this.ls.hideLoading();
              }
            );
  }
  backToPlant() {
    this.router.navigate(['/clientplant/list']);
    }

     // Accordion state variables


  // Central list of section state keys
  private toggleSections: string[] = [
    'showGeneral',
    'showDesign',
    'showMaintenance',
    'showIntegration',
    'showEnvironment',
    'showRegulatory',
    'showDocuments'
  ];


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
  }

}
