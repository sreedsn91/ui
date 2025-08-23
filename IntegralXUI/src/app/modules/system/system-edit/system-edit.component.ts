import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { UnitService } from 'src/app/services/unit/unit.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';
import { SystemDocs } from '../system';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/common/loadingPanel/loading.service';
import { SystemService } from 'src/app/services/system/system.service';

    @Component({
    selector: 'app-system-edit',
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './system-edit.component.html',
    styleUrl: './system-edit.component.scss'
    })
    export class SystemEditComponent {
onDelete() {
throw new Error('Method not implemented.');
}
onSave() {
throw new Error('Method not implemented.');
}
    receivedData: any;
    allExpanded = false;
    clientData: any;
    childValue: number = 0;
    documents: SystemDocs[] = [];
    canEdit: boolean = false;
    canDelete: boolean = false;
    documentsToDelete: number[] = [];
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
  showGeneral = true;
  showDesign = false;
  showMaintenance = false;
  showIntegration = false; 
  showIntegrity = false;
  showEnvironment = false;
  showRegulatory = false;
  showDocument = false;
  showAudit = false
  expand = false;


  systemNameValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    const name =  this.systemForm.get('name')?.value;
    const id = this.systemForm.get('Id')?.value;
    const plantId = this.systemForm.get('plantId')?.value;
    this.plantIdVal = plantId === '' || plantId == null ? 0 : plantId;

    const areaId = this.systemForm.get('areaId')?.value;
    this.areaIdVal = areaId === '' || areaId == null ? 0 : areaId;

    const unitId = this.systemForm.get('unitId')?.value;
    this.unitIdVal = unitId === '' || unitId == null ? 0 : unitId;
    if (!name) {
      return new Observable<null>();
    }
    return this.systemService.checkSystemExists(id,this.areaIdVal,this.unitIdVal ,this.plantIdVal, name).pipe(
      map((data: any) => {
        
        if (data) {
          return { nameExists: true };
        }
        return null;
      })
    );
  }
  constructor(private fb: FormBuilder, private systemService: SystemService,  private ls: LoadingService,  private sharedDataService: SharedDataService,private au:AuthService, private router:Router) {
  
    this.canDelete = (this.au.getCanDelete());
    this.canEdit = (this.au.getCanEdit());
    this.receivedData = this.sharedDataService.getData();
    this.childValue = this.receivedData.id;
   
    this.systemForm = this.fb.group({
      Id: [0],
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


      typeId: ['' ],
      designCodesStandardId: [''],
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
 // File input handling separately
      deletedFiles: [''],
      userId: [this.au.getUserId()],
      eRPorCMMSPlantCode: [''],
      eRPorCMMSSystem : [''],
      functionalLocation: [''],
      externalSystemID : [''],
      syncStatus : [''] ,
      createdUser : [''],
       modifiedUser : ['']
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
  this.showIntegrity = state;
  this.showRegulatory = state;
  this.showDocument = state;
   this.showAudit = state;
  }
  async ngOnInit() {
    this.ls.showLoading();
    await this.loadDropdowns();
    await this.loaddetails();
    this.systemForm.get('plantId')?.valueChanges.subscribe((plantId) => {
      
      this.systemForm.get('name')?.updateValueAndValidity(); 
      if (plantId) {
        this.loadAreasByPlant(plantId);
        this.loadUnits(plantId,0);
      
      } else {
        this.areas = []; // Reset area list if no plant is selected
      }
    });
    this.ls.hideLoading();
   
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
  loadDropdowns() {
    // Load dropdown data from services
    this.systemService.getSystemTypes().subscribe((data: any) => {
      this.systemTypes = data;
    });
  
    this.systemService.getPlants().subscribe((data: any) => {
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
  loaddetails() {
    this.systemService.getSystemDetails(this.childValue).subscribe((sysData: any) => {
      debugger;
      this.loadAreasByPlant(sysData.plantId);
      this.loadUnits(sysData.plantId,sysData.areaId)
        this.systemForm.patchValue({
           
            Id: sysData.id,
            clientId: sysData.clientId,
            name: sysData.name,
            description: sysData.description,
            areaId: sysData.areaId,
            plantId: sysData.plantId,
            unitId: sysData.unitId,
            location: sysData.location,
            locationGpsCoordinates: sysData.locationGpsCoordinates,
            ownerOrOperator: sysData.ownerOrOperator,
            systemFrom:  sysData.systemFrom ? new Date( sysData.systemFrom).toLocaleDateString('en-CA') : null,
            systemTo: sysData.systemTo ? new Date( sysData.systemTo).toLocaleDateString('en-CA') : null,
            commissioningDate:sysData.commissioningDate ? new Date( sysData.commissioningDate).toLocaleDateString('en-CA') : null,
            builtDate: sysData.builtDate ? new Date( sysData.builtDate).toLocaleDateString('en-CA') : null,
            statusId: sysData.statusId,
        
            typeId: sysData.typeId,
            designCodesStandardId: sysData.designCodesStandardId,
            designPressure: sysData.designPressure,
            designTemperature: sysData.designTemperature,
            designLife: sysData.designLife,
            primaryProducts: sysData.primaryProducts,
            capacity: sysData.capacity,
            marginPerDay: sysData.marginPerDay,
            hazardClassification: sysData.hazardClassification,
            primaryMaterialOfConstruction: sysData.primaryMaterialOfConstruction,
        
            operatingMediumService: sysData.operatingMediumService,
            operatingTemperature: sysData.operatingTemperature,
            operatingPressure: sysData.operatingPressure,
            flowRate: sysData.flowRate,
            corrosivityId: sysData.corrosivityId,
            corrosiveEnvironments: sysData.corrosiveEnvironments,
            damageMechanisms: sysData.damageMechanisms,
            humidityLevel: sysData.humidityLevel,
            seismicZoneClassification: sysData.seismicZoneClassification,
            weatherConditions: sysData.weatherConditions,
            fireExplosionRiskId: sysData.fireExplosionRiskId,
            toxicRiskId: sysData.toxicRiskId,
            totalPopulation: sysData.totalPopulation,
            populationDensity: sysData.populationDensity,
        
            currentInspectionStrategyId: sysData.currentInspectionStrategyId,
            shutdownTurnaroundFrequency: sysData.shutdownTurnaroundFrequency,
            lastInspectionDate: sysData.lastInspectionDate ? new Date( sysData.lastInspectionDate).toLocaleDateString('en-CA') : null,
            nextInspectionDueDate: sysData.nextInspectionDueDate ? new Date( sysData.nextInspectionDueDate).toLocaleDateString('en-CA') : null,
            lastMajorOverhaulDate: sysData.lastMajorOverhaulDate ? new Date( sysData.lastMajorOverhaulDate).toLocaleDateString('en-CA') : null,
            nextMajorOverhaulDate: sysData.nextMajorOverhaulDate ? new Date( sysData.nextMajorOverhaulDate).toLocaleDateString('en-CA') : null,
            subsequentMajorOverhaulDate: sysData.subsequentMajorOverhaulDate ? new Date( sysData.subsequentMajorOverhaulDate).toLocaleDateString('en-CA') : null,
            mtbf: sysData.mtbf,
            mttr: sysData.mttr,
            inspectionSupervisor: sysData.inspectionSupervisor,
            inspector: sysData.inspector,
        
            governingRegulatoryBody: sysData.governingRegulatoryBody,
            safetyEnvironmentalPermits: sysData.safetyEnvironmentalPermits,
            complianceCertifications: sysData.complianceCertifications,
            incidentHistory: sysData.incidentHistory,
        
            addedBy: sysData.addedBy,
            addedOn: sysData.createdDate,
            modifiedBy: this.au.getUserId(),
            userId: this.au.getUserId(),
            modifiedOn: sysData.lastModifiedDate,
            isDeleted: sysData.isDeleted,
            isActive: sysData.isActive,
            documents:  sysData.docs || null, 
            eRPorCMMSPlantCode: sysData.erPorCMMSPlantCode,
            eRPorCMMSSystem: sysData.erPorCMMSSystem,
            functionalLocation: sysData.functionalLocation,
            externalSystemID: sysData.externalSystemId,
            syncStatus: sysData.syncStatus,
            createdUser: sysData.createdUser,
            modifiedUser: sysData.modifiedUser
        });
        
      this.documents = (sysData.docs);
    });
  }

  backToSystem() {
    this.router.navigate(['/clientsystem/list']);
    }
    
    saveSystem() {

        if (this.systemForm.invalid) {
            // const invalidControls = [];

            // const controls = this.systemForm.controls;
            // for (const name in controls) {
            //     if (controls[name].invalid) {
            //         invalidControls.push({
            //           field: name,
            //           errors: controls[name].errors
            //         });
            //       }
            //       debugger;
            // }
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
       
        formData.append('deletedFiles', JSON.stringify(this.documentsToDelete).toString());
    
        this.documentPreviews.forEach(file => {
          formData.append('documents', file);
        });
    
        this.systemService.addSystem(formData).subscribe(
          (response) => {
    
    
            Swal.fire({
              title: 'Success!',
              text: 'System details updated successfully',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
            this.backToSystem();
          }
        );
      }
      markForDeletion(documentId: number) {
        this.documentsToDelete.push(documentId);
        this.documents = this.documents.filter(doc => doc.id !== documentId); // Remove from UI
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
      downloadFileExisting(documentId: number, fileName: string) {
        this.systemService.downloadDocument(documentId).subscribe(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = fileName;
          a.click();
          window.URL.revokeObjectURL(url);
        });
      }
        DeleteSystem() {
           Swal.fire({
             title: 'Are you sure?You want to delete this system!',
             text: 'All data associated with this system will be lost',
             icon: 'warning',
             width: '300px',
             showCancelButton: true,
             confirmButtonColor: '#3085d6',
             cancelButtonColor: '#d33',
             confirmButtonText: 'Yes, Delete it!'
           }).then((result) => {
             if (result.isConfirmed) {
               this.systemService.deleteSystem(this.childValue).subscribe(
                 () => this.backToSystem(),
                 error =>
                   Swal.fire('Delete failed:', error)
               );
       
             }
           });
         }
}
