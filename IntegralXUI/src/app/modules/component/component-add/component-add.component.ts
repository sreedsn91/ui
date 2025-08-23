import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ComponentService } from 'src/app/services/component/component.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-component-add',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './component-add.component.html',
  styleUrl: './component-add.component.scss'
})
export class ComponentAddComponent {


  canAdd: boolean = false;
  componentForm!: FormGroup;

  documentPreviews: File[] = [];
  plants: any[] = [];
  areas: any[] = [];
  units: any[] = [];
  systems: any[] = [];
  circuits: any[] = [];

  componentCategory: any[] = [];
  componentType: any[] = [];
  componentOperationalStatus: any[] = [];
  componentDesignCode: any[] = [];
  componentEditionAddendum: any[] = [];
  componentComplianceCertification: any[] = [];
  componentGeometry: any[] = [];
  componentOrientation: any[] = [];
  componentFluidPhase: any[] = [];
  componentCorrosivity: any[] = [];
  componentProcessEnvironment: any[] = [];
  componentToxicMixture: any[] = [];
  componentToxicFluid: any[] = [];
  componentFlammability: any[] = [];
  componentCriticality: any[] = [];
  componentSeismicZoneClassification: any[] = [];
  componentFireExplosionRisk: any[] = [];
  componentToxicRisk: any[] = [];
  componentHeatTreatment: any[] = [];
  componentHeatTreatmentType: any[] = [];
  componentImpactTest: any[] = [];
  componentPressureTest: any[] = [];
  componentPressureTestType: any[] = [];
  componentRadiography: any[] = [];
  componentRadiographyCategory: any[] = [];
  componentGeneralMaterial: any[] = [];
  componentCladding: any[] = [];
  componentCladdingType: any[] = [];
  componentCladdingMaterial: any[] = [];
  componentLining: any[] = [];
  componentLiningType: any[] = [];
  componentMaterialCertification: any[] = [];
  componentExternalCoating: any[] = [];
  componentExternalCoatingType: any[] = [];
  componentInsulation: any[] = [];
  componentInsulationType: any[] = [];
  componentInsulationMaterial: any[] = [];
  componentCUIPotential: any[] = [];
  componentExternalEnvironment: any[] = [];
  componentSupportType: any[] = [];
  componentHeatTracing: any[] = [];
  componentFireProofing: any[] = [];
  componentBuried: any[] = [];
  componentCathodicProtection: any[] = [];
  componentIsitaDeadleg: any[] = [];
  componentDeadlegCategory: any[] = [];
  componentDeadlegCriticality: any[] = [];
  componentPressureReliefDevices: any[] = [];
  componentChemicalInjection: any[] = [];
  componentDetectionSystem: any[] = [];
  componentIsolationSystem: any[] = [];
  componentMitigationSystem: any[] = [];
  componentOnlineCorrosionMonitoring: any[] = [];
  componentCorrosionMonitoringType: any[] = [];
  componentHazardClassification: any[] = [];
  componentIncidentHistory: any[] = [];
  componentCurrentInspectionStrategy: any[] = [];
  componentInspectionAccess: any[] = [];
  componentScheduledRepairReplacement: any[] = [];
  componentRepairReplacementDuringNextShutdown: any[] = [];
  componentSyncStatus: any[] = [];

  expand = true;
  showGeneral: boolean = this.expand;
  showLocation: boolean = this.expand;
  showDesign: boolean = this.expand;
  showGeometry: boolean = this.expand;
  showOperation: boolean = this.expand;
  showFabrication: boolean = this.expand;
  showMaterial: boolean = this.expand;
  showExternal: boolean = this.expand;
  showDeadleg: boolean = this.expand;
  showSafety: boolean = this.expand;
  showIntegrity: boolean = this.expand;
  showInspectionSchedule: boolean = this.expand;
  showMaintenanceSchedule: boolean = this.expand;
  showMetadata: boolean = this.expand;
  showAudit: boolean = this.expand;
  showDocument: boolean = this.expand;

  constructor(private service: ComponentService, private fb: FormBuilder, private au: AuthService, private router: Router) {
    this.canAdd = (this.au.getCanAdd());
  }

  ngOnInit() {
    alert("1");
    this.componentForm = this.fb.group({
      // Identification
      id: [0],
      clientId: [null, Validators.required],
      componentID: [''],
      componentDescription: [''],
      componentCategory: [null],
      componentType: [null],

      // Dates
      commissioningDate: [null],
      builtDate: [null],
      operationalStatus: [null],

      // Location
      plantID: [null],
      areaID: [null],
      unitID: [null],
      systemID: [null],
      circuitID: [null],
      corrosionLoopID: [null],
      equipmentID: [null],
      specificLocation: [''],
      equipmentFrom: [''],
      equipmentTo: [''],
      pfd: [''],
      pAndID: [''],
      gaDrawing: [''],

      // Design
      designCode: [null],
      editionAndAddendum: [null],
      designPressureInternal: [0],
      designPressureExternal: [0],
      designTemperatureMax: [0],
      designTemperatureMDMT: [0],
      mawp: [0],
      designLife: [0],
      primaryProducts: [''],
      marginPerDay: [0],
      complianceCertification: [null],
      governingRegulatoryBody: [''],

      // Geometry
      geometry: [null],
      nps: [0],
      insideDiameter: [0],
      outsideDiameter: [0],
      lengthHeight: [0],
      fillHeight: [0],
      orientation: [null],
      emptyWeight: [0],
      capacity: [0],

      // Operating Conditions
      operatingPressureMax: [0],
      operatingPressureAvg: [0],
      operatingTempMax: [0],
      operatingTempMin: [0],
      processFluid: [''],
      fluidComposition: [''],
      fluidPhase: [null],
      inventoryVolume: [0],
      density: [0],
      viscosity: [0],
      specificGravity: [0],
      flowRate: [0],
      velocity: [0],
      corrosivity: [null],
      ph: [0],
      processEnvironment: [null],
      toxicMixture: [null],
      toxicFluid: [null],
      flammability: [null],
      operatingWeight: [0],
      criticality: [null],
      humidityLevel: [0],
      seismicZoneClassification: [null],
      fireAndExplosionRisk: [null],
      toxicRisk: [null],
      totalPopulation: [0],
      populationDensity: [0],

      // Manufacturer & Testing
      manufacturer: [''],
      serialNumber: [''],
      warrantyDate: [null],
      heatTreatment: [null],
      heatTreatmentType: [null],
      impactTest: [null],
      pressureTest: [null],
      pressureTestType: [null],
      testPressure: [''],
      radiography: [null],
      radiographyCategory: [null],
      jointEfficiency: [''],
      otherNDE: [''],

      // Material
      generalMaterial: [null],
      materialSpecification: [''],
      allowableStress: [0],
      nominalThickness: [0],
      corrosionAllowance: [0],
      cladding: [null],
      claddingType: [null],
      claddingMaterial: [null],
      claddingThickness: [0],
      lining: [null],
      liningType: [null],
      materialCertification: [null],

      // Meta
      addedBy: [null],
      addedOn: [null],
      modifiedBy: [null],
      modifiedOn: [null],
      isDeleted: [false],
      isActive: [true]
    });
 this.loadDropdowns();
  }


saveComponent() {
 if (this.componentForm.invalid) {
      return;
    }
    const formData = new FormData();
    Object.keys(this.componentForm.value).forEach(key => {
      const value = this.componentForm.value[key];

      // Only append values that are not empty strings or "null"
      if (value !== "" && value !== "null" && value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    this.documentPreviews.forEach(file => {
      formData.append('documents', file);
    });

    this.service.addComponent(formData).subscribe(
      (response) => {


        Swal.fire({
          title: 'Success!',
          text: 'Component added successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.backToComponent();
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
 backToComponent() {
    this.router.navigate(['/clientcomponent/list']);
  }
//DDL
loadDropdowns() {
 // Subscribe to each service call individually
this.service.getComponentCategory().subscribe(data => {
  this.componentCategory = data;
});

this.service.getComponentType().subscribe(data => {
  this.componentType = data;
});

this.service.getComponentOperationalStatus().subscribe(data => {
  this.componentOperationalStatus = data;
});

this.service.getComponentDesignCode().subscribe(data => {
  this.componentDesignCode = data;
});

this.service.getComponentEditionAddendum().subscribe(data => {
  this.componentEditionAddendum = data;
});

this.service.getComponentComplianceCertification().subscribe(data => {
  this.componentComplianceCertification = data;
});

this.service.getComponentGeometry().subscribe(data => {
  this.componentGeometry = data;
});

this.service.getComponentOrientation().subscribe(data => {
  this.componentOrientation = data;
});

this.service.getComponentFluidPhase().subscribe(data => {
  this.componentFluidPhase = data;
});

this.service.getComponentCorrosivity().subscribe(data => {
  this.componentCorrosivity = data;
});

this.service.getComponentProcessEnvironment().subscribe(data => {
  this.componentProcessEnvironment = data;
});

this.service.getComponentToxicMixture().subscribe(data => {
  this.componentToxicMixture = data;
});

this.service.getComponentToxicFluid().subscribe(data => {
  this.componentToxicFluid = data;
});

this.service.getComponentFlammability().subscribe(data => {
  this.componentFlammability = data;
});

this.service.getComponentCriticality().subscribe(data => {
  this.componentCriticality = data;
});

this.service.getComponentSeismicZoneClassification().subscribe(data => {
  this.componentSeismicZoneClassification = data;
});

this.service.getComponentFireExplosionRisk().subscribe(data => {
  this.componentFireExplosionRisk = data;
});

this.service.getComponentToxicRisk().subscribe(data => {
  this.componentToxicRisk = data;
});

this.service.getComponentHeatTreatment().subscribe(data => {
  this.componentHeatTreatment = data;
});

this.service.getComponentHeatTreatmentType().subscribe(data => {
  this.componentHeatTreatmentType = data;
});

this.service.getComponentImpactTest().subscribe(data => {
  this.componentImpactTest = data;
});

this.service.getComponentPressureTest().subscribe(data => {
  this.componentPressureTest = data;
});

this.service.getComponentPressureTestType().subscribe(data => {
  this.componentPressureTestType = data;
});

this.service.getComponentRadiography().subscribe(data => {
  this.componentRadiography = data;
});

this.service.getComponentRadiographyCategory().subscribe(data => {
  this.componentRadiographyCategory = data;
});

this.service.getComponentGeneralMaterial().subscribe(data => {
  this.componentGeneralMaterial = data;
});

this.service.getComponentCladding().subscribe(data => {
  this.componentCladding = data;
});

this.service.getComponentCladdingType().subscribe(data => {
  this.componentCladdingType = data;
});

this.service.getComponentCladdingMaterial().subscribe(data => {
  this.componentCladdingMaterial = data;
});

this.service.getComponentLining().subscribe(data => {
  this.componentLining = data;
});

this.service.getComponentLiningType().subscribe(data => {
  this.componentLiningType = data;
});

this.service.getComponentMaterialCertification().subscribe(data => {
  this.componentMaterialCertification = data;
});

this.service.getComponentExternalCoating().subscribe(data => {
  this.componentExternalCoating = data;
});

this.service.getComponentExternalCoatingType().subscribe(data => {
  this.componentExternalCoatingType = data;
});

this.service.getComponentInsulation().subscribe(data => {
  this.componentInsulation = data;
});

this.service.getComponentInsulationType().subscribe(data => {
  this.componentInsulationType = data;
});

this.service.getComponentInsulationMaterial().subscribe(data => {
  this.componentInsulationMaterial = data;
});

this.service.getComponentCUIPotential().subscribe(data => {
  this.componentCUIPotential = data;
});

this.service.getComponentExternalEnvironment().subscribe(data => {
  this.componentExternalEnvironment = data;
});

this.service.getComponentSupportType().subscribe(data => {
  this.componentSupportType = data;
});

this.service.getComponentHeatTracing().subscribe(data => {
  this.componentHeatTracing = data;
});

this.service.getComponentFireProofing().subscribe(data => {
  this.componentFireProofing = data;
});

this.service.getComponentBuried().subscribe(data => {
  this.componentBuried = data;
});

this.service.getComponentCathodicProtection().subscribe(data => {
  this.componentCathodicProtection = data;
});

this.service.getComponentIsitaDeadleg().subscribe(data => {
  this.componentIsitaDeadleg = data;
});

this.service.getComponentDeadlegCategory().subscribe(data => {
  this.componentDeadlegCategory = data;
});

this.service.getComponentDeadlegCriticality().subscribe(data => {
  this.componentDeadlegCriticality = data;
});

this.service.getComponentPressureReliefDevices().subscribe(data => {
  this.componentPressureReliefDevices = data;
});

this.service.getComponentChemicalInjection().subscribe(data => {
  this.componentChemicalInjection = data;
});

this.service.getComponentDetectionSystem().subscribe(data => {
  this.componentDetectionSystem = data;
});

this.service.getComponentIsolationSystem().subscribe(data => {
  this.componentIsolationSystem = data;
});

this.service.getComponentMitigationSystem().subscribe(data => {
  this.componentMitigationSystem = data;
});

this.service.getComponentOnlineCorrosionMonitoring().subscribe(data => {
  this.componentOnlineCorrosionMonitoring = data;
});

this.service.getComponentCorrosionMonitoringType().subscribe(data => {
  this.componentCorrosionMonitoringType = data;
});

this.service.getComponentHazardClassification().subscribe(data => {
  this.componentHazardClassification = data;
});

this.service.getComponentIncidentHistory().subscribe(data => {
  this.componentIncidentHistory = data;
});

this.service.getComponentCurrentInspectionStrategy().subscribe(data => {
  this.componentCurrentInspectionStrategy = data;
});

this.service.getComponentInspectionAccess().subscribe(data => {
  this.componentInspectionAccess = data;
});

this.service.getComponentScheduledRepairReplacement().subscribe(data => {
  this.componentScheduledRepairReplacement = data;
});

this.service.getComponentRepairReplacementDuringNextShutdown().subscribe(data => {
  this.componentRepairReplacementDuringNextShutdown = data;
});

this.service.getComponentSyncStatus().subscribe(data => {
  this.componentSyncStatus = data;
});

  }
  //accodion functions
  expandAll() {
    this.setAll(true);
  }
  collapseAll() {
    this.setAll(false);
  }
  toggle(section: string) {
    this[section] = !this[section];
  }
  private setAll(state: boolean) {
    this.expand = state;

    this.showGeneral = state;
    this.showLocation = state;
    this.showDesign = state;
    this.showGeometry = state;
    this.showOperation = state;
    this.showFabrication = state;
    this.showMaterial = state;
    this.showExternal = state;
    this.showDeadleg = state;
    this.showSafety = state;
    this.showIntegrity = state;
    this.showInspectionSchedule = state;
    this.showMaintenanceSchedule = state;
    this.showMetadata = state;
    this.showAudit = state;
  }

}
