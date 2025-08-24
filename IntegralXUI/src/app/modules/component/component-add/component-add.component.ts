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
 ddlplants: any;
ddlareas: any;
ddlunits: any;
ddlsystems: any;
ddlcircuits: any;
ddlcorrosionLoops: any;
ddlequipments: any;
ddlcomponentCategory: any;
ddlcomponentType: any;
ddlcomponentOperationalStatus: any;
ddlcomponentDesignCode: any;
ddlcomponentEditionAddendum: any;
ddlcomponentComplianceCertification: any;
ddlcomponentGeometry: any;
ddlcomponentOrientation: any;
ddlcomponentFluidPhase: any;
ddlcomponentCorrosivity: any;
ddlcomponentProcessEnvironment: any;
ddlcomponentToxicMixture: any;
ddlcomponentToxicFluid: any;
ddlcomponentFlammability: any;
ddlcomponentCriticality: any;
ddlcomponentSeismicZoneClassification: any;
ddlcomponentFireExplosionRisk: any;
ddlcomponentToxicRisk: any;
ddlcomponentHeatTreatment: any;
ddlcomponentHeatTreatmentType: any;
ddlcomponentImpactTest: any;
ddlcomponentPressureTest: any;
ddlcomponentPressureTestType: any;
ddlcomponentRadiography: any;
ddlcomponentRadiographyCategory: any;
ddlcomponentGeneralMaterial: any;
ddlcomponentCladding: any;
ddlcomponentCladdingType: any;
ddlcomponentCladdingMaterial: any;
ddlcomponentLining: any;
ddlcomponentLiningType: any;
ddlcomponentMaterialCertification: any;
ddlcomponentExternalCoating: any;
ddlcomponentExternalCoatingType: any;
ddlcomponentInsulation: any;
ddlcomponentInsulationType: any;
ddlcomponentInsulationMaterial: any;
ddlcomponentCUIPotential: any;
ddlcomponentExternalEnvironment: any;
ddlcomponentSupportType: any;
ddlcomponentHeatTracing: any;
ddlcomponentFireProofing: any;
ddlcomponentBuried: any;
ddlcomponentCathodicProtection: any;
ddlcomponentIsitaDeadleg: any;
ddlcomponentDeadlegCategory: any;
ddlcomponentDeadlegCriticality: any;
ddlcomponentPressureReliefDevices: any;
ddlcomponentChemicalInjection: any;
ddlcomponentDetectionSystem: any;
ddlcomponentIsolationSystem: any;
ddlcomponentMitigationSystem: any;
ddlcomponentOnlineCorrosionMonitoring: any;
ddlcomponentCorrosionMonitoringType: any;
ddlcomponentHazardClassification: any;
ddlcomponentIncidentHistory: any;
ddlcomponentCurrentInspectionStrategy: any;
ddlcomponentInspectionAccess: any;
ddlcomponentScheduledRepairReplacement: any;
ddlcomponentRepairReplacementDuringNextShutdown: any;
ddlcomponentSyncStatus: any;

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

     this.componentForm = this.fb.group({
      // Identification
      id: [null],
      clientId: [this.au.getClientId()],
      componentId: [null,Validators.required],
      componentDescription: [null,Validators.required],
      componentCategory: [''],
      componentType: [null],

      // Dates
      commissioningDate: [null],
      builtDate: [null],
      operationalStatus: [null],

      // Location
      plantId: [null,Validators.required],
      areaId: [null],
      unitId: [null],
      systemId: [null],
      circuitId: [null],
      corrosionLoopId: [null],
      equipmentId: [null],
      specificLocation: [''],
      equipmentFrom: [''],
      equipmentTo: [''],
      pfd: [''],
      pAndId: [''],
      gaDrawing: [''],

      // Design
      designCode: [null],
      editionAndAddendum: [null],
      designPressureInternal: [null],
      designPressureExternal: [null],
      designTemperatureMax: [null],
      designTemperatureMDMT: [null],
      mawp: [null],
      designLife: [null],
      primaryProducts: [''],
      marginPerDay: [null],
      complianceCertification: [null],
      governingRegulatoryBody: [''],

      // Geometry
      geometry: [null],
      nps: [null],
      insideDiameter: [null],
      outsideDiameter: [null],
      lengthHeight: [null],
      fillHeight: [null],
      orientation: [null],
      emptyWeight: [null],
      capacity: [null],

      // Operating Conditions
      operatingPressureMax: [null],
      operatingPressureAvg: [null],
      operatingTempMax: [null],
      operatingTempMin: [null],
      processFluid: [''],
      fluidComposition: [''],
      fluidPhase: [null],
      inventoryVolume: [null],
      density: [null],
      viscosity: [null],
      specificGravity: [null],
      flowRate: [null],
      velocity: [null],
      corrosivity: [null],
      ph: [null],
      processEnvironment: [null],
      toxicMixture: [null],
      toxicFluid: [null],
      flammability: [null],
      operatingWeight: [null],
      criticality: [null],
      humidityLevel: [null],
      seismicZoneClassification: [null],
      fireAndExplosionRisk: [null],
      toxicRisk: [null],
      totalPopulation: [null],
      populationDensity: [null],

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
      allowableStress: [null],
      nominalThickness: [null],
      corrosionAllowance: [null],
      cladding: [null],
      claddingType: [null],
      claddingMaterial: [null],
      claddingThickness: [null],
      lining: [null],
      liningType: [null],
      materialCertification: [null],

      externalCoating: [null],
      externalCoatingType: [null],
      externalCoatingThickness: [null],
      externalCoatingAge: [null],
      insulation: [null],
      insulationType: [null],
      insulationMaterial: [null],
      insulationThickness: [''],
      cuiPotential: [null],
      externalEnvironment: [null],
      supportType: [null],
      heatTracing: [null],
      fireProofing: [null],
      buried: [null],
      cathodicProtection: [null],

      isDeadleg: [null],
      deadlegId: [''],
      deadlegDescription: [''],
      deadlegCategory: [null],
      deadlegCriticality: [null],

      pressureReliefDevices: [null],
      prdId: [''],
      prdSetPressure: [null],
      chemicalInjection: [null],
      detectionSystem: [null],
      isolationSystem: [null],
      mitigationSystem: [null],
      onlineCorrosionMonitoring: [null],
      corrosionMonitoringType: [null],
      hazardClassification: [null],
      safetyEnvironmentalPermits: [''],
      incidentHistory: [null],

      currentInspectionStrategy: [null],
      damageMechanisms: [''],
      shutdownFrequency: [null],
      lastMajorShutdownDate: [''],
      nextMajorShutdownDate: [''],
      subsequentMajorShutdownDate: [''],
      mtbf: [null],
      mttr: [null],
      cmlDrawingId: [''],
      inspectionAccess: [null],
      inspectionSupervisor: [''],
      inspector: [''],

      internalInspection: [''],
      externalInspection: [''],
      onStreamInspection: [''],
      tmInspection: [''],

      prevInternalInspection: [''],
      prevExternalInspection: [''],
      prevOnStreamInspection: [''],
      prevTmInspection: [''],

      scheduledRepairReplacement: [null],
      scheduledRepairReplacementDate: [''],
      repairReplacementDuringNextShutdown: [null],

      erpCircuitCode: [''],
      erpSystem: [''],
      functionalLocation: [''],
      externalSystemId: [''],
      syncStatus: [null],
      // Meta
      addedBy: [null],
      addedOn: [null],
      modifiedBy: [null],
      modifiedOn: [null],
      isDeleted: [false],
      isActive: [true]
    });

  }
  
  ngOnInit() {
    this.componentForm.get('plantId')?.valueChanges.subscribe((plantId) => {
      alert();
      this.componentForm.get('name')?.updateValueAndValidity();
      if (plantId) {
        this.loadAreasByPlant(plantId);
        this.loadUnits(plantId, 0);
        this.loadSystems(plantId, 0, 0);
        this.loadCircuits(plantId, 0, 0, 0);

      } else {
        this.ddlareas = [];
        this.ddlunits = [];
        this.ddlsystems = [];
        this.ddlcircuits = []; // Reset area list if no plant is selected
      }
    });
    this.componentForm.get('areaId')?.valueChanges.subscribe((areaId) => {

      this.componentForm.get('name')?.updateValueAndValidity();
      if (areaId) {

        this.loadUnits(this.componentForm.get('plantId').value, areaId);
        this.loadSystems(this.componentForm.get('plantId').value, areaId, 0);
        this.loadCircuits(this.componentForm.get('plantId').value, areaId, 0, 0);
                this.loadSystems(this.componentForm.get('plantId').value, 0, 0);
        this.loadCircuits(this.componentForm.get('plantId').value, 0, 0, 0);
        this.loadcorrosionLoop(this.componentForm.get('plantId').value,0, 0,0,0);
        this.loadEquipment(this.componentForm.get('plantId').value, 0, 0, 0,0,0, 0);

      } else {

        this.ddlunits = [];
        this.ddlsystems = [];
        this.ddlcircuits = []; // Reset area list if no plant is selected
      }
    });
    this.componentForm.get('unitId')?.valueChanges.subscribe((unitId) => {

      this.componentForm.get('name')?.updateValueAndValidity();
      if (unitId) {

        this.loadSystems(this.componentForm.get('plantId').value, this.componentForm.get('areaId').value, unitId);
        this.loadCircuits(this.componentForm.get('plantId').value, this.componentForm.get('areaId').value, unitId, 0);
        this.loadcorrosionLoop(this.componentForm.get('plantId').value, this.componentForm.get('areaId').value, 0,0,0);
        this.loadEquipment(this.componentForm.get('plantId').value, this.componentForm.get('areaId').value, 0, 0,0, 0,0);

      } else {

        this.ddlsystems = []; // Reset area list if no plant is selected
        this.ddlcircuits = [];
      }
    });
    this.componentForm.get('systemId')?.valueChanges.subscribe((systemId) => {

      this.componentForm.get('name')?.updateValueAndValidity();
      if (systemId) {

        this.loadCircuits(this.componentForm.get('plantId').value, this.componentForm.get('areaId').value, this.componentForm.get('unitId').value, systemId);
           this.loadcorrosionLoop(this.componentForm.get('plantId').value, this.componentForm.get('areaId').value, this.componentForm.get('unitId').value,0,0);
        this.loadEquipment(this.componentForm.get('plantId').value, this.componentForm.get('areaId').value, this.componentForm.get('unitId').value, 0,0, 0,0);


      } else {

        this.ddlcircuits = []; // Reset area list if no plant is selected
      }
    });

     this.componentForm.get('circuitId')?.valueChanges.subscribe((circuitId) => {

      this.componentForm.get('name')?.updateValueAndValidity();
      if (circuitId) {

        this.loadcorrosionLoop(this.componentForm.get('plantId').value, this.componentForm.get('areaId').value, this.componentForm.get('unitId').value,this.componentForm.get('systemId').value, circuitId);
        this.loadEquipment(this.componentForm.get('plantId').value, this.componentForm.get('areaId').value, this.componentForm.get('unitId').value, this.componentForm.get('systemId').value, this.componentForm.get('circuitId').value, 0,0);

      } else {

        this.ddlcircuits = []; // Reset area list if no plant is selected
      }
    });

     this.componentForm.get('corrosionLoopId')?.valueChanges.subscribe((corrosionLoopId) => {

      this.componentForm.get('name')?.updateValueAndValidity();
      if (corrosionLoopId) {

        this.loadEquipment(this.componentForm.get('plantId').value, this.componentForm.get('areaId').value, this.componentForm.get('unitId').value, this.componentForm.get('systemId').value, this.componentForm.get('circuitId').value, corrosionLoopId,0);

      } else {

        this.ddlcircuits = []; // Reset area list if no plant is selected
      }
    });

    this.componentForm.get('areaId')?.valueChanges.subscribe(() => {
      this.componentForm.get('name')?.updateValueAndValidity();
    });
    this.componentForm.get('unitId')?.valueChanges.subscribe(() => {
      this.componentForm.get('name')?.updateValueAndValidity();
    });
    this.componentForm.get('unitId')?.valueChanges.subscribe(() => {
      this.componentForm.get('name')?.updateValueAndValidity();
    });
    this.componentForm.get('systemId')?.valueChanges.subscribe(() => {
      this.componentForm.get('name')?.updateValueAndValidity();
    });
    this.componentForm.get('circuitId')?.valueChanges.subscribe(() => {
      this.componentForm.get('name')?.updateValueAndValidity();
    });
       this.componentForm.get('corrosionLoopId')?.valueChanges.subscribe(() => {
      this.componentForm.get('name')?.updateValueAndValidity();
    });
      this.componentForm.get('equipmentId')?.valueChanges.subscribe(() => {
      this.componentForm.get('name')?.updateValueAndValidity();
    });

     this.loadDropdowns();

 
  }


  loadAreasByPlant(plantId: number) {

    this.service.getArea(plantId).subscribe((data: any[]) => {
      this.ddlareas = data;
    });
  }
  loadUnits(plantId: number, areaId: number) {

    this.service.getUnits(plantId, areaId).subscribe((data: any[]) => {
      this.ddlunits = data;
    });
  }
  loadSystems(plantId: number, areaId: number, unitId: number) {

    this.service.getSystems(plantId, areaId, unitId).subscribe((data: any[]) => {
      this.ddlsystems = data;
    });
  }

  loadCircuits(plantId: number, areaId: number, unitId: number, systemId: number) {

    this.service.getCircuits(plantId, areaId, unitId, systemId).subscribe((data: any[]) => {
      this.ddlcircuits = data;
    });
  }
  
  loadcorrosionLoop(plantId: number, areaId: number, unitId: number, systemId: number,corrosionLoopId: number) {

    this.service.getCorrosionLoop(plantId, areaId, unitId, systemId,corrosionLoopId).subscribe((data: any[]) => {
      this.ddlcorrosionLoops = data;
    });
  }
  
  loadEquipment(plantId: number, areaId: number, unitId: number, systemId: number,circuitId :number,corrosionLoopId: number,equipmentId: number ) {

    this.service.getEquipment(plantId, areaId, unitId, systemId,corrosionLoopId,circuitId,equipmentId).subscribe((data: any[]) => {
      this.ddlequipments = data;
    });
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
 formData.append('clientId', this.au.getClientId().toString());
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

 
  forkJoin({
    ddlplants : this.service.getPlants(),
ddlcomponentCategory: this.service.getComponentCategory(),
ddlcomponentType: this.service.getComponentType(),
ddlcomponentOperationalStatus: this.service.getComponentOperationalStatus(),
ddlcomponentDesignCode: this.service.getComponentDesignCode(),
ddlcomponentEditionAddendum: this.service.getComponentEditionAddendum(),
ddlcomponentComplianceCertification: this.service.getComponentComplianceCertification(),
ddlcomponentGeometry: this.service.getComponentGeometry(),
ddlcomponentOrientation: this.service.getComponentOrientation(),
ddlcomponentFluidPhase: this.service.getComponentFluidPhase(),
ddlcomponentCorrosivity: this.service.getComponentCorrosivity(),
ddlcomponentProcessEnvironment: this.service.getComponentProcessEnvironment(),
ddlcomponentToxicMixture: this.service.getComponentToxicMixture(),
ddlcomponentToxicFluid: this.service.getComponentToxicFluid(),
ddlcomponentFlammability: this.service.getComponentFlammability(),
ddlcomponentCriticality: this.service.getComponentCriticality(),
ddlcomponentSeismicZoneClassification: this.service.getComponentSeismicZoneClassification(),
ddlcomponentFireExplosionRisk: this.service.getComponentFireExplosionRisk(),
ddlcomponentToxicRisk: this.service.getComponentToxicRisk(),
ddlcomponentHeatTreatment: this.service.getComponentHeatTreatment(),
ddlcomponentHeatTreatmentType: this.service.getComponentHeatTreatmentType(),
ddlcomponentImpactTest: this.service.getComponentImpactTest(),
ddlcomponentPressureTest: this.service.getComponentPressureTest(),
ddlcomponentPressureTestType: this.service.getComponentPressureTestType(),
ddlcomponentRadiography: this.service.getComponentRadiography(),
ddlcomponentRadiographyCategory: this.service.getComponentRadiographyCategory(),
ddlcomponentGeneralMaterial: this.service.getComponentGeneralMaterial(),
ddlcomponentCladding: this.service.getComponentCladding(),
ddlcomponentCladdingType: this.service.getComponentCladdingType(),
ddlcomponentCladdingMaterial: this.service.getComponentCladdingMaterial(),
ddlcomponentLining: this.service.getComponentLining(),
ddlcomponentLiningType: this.service.getComponentLiningType(),
ddlcomponentMaterialCertification: this.service.getComponentMaterialCertification(),
ddlcomponentExternalCoating: this.service.getComponentExternalCoating(),
ddlcomponentExternalCoatingType: this.service.getComponentExternalCoatingType(),
ddlcomponentInsulation: this.service.getComponentInsulation(),
ddlcomponentInsulationType: this.service.getComponentInsulationType(),
ddlcomponentInsulationMaterial: this.service.getComponentInsulationMaterial(),
ddlcomponentCUIPotential: this.service.getComponentCUIPotential(),
ddlcomponentExternalEnvironment: this.service.getComponentExternalEnvironment(),
ddlcomponentSupportType: this.service.getComponentSupportType(),
ddlcomponentHeatTracing: this.service.getComponentHeatTracing(),
ddlcomponentFireProofing: this.service.getComponentFireProofing(),
ddlcomponentBuried: this.service.getComponentBuried(),
ddlcomponentCathodicProtection: this.service.getComponentCathodicProtection(),
ddlcomponentIsitaDeadleg: this.service.getComponentIsitaDeadleg(),
ddlcomponentDeadlegCategory: this.service.getComponentDeadlegCategory(),
ddlcomponentDeadlegCriticality: this.service.getComponentDeadlegCriticality(),
ddlcomponentPressureReliefDevices: this.service.getComponentPressureReliefDevices(),
ddlcomponentChemicalInjection: this.service.getComponentChemicalInjection(),
ddlcomponentDetectionSystem: this.service.getComponentDetectionSystem(),
ddlcomponentIsolationSystem: this.service.getComponentIsolationSystem(),
ddlcomponentMitigationSystem: this.service.getComponentMitigationSystem(),
ddlcomponentOnlineCorrosionMonitoring: this.service.getComponentOnlineCorrosionMonitoring(),
ddlcomponentCorrosionMonitoringType: this.service.getComponentCorrosionMonitoringType(),
ddlcomponentHazardClassification: this.service.getComponentHazardClassification(),
ddlcomponentIncidentHistory: this.service.getComponentIncidentHistory(),
ddlcomponentCurrentInspectionStrategy: this.service.getComponentCurrentInspectionStrategy(),
ddlcomponentInspectionAccess: this.service.getComponentInspectionAccess(),
ddlcomponentScheduledRepairReplacement: this.service.getComponentScheduledRepairReplacement(),
ddlcomponentRepairReplacementDuringNextShutdown: this.service.getComponentRepairReplacementDuringNextShutdown(),
ddlcomponentSyncStatus: this.service.getComponentSyncStatus()
}).subscribe(results => {
this.ddlplants = results.ddlplants;
this.ddlcomponentCategory = results.ddlcomponentCategory;
this.ddlcomponentType = results.ddlcomponentType;
this.ddlcomponentOperationalStatus = results.ddlcomponentOperationalStatus;
this.ddlcomponentDesignCode = results.ddlcomponentDesignCode;
this.ddlcomponentEditionAddendum = results.ddlcomponentEditionAddendum;
this.ddlcomponentComplianceCertification = results.ddlcomponentComplianceCertification;
this.ddlcomponentGeometry = results.ddlcomponentGeometry;
this.ddlcomponentOrientation = results.ddlcomponentOrientation;
this.ddlcomponentFluidPhase = results.ddlcomponentFluidPhase;
this.ddlcomponentCorrosivity = results.ddlcomponentCorrosivity;
this.ddlcomponentProcessEnvironment = results.ddlcomponentProcessEnvironment;
this.ddlcomponentToxicMixture = results.ddlcomponentToxicMixture;
this.ddlcomponentToxicFluid = results.ddlcomponentToxicFluid;
this.ddlcomponentFlammability = results.ddlcomponentFlammability;
this.ddlcomponentCriticality = results.ddlcomponentCriticality;
this.ddlcomponentSeismicZoneClassification = results.ddlcomponentSeismicZoneClassification;
this.ddlcomponentFireExplosionRisk = results.ddlcomponentFireExplosionRisk;
this.ddlcomponentToxicRisk = results.ddlcomponentToxicRisk;
this.ddlcomponentHeatTreatment = results.ddlcomponentHeatTreatment;
this.ddlcomponentHeatTreatmentType = results.ddlcomponentHeatTreatmentType;
this.ddlcomponentImpactTest = results.ddlcomponentImpactTest;
this.ddlcomponentPressureTest = results.ddlcomponentPressureTest;
this.ddlcomponentPressureTestType = results.ddlcomponentPressureTestType;
this.ddlcomponentRadiography = results.ddlcomponentRadiography;
this.ddlcomponentRadiographyCategory = results.ddlcomponentRadiographyCategory;
this.ddlcomponentGeneralMaterial = results.ddlcomponentGeneralMaterial;
this.ddlcomponentCladding = results.ddlcomponentCladding;
this.ddlcomponentCladdingType = results.ddlcomponentCladdingType;
this.ddlcomponentCladdingMaterial = results.ddlcomponentCladdingMaterial;
this.ddlcomponentLining = results.ddlcomponentLining;
this.ddlcomponentLiningType = results.ddlcomponentLiningType;
this.ddlcomponentMaterialCertification = results.ddlcomponentMaterialCertification;
this.ddlcomponentExternalCoating = results.ddlcomponentExternalCoating;
this.ddlcomponentExternalCoatingType = results.ddlcomponentExternalCoatingType;
this.ddlcomponentInsulation = results.ddlcomponentInsulation;
this.ddlcomponentInsulationType = results.ddlcomponentInsulationType;
this.ddlcomponentInsulationMaterial = results.ddlcomponentInsulationMaterial;
this.ddlcomponentCUIPotential = results.ddlcomponentCUIPotential;
this.ddlcomponentExternalEnvironment = results.ddlcomponentExternalEnvironment;
this.ddlcomponentSupportType = results.ddlcomponentSupportType;
this.ddlcomponentHeatTracing = results.ddlcomponentHeatTracing;
this.ddlcomponentFireProofing = results.ddlcomponentFireProofing;
this.ddlcomponentBuried = results.ddlcomponentBuried;
this.ddlcomponentCathodicProtection = results.ddlcomponentCathodicProtection;
this.ddlcomponentIsitaDeadleg = results.ddlcomponentIsitaDeadleg;
this.ddlcomponentDeadlegCategory = results.ddlcomponentDeadlegCategory;
this.ddlcomponentDeadlegCriticality = results.ddlcomponentDeadlegCriticality;
this.ddlcomponentPressureReliefDevices = results.ddlcomponentPressureReliefDevices;
this.ddlcomponentChemicalInjection = results.ddlcomponentChemicalInjection;
this.ddlcomponentDetectionSystem = results.ddlcomponentDetectionSystem;
this.ddlcomponentIsolationSystem = results.ddlcomponentIsolationSystem;
this.ddlcomponentMitigationSystem = results.ddlcomponentMitigationSystem;
this.ddlcomponentOnlineCorrosionMonitoring = results.ddlcomponentOnlineCorrosionMonitoring;
this.ddlcomponentCorrosionMonitoringType = results.ddlcomponentCorrosionMonitoringType;
this.ddlcomponentHazardClassification = results.ddlcomponentHazardClassification;
this.ddlcomponentIncidentHistory = results.ddlcomponentIncidentHistory;
this.ddlcomponentCurrentInspectionStrategy = results.ddlcomponentCurrentInspectionStrategy;
this.ddlcomponentInspectionAccess = results.ddlcomponentInspectionAccess;
this.ddlcomponentScheduledRepairReplacement = results.ddlcomponentScheduledRepairReplacement;
this.ddlcomponentRepairReplacementDuringNextShutdown = results.ddlcomponentRepairReplacementDuringNextShutdown;
this.ddlcomponentSyncStatus = results.ddlcomponentSyncStatus;
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
