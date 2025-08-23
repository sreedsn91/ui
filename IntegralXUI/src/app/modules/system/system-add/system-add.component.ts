import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { SystemService } from 'src/app/services/system/system.service';
import { AuthService } from 'src/app/services/auth/auth.service'; 
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-system-add',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './system-add.component.html',
  styleUrl: './system-add.component.scss'
})
export class SystemAddComponent {
 showGeneral = true;
  showDesign = false;
  showMaintenance = false;
  showIntegration = false;
  showEnvironment = false;
  showRegulatory = false;
  showDocuments = false;
  showAudit = false
  expand = false;
  systemForm: FormGroup;
  plantIdVal :number;
  areaIdVal :number;
  unitIdVal :number;
  systemTypes: any[] = [];
  plants: any[] = [];
  areas: any[] = [];
  units: any[] = [];
  seismicZone: any[] = [];
  toxicRisks: any[] = [];
  corositivity: any[] = [];
  fireExplosionRisks: any[] = [];
  systemStatuses: any[] = [];
  hazardClassification: any[] = [];
  materialOfConstruction: any[] = [];
  currentInspectionStrategy: any[] = [];
  canAdd: boolean = false; // Set based on user permissions
  documentPreviews: File[] = [];
  
  designCodesStandards: any[] = [];
  processTypes: any[] = [];
 

  constructor(private fb: FormBuilder, private systemService: SystemService, private au:AuthService, private router:Router) {
    this.canAdd = (this.au.getCanAdd());
    this.systemForm = this.fb.group({
      systemId: [0],
      clientId: [this.au.getClientId()],
      name: ['', Validators.required, [this.systemNameValidator.bind(this)]],
      description: ['', Validators.required],
      areaId: [''],
      plantId: ['', Validators.required],
      unitId: [''],
      location: ['' ],
      locationGpsCoordinates: [''],
      ownerOrOperator: [''],
      systemFrom: [''],
      systemTo: [''],
      commissioningDate: [null ],
      builtDate: [null ],
      statusId: ['' ],
      designCodesStandardId: [''],
      typeId: [''],
      designPressure: [null, Validators.min(0)],
      designTemperature:  [null, Validators.min(0)],
      designLife:  [null, Validators.min(0)],
      primaryProducts: ['' ],
      capacity:  [null, Validators.min(0)],
      marginPerDay: [null, Validators.min(0)],
      hazardClassification: [null],
      primaryMaterialOfConstruction: [null],


      operatingMediumService: ['' ],
      operatingTemperature: [null, Validators.min(0)],
      operatingPressure: [null, Validators.min(0)],
      flowRate: [null, Validators.min(0)],
      corrosivityId:  [null],
      corrosiveEnvironments: ['' ],
      damageMechanisms: ['' ],
      humidityLevel: [null, Validators.min(0)],
      seismicZoneClassification:  [null],
      weatherConditions: ['' ],
      fireExplosionRiskId: [null, Validators.min(0)],
      toxicRiskId: [null, Validators.min(0)],
      totalPopulation: [null, Validators.min(0)],
      populationDensity: [null, Validators.min(0)],


      currentInspectionStrategyId:  [null],
      shutdownTurnaroundFrequency: [null, Validators.min(0)],
      lastInspectionDate:  [null],
      nextInspectionDueDate:  [null],
      lastMajorOverhaulDate:  [null],
      nextMajorOverhaulDate:  [null],
      subsequentMajorOverhaulDate:  [null],
      mtbf: ['' ],
      mttr: ['' ],
      inspectionSupervisor: ['' ],
      inspector: ['' ],


      governingRegulatoryBody: ['' ],
      safetyEnvironmentalPermits: ['' ],
      complianceCertifications: ['' ],
      incidentHistory: ['' ],


      addedBy: [this.au.getUserId()],
      addedOn: [new Date()],
      modifiedBy: [null],
      modifiedOn: [null],
      isDeleted: [false],
      isActive: [true],
      userId:[this.au.getUserId()],
      documents: [null], // File input handling separately
      deletedFiles: [''],
      eRPorCMMSPlantCode: [''],
      eRPorCMMSSystem : [''],
      functionalLocation: [''],
      externalSystemID : [''],
      syncStatus : ['']
});
  }
  isFieldInvalid(field: string): boolean {
    return this.systemForm.get(field)?.invalid && (this.systemForm.get(field)?.touched || this.systemForm.get(field)?.dirty);
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
    this.systemForm.get('plantId')?.valueChanges.subscribe((plantId) => {
      
      this.systemForm.get('name')?.updateValueAndValidity(); 
      if (plantId) {
        this.loadAreasByPlant(plantId);
        this.loadUnits(plantId,0);
      
      } else {
        this.areas = []; // Reset area list if no plant is selected
      }
    });

    this.systemForm.get('areaId')?.valueChanges.subscribe(() => {
      this.systemForm.get('name')?.updateValueAndValidity();
    });
    this.systemForm.get('unitId')?.valueChanges.subscribe(() => {
      this.systemForm.get('name')?.updateValueAndValidity();
    });
    this.loadDropdowns();
   
  }
  onPlantChange() {
    
    this.systemForm.get('plantId')?.valueChanges.subscribe(plantId => {
      if (plantId) {
        this.loadAreasByPlant(plantId);
      
      } else {
        this.areas = []; // Reset area list if no plant is selected
      }
    });
  }
  loadAreasByPlant(plantId: number) {
   
    this.systemService.getArea(plantId).subscribe((data: any[]) => {
      this.areas = data;
    });
  }
  loadUnits(plantId: number,areaId : number) {
   
    this.systemService.getUnits(plantId,areaId).subscribe((data: any[]) => {
      this.units = data;
    });
  }
 
  
  systemNameValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    
    const name =  this.systemForm.get('name')?.value;
    
    const plantId = this.systemForm.get('plantId')?.value;
    this.plantIdVal = plantId === '' || plantId == null ? 0 : plantId;

    const areaId = this.systemForm.get('areaId')?.value;
    this.areaIdVal = areaId === '' || areaId == null ? 0 : areaId;

    const unitId = this.systemForm.get('unitId')?.value;
    this.unitIdVal = unitId === '' || unitId == null ? 0 : unitId;
    if (!name) {
      return new Observable<null>();
    }
    return this.systemService.checkSystemExists(0,this.areaIdVal,this.unitIdVal ,this.plantIdVal, name).pipe(
      map((data: any) => {
        alert(data);
        if (data) {
          return { nameExists: true };
        }
        return null;
      })
    );
  }
  loadDropdowns() {
    // Load dropdown data from services
    this.systemService.getSystemTypes().subscribe((data: any) => {
      this.systemTypes = data;
    });
  
    this.systemService.getPlants().subscribe((data: any) => {
      debugger;
      this.plants = data;
    });
    this. systemService.getDesignCodesStandard().subscribe((data: any) => {
      this.designCodesStandards = data;
    });
    this. systemService.getSystemTypes().subscribe((data: any) => {
      this.processTypes = data;
    });
    this. systemService.getSystemStatus().subscribe((data: any) => {
      this.systemStatuses = data;
    });
    
    this. systemService.getDesignCodesStandard().subscribe((data: any) => {
      this.designCodesStandards = data;
    });
    this. systemService.getHazardClassification().subscribe((data: any) => {
      this.hazardClassification = data;
    });
    this. systemService.GetDdlMaterialofConstruction().subscribe((data: any) => {
      this.materialOfConstruction = data;
    });
    this. systemService.getCorrosivity().subscribe((data: any) => {
      this.corositivity = data;
    });
    this. systemService.GetDdlSeismicClassification().subscribe((data: any) => {
      this.seismicZone = data;
    });

    this. systemService.GetDdlFireExplosionRisk().subscribe((data: any) => {
      this.fireExplosionRisks = data;
    });
    this. systemService.GetDdlToxicRisks().subscribe((data: any) => {
      this.toxicRisks = data;
    });
    this. systemService.GetDdlCurrentInspectionStrategy().subscribe((data: any) => {
      this.currentInspectionStrategy = data;
    });
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
  saveSystem() {
    if (this.systemForm.invalid) {
      return;
    }
    const formData = new FormData();
    Object.keys(this.systemForm.value).forEach(key => {
      const value = this.systemForm.value[key];

      // Only append values that are not empty strings or "null"
      if (value !== "" && value !== "null" && value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    this.documentPreviews.forEach(file => {
      formData.append('documents', file);
    });
    
            this.systemService.addSystem(formData).subscribe(
              (response) => {
              
            
              Swal.fire({
                  title: 'Success!',
                  text:  'System added successfully',
                  icon: 'success',
                  confirmButtonText: 'Ok'
                });
                this.backToSystem();
              }
            );
  }
  backToSystem() {
    this.router.navigate(['/clientsystem/list']);
    }

}
