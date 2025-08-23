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
  alert("1");
    forkJoin({
      componentCategory: this.service.getComponentCategory(),
      componentType: this.service.getComponentType(),
      componentOperationalStatus: this.service.getComponentOperationalStatus(),
      componentDesignCode: this.service.getComponentDesignCode(),
      componentEditionAddendum: this.service.getComponentEditionAddendum(),
      componentComplianceCertification: this.service.getComponentComplianceCertification(),
      componentGeometry: this.service.getComponentGeometry(),
      componentOrientation: this.service.getComponentOrientation(),
      componentFluidPhase: this.service.getComponentFluidPhase(),
      componentCorrosivity: this.service.getComponentCorrosivity(),
      componentProcessEnvironment: this.service.getComponentProcessEnvironment(),
      componentToxicMixture: this.service.getComponentToxicMixture(),
      componentToxicFluid: this.service.getComponentToxicFluid(),
      componentFlammability: this.service.getComponentFlammability(),
      componentCriticality: this.service.getComponentCriticality(),
      componentSeismicZoneClassification: this.service.getComponentSeismicZoneClassification(),
      componentFireExplosionRisk: this.service.getComponentFireExplosionRisk(),
      componentToxicRisk: this.service.getComponentToxicRisk(),
      componentHeatTreatment: this.service.getComponentHeatTreatment(),
      componentHeatTreatmentType: this.service.getComponentHeatTreatmentType(),
      componentImpactTest: this.service.getComponentImpactTest(),
      componentPressureTest: this.service.getComponentPressureTest(),
      componentPressureTestType: this.service.getComponentPressureTestType(),
      componentRadiography: this.service.getComponentRadiography(),
      componentRadiographyCategory: this.service.getComponentRadiographyCategory(),
      componentGeneralMaterial: this.service.getComponentGeneralMaterial(),
      componentCladding: this.service.getComponentCladding(),
      componentCladdingType: this.service.getComponentCladdingType(),
      componentCladdingMaterial: this.service.getComponentCladdingMaterial(),
      componentLining: this.service.getComponentLining(),
      componentLiningType: this.service.getComponentLiningType(),
      componentMaterialCertification: this.service.getComponentMaterialCertification(),
      componentExternalCoating: this.service.getComponentExternalCoating(),
      componentExternalCoatingType: this.service.getComponentExternalCoatingType(),
      componentInsulation: this.service.getComponentInsulation(),
      componentInsulationType: this.service.getComponentInsulationType(),
      componentInsulationMaterial: this.service.getComponentInsulationMaterial(),
      componentCUIPotential: this.service.getComponentCUIPotential(),
      componentExternalEnvironment: this.service.getComponentExternalEnvironment(),
      componentSupportType: this.service.getComponentSupportType(),
      componentHeatTracing: this.service.getComponentHeatTracing(),
      componentFireProofing: this.service.getComponentFireProofing(),
      componentBuried: this.service.getComponentBuried(),
      componentCathodicProtection: this.service.getComponentCathodicProtection(),
      componentIsitaDeadleg: this.service.getComponentIsitaDeadleg(),
      componentDeadlegCategory: this.service.getComponentDeadlegCategory(),
      componentDeadlegCriticality: this.service.getComponentDeadlegCriticality(),
      componentPressureReliefDevices: this.service.getComponentPressureReliefDevices(),
      componentChemicalInjection: this.service.getComponentChemicalInjection(),
      componentDetectionSystem: this.service.getComponentDetectionSystem(),
      componentIsolationSystem: this.service.getComponentIsolationSystem(),
      componentMitigationSystem: this.service.getComponentMitigationSystem(),
      componentOnlineCorrosionMonitoring: this.service.getComponentOnlineCorrosionMonitoring(),
      componentCorrosionMonitoringType: this.service.getComponentCorrosionMonitoringType(),
      componentHazardClassification: this.service.getComponentHazardClassification(),
      componentIncidentHistory: this.service.getComponentIncidentHistory(),
      componentCurrentInspectionStrategy: this.service.getComponentCurrentInspectionStrategy(),
      componentInspectionAccess: this.service.getComponentInspectionAccess(),
      componentScheduledRepairReplacement: this.service.getComponentScheduledRepairReplacement(),
      componentRepairReplacementDuringNextShutdown: this.service.getComponentRepairReplacementDuringNextShutdown(),
      componentSyncStatus: this.service.getComponentSyncStatus()
    }).subscribe(results => {
      this.componentCategory = results.componentCategory;
      this.componentType = results.componentType;
      this.componentOperationalStatus = results.componentOperationalStatus;
      this.componentDesignCode = results.componentDesignCode;
      this.componentEditionAddendum = results.componentEditionAddendum;
      this.componentComplianceCertification = results.componentComplianceCertification;
      this.componentGeometry = results.componentGeometry;
      this.componentOrientation = results.componentOrientation;
      this.componentFluidPhase = results.componentFluidPhase;
      this.componentCorrosivity = results.componentCorrosivity;
      this.componentProcessEnvironment = results.componentProcessEnvironment;
      this.componentToxicMixture = results.componentToxicMixture;
      this.componentToxicFluid = results.componentToxicFluid;
      this.componentFlammability = results.componentFlammability;
      this.componentCriticality = results.componentCriticality;
      this.componentSeismicZoneClassification = results.componentSeismicZoneClassification;
      this.componentFireExplosionRisk = results.componentFireExplosionRisk;
      this.componentToxicRisk = results.componentToxicRisk;
      this.componentHeatTreatment = results.componentHeatTreatment;
      this.componentHeatTreatmentType = results.componentHeatTreatmentType;
      this.componentImpactTest = results.componentImpactTest;
      this.componentPressureTest = results.componentPressureTest;
      this.componentPressureTestType = results.componentPressureTestType;
      this.componentRadiography = results.componentRadiography;
      this.componentRadiographyCategory = results.componentRadiographyCategory;
      this.componentGeneralMaterial = results.componentGeneralMaterial;
      this.componentCladding = results.componentCladding;
      this.componentCladdingType = results.componentCladdingType;
      this.componentCladdingMaterial = results.componentCladdingMaterial;
      this.componentLining = results.componentLining;
      this.componentLiningType = results.componentLiningType;
      this.componentMaterialCertification = results.componentMaterialCertification;
      this.componentExternalCoating = results.componentExternalCoating;
      this.componentExternalCoatingType = results.componentExternalCoatingType;
      this.componentInsulation = results.componentInsulation;
      this.componentInsulationType = results.componentInsulationType;
      this.componentInsulationMaterial = results.componentInsulationMaterial;
      this.componentCUIPotential = results.componentCUIPotential;
      this.componentExternalEnvironment = results.componentExternalEnvironment;
      this.componentSupportType = results.componentSupportType;
      this.componentHeatTracing = results.componentHeatTracing;
      this.componentFireProofing = results.componentFireProofing;
      this.componentBuried = results.componentBuried;
      this.componentCathodicProtection = results.componentCathodicProtection;
      this.componentIsitaDeadleg = results.componentIsitaDeadleg;
      this.componentDeadlegCategory = results.componentDeadlegCategory;
      this.componentDeadlegCriticality = results.componentDeadlegCriticality;
      this.componentPressureReliefDevices = results.componentPressureReliefDevices;
      this.componentChemicalInjection = results.componentChemicalInjection;
      this.componentDetectionSystem = results.componentDetectionSystem;
      this.componentIsolationSystem = results.componentIsolationSystem;
      this.componentMitigationSystem = results.componentMitigationSystem;
      this.componentOnlineCorrosionMonitoring = results.componentOnlineCorrosionMonitoring;
      this.componentCorrosionMonitoringType = results.componentCorrosionMonitoringType;
      this.componentHazardClassification = results.componentHazardClassification;
      this.componentIncidentHistory = results.componentIncidentHistory;
      this.componentCurrentInspectionStrategy = results.componentCurrentInspectionStrategy;
      this.componentInspectionAccess = results.componentInspectionAccess;
      this.componentScheduledRepairReplacement = results.componentScheduledRepairReplacement;
      this.componentRepairReplacementDuringNextShutdown = results.componentRepairReplacementDuringNextShutdown;
      this.componentSyncStatus = results.componentSyncStatus;
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
