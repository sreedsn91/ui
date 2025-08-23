import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { UnitService } from 'src/app/services/unit/unit.service';
import { AuthService } from 'src/app/services/auth/auth.service'; 
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unit-add',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './unit-add.component.html',
  styleUrl: './unit-add.component.scss'
})
export class UnitAddComponent {

  unitForm: FormGroup;
  plantIdVal :number;
  unitTypes: any[] = [];
  plants: any[] = [];
  areas: any[] = [];
  unitCategories: any[] = [];
  unitStatuses: any[] = [];
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
    showGeneral = true;
  showDesign = false;
  showMaintenance = false;
  showIntegration = false;
  showEnvironment = false;
  showRegulatory = false;
  showDocuments = false;
  showAudit = false
  expand = false;
  constructor(private fb: FormBuilder, private unitService: UnitService, private au:AuthService, private router:Router) {
    this.canAdd = (this.au.getCanAdd());
    this.unitForm = this.fb.group({
      unitId: [0],
      clientId: [this.au.getClientId()],
      name: ['', Validators.required, [this.unitNameValidator.bind(this)]],
      description: ['', Validators.required],
      areaId: ['', Validators.required, [this.unitNameValidator.bind(this)]],
      plantId: ['', Validators.required, [this.unitNameValidator.bind(this)]],
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
    return this.unitForm.get(field)?.invalid && (this.unitForm.get(field)?.touched || this.unitForm.get(field)?.dirty);
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
  ngOnInit(): void {
    this.unitForm.get('plantId')?.valueChanges.subscribe((plantId) => {
      
      this.unitForm.get('name')?.updateValueAndValidity(); 
      if (plantId) {
        this.loadAreasByPlant(plantId);
      } else {
        this.areas = []; // Reset area list if no plant is selected
      }
    });
    this.loadDropdowns();
   
  }
  onPlantChange() {
    
    this.unitForm.get('plantId')?.valueChanges.subscribe(plantId => {
      if (plantId) {
        this.loadAreasByPlant(plantId);
      } else {
        this.areas = []; // Reset area list if no plant is selected
      }
    });
  }
  loadAreasByPlant(plantId: number) {
   
    this.unitService.getArea(plantId).subscribe((data: any[]) => {
      this.areas = data;
    });
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
 
    this.unitService.getPlants().subscribe((data: any) => {
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
  
  unitNameValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    const name =  this.unitForm.get('name')?.value;
    
    const plantId = this.unitForm.get('plantId')?.value;
    this.plantIdVal = plantId === '' || plantId == null ? 0 : plantId;
    if (!name) {
      return new Observable<null>();
    }
    return this.unitService.checkUnitExists(0,this.plantIdVal, name).pipe(
      map((data: any) => {
        
        if (data) {
          return { nameExists: true };
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

    this.documentPreviews.forEach(file => {
      formData.append('documents', file);
    });
    
            this.unitService.addUnit(formData).subscribe(
              (response) => {
              
            
              Swal.fire({
                  title: 'Success!',
                  text:  'Unit added successfully',
                  icon: 'success',
                  confirmButtonText: 'Ok'
                });
                this.backToUnit();
              }
            );
  }
  backToUnit() {
    this.router.navigate(['/clientunit/list']);
    }

}
