import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { AreaService } from 'src/app/services/area/area.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-area-add',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './area-add.component.html',
  styleUrl: './area-add.component.scss'
})
export class AreaAddComponent {
  showGeneral = true;
  showDesign = false;
  showMaintenance = false;
  showIntegration = false;
  showEnvironment = false;
  showRegulatory = false;
  showDocuments = false;
  expand = false;

  areaForm: FormGroup;
  plantIdVal: number;
  areaTypes: any[] = [];
  plants: any[] = [];
  areaCategories: any[] = [];
  areaStatuses: any[] = [];
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

  constructor(private fb: FormBuilder, private areaService: AreaService, private au: AuthService, private router: Router) {
    this.canAdd = (this.au.getCanAdd());
    this.areaForm = this.fb.group({
      areaId: [0],
      clientId: [this.au.getClientId()],
      name: ['', Validators.required, [this.areaNameValidator.bind(this)]],
      description: ['', Validators.required],
      plantId: ['', Validators.required, [this.areaNameValidator.bind(this)]],
      location: [''],
      locationGpsCoordinates: [''],
      facilityName: [''],
      ownerOrOperator: [''],
      commissioningDate: [null],
      builtDate: [null],
      statusId: [''],
      typeId: [''],
      categoryId: [''],
      designLife: [null, Validators.min(0)],
      primaryProducts: [''],
      capacity: [null, [Validators.min(0)]],
      marginPerDay: [null, [Validators.min(0)]],
      numberOfProcessingUnits: [null, Validators.min(0)],
      operatingTemperatureRange: [null, Validators.min(0)],
      operatingPressureRange: [null, Validators.min(0)],
      corrosiveEnvironments: [''],
      humidityLevel: [''],
      seismicZoneClassification: [''],
      weatherConditions: [''],
      totalPopulation: [null, [Validators.min(0)]],
      populationDensity: [null, [Validators.min(0)]],
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
      eRPorCMMSSystem: [''],
      functionalLocation: [''],
      externalSystemID: [''],
      syncStatus: ['']
    });
  }
  isFieldInvalid(field: string): boolean {
    return this.areaForm.get(field)?.invalid && (this.areaForm.get(field)?.touched || this.areaForm.get(field)?.dirty);
  }
  ngOnInit(): void {
    this.areaForm.get('plantId')?.valueChanges.subscribe(() => {
      this.areaForm.get('name')?.updateValueAndValidity(); // Force name field to revalidate
    });
    this.loadDropdowns();
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

    this.areaService.getPlantdesignCodesStandards().subscribe((data: any) => {
      this.designCodesStandards = data;
    });
    this.areaService.getPlantprocessTypes().subscribe((data: any) => {
      this.processTypes = data;
    });
    this.areaService.getPlantprimaryFeedstocks().subscribe((data: any) => {
      this.primaryFeedstocks = data;
    });
    this.areaService.getPlantmaintenanceStrategies().subscribe((data: any) => {
      this.maintenanceStrategies = data;
    });
    this.areaService.getPlantfireExplosionRisks().subscribe((data: any) => {
      this.fireExplosionRisks = data;
    });
    this.areaService.getPlanthazardClassifications().subscribe((data: any) => {
      this.hazardClassifications = data;
    });
    this.areaService.getPlantreliabilityMetrics().subscribe((data: any) => {
      this.reliabilityMetrics = data;
    });
    this.areaService.getPlantmodelAvailabilities().subscribe((data: any) => {
      this.modelAvailabilities = data;
    });

    this.areaService.getPlantsapLinkedEquipmentData().subscribe((data: any) => {
      this.sapLinkedEquipmentData = data;
    });
    this.areaService.getPlanthistoricalRecordsAvailability().subscribe((data: any) => {
      this.historicalRecordsAvailability = data;
    });
  }

  areaNameValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    const name = this.areaForm.get('name')?.value;

    const plantId = this.areaForm.get('plantId')?.value;
    this.plantIdVal = plantId === '' || plantId == null ? 0 : plantId;
    if (!name) {
      return new Observable<null>();
    }
    return this.areaService.checkAreaExists(0, this.plantIdVal, name).pipe(
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
      fileInput.value = fileCount + ' - files';
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

    this.documentPreviews.forEach(file => {
      formData.append('documents', file);
    });

    this.areaService.addArea(formData).subscribe(
      (response) => {


        Swal.fire({
          title: 'Success!',
          text: 'Area added successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.backToArea();
      }
    );
  }
  backToArea() {
    this.router.navigate(['/clientarea/list']);
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
  }

}
