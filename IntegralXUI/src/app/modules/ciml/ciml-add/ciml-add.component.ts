import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CimlService } from 'src/app/services/ciml/ciml.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ciml-add',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './ciml-add.component.html',
  styleUrl: './ciml-add.component.scss'
})
export class CimlAddComponent {



 // Accordion state variables
  expand = false;
  showGeneral = true;
  showLocation = false;
  showDesign = false;
  showGeometry = false;
  showOperationProcess = false;
  showFabrication = false;
  showMaterial = false;
  showExternal = false;
  showDeadleg = false;
  showSafetyProcessControl = false;
  showIntegrityInspection = false;
  showEquipmentInspectionSchedule = false;
  showMaintenanceSchedule = false;
  showIntegrationMetadata = false;
  showRecordAuditInformation = false;
  showMinimumRequiredThickness = false;
  showRequiredInspectionMethode = false;
  showCR = false;
  showRL = false;
  showInspectionInterval = false;
  showThicknessInspectionSchedule = false;
  showInspectionAccess = false;


  
    canAdd: boolean = false;
    cimlForm!: FormGroup;
  
    documentPreviews: File[] = [];
   ddlplants: any;
  ddlareas: any;
  ddlunits: any;
  ddlsystems: any;
  ddlcircuits: any;
  ddlcorrosionLoops: any;
  ddlequipments: any;
  ddlcomponents: any;
   categories: any;
   types: any;
   operationalStatus: any;
   designCodes: any;
   editions: any;
   certifications: any;
   geometryOptions: any;
   orientationOptions: any;
   fluidPhases: any;
   corrosivityOptions: any;
   processEnvironments: any;
   toxicMixtures: any;
   toxicFluids: any;
   flammabilityOptions: any;
   criticalityOptions: any;
   seismicZones: any;
   fireExplosionRisks: any;
   toxicRisks: any;
   heatTreatments: any;
   heatTreatmentTypes: any;
   impactTests: any;
   pressureTests: any;
   pressureTestTypes: any;
   radiographies: any;
   radiographyCategories: any;
   generalMaterials: any;
   claddingOptions: any;
   claddingTypes: any;
   claddingMaterials: any;
   liningOptions: any;
   liningTypes: any;
   materialCertifications: any;
   externalCoatings: any;
   externalCoatingTypes: any;
   insulationOptions: any;
   insulationTypes: any;
   insulationMaterials: any;
   cuiPotentials: any;
   externalEnvironments: any;
   supportTypes: any;
   heatTracings: any;
   fireProofings: any;
   buriedOptions: any;
   accessibilityOptions: any;
   cathodicProtections: any;
   deadlegOptions: any;
   deadlegCategories: any;
   deadlegCriticalities: any;
   pressureReliefDevicesOptions: any;
   chemicalInjectionOptions: any;
   detectionSystemOptions: any;
   isolationSystemOptions: any;
   mitigationSystemOptions: any;
   onlineCorrosionMonitoringOptions: any;
   corrosionMonitoringTypes: any;
   soilToAirInterfaces: any;
   hazardClassifications: any;
   incidentHistories: any;
   inspectionStrategies: any;
   injectionPoints: any;
   inspectionAccessOptions: any;
   repairReplacementOptions: any;
   nextShutdownOptions: any;
   syncStatusOptions: any; 
   internalEntryOptions: any;  
   accessTypeOptions: any;  
   insulationRemovalRequired: any;

  

  constructor(private service: CimlService, private fb: FormBuilder, private au: AuthService, private router: Router) {
    debugger;  
    this.canAdd = (this.au.getCanAdd());
  
     this.cimlForm = this.fb.group({
      id: [null],
      clientId: [this.au.getClientId()],
      cml_Id: ['', Validators.required],
      cml_Description: ['', Validators.required],
      cml_Category: ['', Validators.required],
      cml_Type: [''],
      commissioningDate: [''],
      builtDate: [''],
      operationalStatus: [''],
      plantId: ['',Validators.required],
      areaId: [''],
      unitId: [''],
      systemId: [''],
      circuitId: [''],
      corrosionLoopId: [''],
      equipmentId: [''],
      componentId: [''],
      specificLocation: [''],
      equipmentFrom: [''],
      equipmentTo: [''],
      pfd: [''],
      pid: [''],
      gaDrawing: [''],
      designCode: [''],
      editionAndAddendum: [''],
      designPressureInternal: [''],
      designPressureExternal: [''],
      designTemperatureMax: [''],
      designTemperatureMDMT: [''],
      mawp: [''],
      designLife: [''],
      primaryProducts: [''],
      marginPerDay: [''],
      complianceCertification: [''],
      governingRegulatoryBody: [''],
      geometry: [''],
      nps: [''],
      insideDiameter: [''],
      outsideDiameter: [''],
      lengthHeight: [''],
      fillHeight: [''],
      orientation: [''],
      emptyWeight: [''],
      capacity: [''],
      operatingPressureMax: [''],
      operatingPressureAvg: [''],
      operatingTempMax: [''],
      operatingTempMin: [''],
      processFluid: [''],
      fluidComposition: [''],
      fluidPhase: [''],
      inventoryVolume: [''],
      density: [''],
      viscosity: [''],
      specificGravity: [''],
      flowRate: [''],
      velocity: [''],
      corrosivity: [''],
      ph: [''],
      processEnvironment: [''],
      toxicMixture: [''],
      toxicFluid: [''],
      flammability: [''],
      operatingWeight: [''],
      criticality: [''],
      humidityLevel: [''],
      seismicZoneClassification: [''],
      fireExplosionRisk: [''],
      toxicRisk: [''],
      totalPopulation: [''],
      populationDensity: [''],
      manufacturer: [''],
      serialNumber: [''],
      warrantyDate: [''],
      heatTreatment: [''],
      heatTreatmentType: [''],
      impactTest: [''],
      pressureTest: [''],
      pressureTestType: [''],
      testPressure: [''],
      radiography: [''],
      radiographyCategory: [''],
      jointEfficiency: [''],
      otherNDE: [''],
      generalMaterial: [''],
      materialSpecification: [''],
      allowableStress: [''],
      nominalThickness: [''],
      corrosionAllowance: [''],
      cladding: [''],
      claddingType: [''],
      claddingMaterial: [''],
      claddingThickness: [''],
      lining: [''],
      liningType: [''],
      materialCertification: [''],
      externalCoating: [''],
      externalCoatingType: [''],
      externalCoatingThickness: [''],
      externalCoatingAge: [''],
      insulation: [''],
      insulationType: [''],
      insulationMaterial: [''],
      insulationThickness: [''],
      cuiPotential: [''],
      externalEnvironment: [''],
      supportType: [''],
      heatTracing: [''],
      fireProofing: [''],
      buried: [''],
      cathodicProtection: [''],
      isDeadleg: [''],
      deadlegId: [''],
      deadlegDescription: [''],
      deadlegCategory: [''],
      deadlegCriticality: [''],
      injectionPoint: [''],
      soilToAirInterface: [''],
      pressureReliefDevices: [''],
      prd_Id: [''],
      prd_SetPressure: [''],
      chemicalInjection: [''],
      detectionSystem: [''],
      isolationSystem: [''],
      mitigationSystem: [''],
      onlineCorrosionMonitoring: [''],
      corrosionMonitoringType: [''],
      hazardClassification: [''],
      safetyEnvironmentalPermits: [''],
      incidentHistory: [''],
      currentInspectionStrategy: [''],
      damageMechanisms: [''],
      shutdownTurnaroundFrequency: [''],
      lastMajorShutdownDate: [''],
      nextMajorShutdownDate: [''],
      subsequentMajorShutdownDate: [''],
      meanTimeBetweenFailures: [''],
      meanTimeToRepair: [''],
      cmlDrawingId: [''],
      inspectionSupervisor: [''],
      inspector: [''],
      internalInspection: [''],
      externalInspection: [''],
      onStreamInspection: [''],
      tmInspection: [''],
      prevInternalInspection: [''],
      prevExternalInspection: [''],
      prevOnStreamInspection: [''],
      prevTMInspection: [''],
      scheduledRepairReplacement: [''],
      scheduledRepairReplacementDate: [''],
      repairReplacementDuringNextShutdown: [''],
      erpCmmsCircuitCode: [''],
      erpCmmsSystem: [''],
      functionalLocation: [''],
      externalSystemId: [''],
      syncStatus: [''],
      addedBy: [''],
      addedOn: [''],
      modifiedBy: [''],
      modifiedOn: [''],
      isDeleted: [''],
      isActive: [''],
      nominalThicknessCA: [''],
      defaultMinimumThickness: [''],
      structuralMinimumThk: [''],
      calculatedInternalPressure: [''],
      calculatedExternalPressure: [''],
      maxStructuralCalculated: [''],
      maximumOfAbove: [''],
      manual: [''],
      selectedMinReqThk: [''],
      cvi: [''],
      utg: [''],
      uts: [''],
      rt: [''],
      prt: [''],
      mfl: [''],
      pec: [''],
      other: [''],
      ltcr: [''],
      stcr: [''],
      maxAbove2: [''],
      designCR: [''],
      minOrDefaultCR: [''],
      crForRL: [''],
      calculatedRemainingLife: [''],
      maxRemainingLife: [''],
      minAbove2: [''],
      remainingLife: [''],
      perAPI: [''],
      halfRemainingLife: [''],
      minAbove2Interval: [''],
      defaultMinimumInterval: [''],
      manualEntry: [''],
      selectedInspectionInterval: [''],
      accessible: [''],
      accessType: [''],
      internalEntry: [''],
      insulationRemovalRequired: ['']
    });
  }
  
  
  ngOnInit() {
    this.cimlForm.get('plantId')?.valueChanges.subscribe((plantId) => {
      alert();
      this.cimlForm.get('name')?.updateValueAndValidity();
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
    this.cimlForm.get('areaId')?.valueChanges.subscribe((areaId) => {

      this.cimlForm.get('name')?.updateValueAndValidity();
      if (areaId) {

        this.loadUnits(this.cimlForm.get('plantId').value, areaId);
        this.loadSystems(this.cimlForm.get('plantId').value, areaId, 0);
        this.loadCircuits(this.cimlForm.get('plantId').value, areaId, 0, 0);
                this.loadSystems(this.cimlForm.get('plantId').value, 0, 0);
        this.loadCircuits(this.cimlForm.get('plantId').value, 0, 0, 0);
        this.loadcorrosionLoop(this.cimlForm.get('plantId').value,0, 0,0,0);
        this.loadEquipment(this.cimlForm.get('plantId').value, 0, 0, 0,0,0, 0);

      } else {

        this.ddlunits = [];
        this.ddlsystems = [];
        this.ddlcircuits = []; // Reset area list if no plant is selected
      }
    });
    this.cimlForm.get('unitId')?.valueChanges.subscribe((unitId) => {

      this.cimlForm.get('name')?.updateValueAndValidity();
      if (unitId) {

        this.loadSystems(this.cimlForm.get('plantId').value, this.cimlForm.get('areaId').value, unitId);
        this.loadCircuits(this.cimlForm.get('plantId').value, this.cimlForm.get('areaId').value, unitId, 0);
        this.loadcorrosionLoop(this.cimlForm.get('plantId').value, this.cimlForm.get('areaId').value, 0,0,0);
        this.loadEquipment(this.cimlForm.get('plantId').value, this.cimlForm.get('areaId').value, 0, 0,0, 0,0);

      } else {

        this.ddlsystems = []; // Reset area list if no plant is selected
        this.ddlcircuits = [];
      }
    });
    this.cimlForm.get('systemId')?.valueChanges.subscribe((systemId) => {

      this.cimlForm.get('name')?.updateValueAndValidity();
      if (systemId) {

        this.loadCircuits(this.cimlForm.get('plantId').value, this.cimlForm.get('areaId').value, this.cimlForm.get('unitId').value, systemId);
           this.loadcorrosionLoop(this.cimlForm.get('plantId').value, this.cimlForm.get('areaId').value, this.cimlForm.get('unitId').value,0,0);
        this.loadEquipment(this.cimlForm.get('plantId').value, this.cimlForm.get('areaId').value, this.cimlForm.get('unitId').value, 0,0, 0,0);


      } else {

        this.ddlcircuits = []; // Reset area list if no plant is selected
      }
    });

     this.cimlForm.get('circuitId')?.valueChanges.subscribe((circuitId) => {

      this.cimlForm.get('name')?.updateValueAndValidity();
      if (circuitId) {

        this.loadcorrosionLoop(this.cimlForm.get('plantId').value, this.cimlForm.get('areaId').value, this.cimlForm.get('unitId').value,this.cimlForm.get('systemId').value, circuitId);
        this.loadEquipment(this.cimlForm.get('plantId').value, this.cimlForm.get('areaId').value, this.cimlForm.get('unitId').value, this.cimlForm.get('systemId').value, this.cimlForm.get('circuitId').value, 0,0);

      } else {

        this.ddlcircuits = []; // Reset area list if no plant is selected
      }
    });

     this.cimlForm.get('corrosionLoopId')?.valueChanges.subscribe((corrosionLoopId) => {

      this.cimlForm.get('name')?.updateValueAndValidity();
      if (corrosionLoopId) {

        this.loadEquipment(this.cimlForm.get('plantId').value, this.cimlForm.get('areaId').value, this.cimlForm.get('unitId').value, this.cimlForm.get('systemId').value, this.cimlForm.get('circuitId').value, corrosionLoopId,0);

      } else {

        this.ddlcircuits = []; // Reset area list if no plant is selected
      }
    });

    this.cimlForm.get('areaId')?.valueChanges.subscribe(() => {
      this.cimlForm.get('name')?.updateValueAndValidity();
    });
    this.cimlForm.get('unitId')?.valueChanges.subscribe(() => {
      this.cimlForm.get('name')?.updateValueAndValidity();
    });
    this.cimlForm.get('unitId')?.valueChanges.subscribe(() => {
      this.cimlForm.get('name')?.updateValueAndValidity();
    });
    this.cimlForm.get('systemId')?.valueChanges.subscribe(() => {
      this.cimlForm.get('name')?.updateValueAndValidity();
    });
    this.cimlForm.get('circuitId')?.valueChanges.subscribe(() => {
      this.cimlForm.get('name')?.updateValueAndValidity();
    });
       this.cimlForm.get('corrosionLoopId')?.valueChanges.subscribe(() => {
      this.cimlForm.get('name')?.updateValueAndValidity();
    });
      this.cimlForm.get('equipmentId')?.valueChanges.subscribe(() => {
      this.cimlForm.get('name')?.updateValueAndValidity();
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
  loadComponents(plantId: number, areaId: number, unitId: number, systemId: number,corrosionLoopId: number,circuitId: number,equipmentId: number) {

    this.service.getComponent(plantId, areaId, unitId, systemId,corrosionLoopId,circuitId,equipmentId).subscribe((data: any[]) => {
      this.ddlcomponents = data;
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
saveCIML() {
 if (this.cimlForm.invalid) {
   const invalidFields = [];
    const controls = this.cimlForm.controls;

    for (const name in controls) {
       if (controls[name].invalid) {
        const errors = controls[name].errors;
        const currentValue = controls[name].value;
        invalidFields.push({ field: name, errors: errors, value: currentValue });
      }
    }

    console.log('Invalid fields with reasons and current values:', invalidFields);
     return;
    }
    const formData = new FormData();
    Object.keys(this.cimlForm.value).forEach(key => {
      const value = this.cimlForm.value[key];

      // Only append values that are not empty strings or "null"
      if (value !== "" && value !== "null" && value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });
 formData.append('clientId', this.au.getClientId().toString());
    this.documentPreviews.forEach(file => {
      formData.append('documents', file);
    });

    this.service.addCIML(formData).subscribe(
      (response) => {
        Swal.fire({
          title: 'Success!',
          text: 'CIML added successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.backToCIML();
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
 backToCIML() {
    this.router.navigate(['/clientciml/list']);
  }
//DDL
loadDropdowns() {
 // Subscribe to each service call individually

forkJoin({
  ddlplants: this.service.getPlants(),
  categories: this.service.getCIMLCategory(),
  types: this.service.getCIMLType(),
  operationalStatus: this.service.getCIMLOperationalStatus(),
  designCode: this.service.getCIMLDesignCode(),
  editionAddendum: this.service.getCIMLEditionAddendum(),
  complianceCertification: this.service.getCIMLComplianceCertification(),
  geometry: this.service.getCIMLGeometry(),
  orientation: this.service.getCIMLOrientation(),
  fluidPhase: this.service.getCIMLFluidPhase(),
  corrosivity: this.service.getCIMLCorrosivity(),
  processEnvironment: this.service.getCIMLProcessEnvironment(),
  toxicMixture: this.service.getCIMLToxicMixture(),
  toxicFluid: this.service.getCIMLToxicFluid(),
  flammability: this.service.getCIMLFlammability(),
  criticality: this.service.getCIMLCriticality(),
  seismicZoneClassification: this.service.getCIMLSeismicZoneClassification(),
  fireExplosionRisk: this.service.getCIMLFireExplosionRisk(),
  toxicRisk: this.service.getCIMLToxicRisk(),
  heatTreatment: this.service.getCIMLHeatTreatment(),
  heatTreatmentType: this.service.getCIMLHeatTreatmentType(),
  impactTest: this.service.getCIMLImpactTest(),
  pressureTest: this.service.getCIMLPressureTest(),
  pressureTestType: this.service.getCIMLPressureTestType(),
  radiography: this.service.getCIMLRadiography(),
  radiographyCategory: this.service.getCIMLRadiographyCategory(),
  generalMaterial: this.service.getCIMLGeneralMaterial(),
  cladding: this.service.getCIMLCladding(),
  claddingType: this.service.getCIMLCladdingType(),
  claddingMaterial: this.service.getCIMLCladdingMaterial(),
  lining: this.service.getCIMLLining(),
  liningType: this.service.getCIMLLiningType(),
  materialCertification: this.service.getCIMLMaterialCertification(),
  externalCoating: this.service.getCIMLExternalCoating(),
  externalCoatingType: this.service.getCIMLExternalCoatingType(),
  insulation: this.service.getCIMLInsulation(),
  insulationType: this.service.getCIMLInsulationType(),
  insulationMaterial: this.service.getCIMLInsulationMaterial(),
  cuPotential: this.service.getCIMLCUIPotential(),
  externalEnvironment: this.service.getCIMLExternalEnvironment(),
  supportType: this.service.getCIMLSupportType(),
  heatTracing: this.service.getCIMLHeatTracing(),
  fireProofing: this.service.getCIMLFireProofing(),
  buried: this.service.getCIMLBuried(),
  cathodicProtection: this.service.getCIMLCathodicProtection(),
  isitaDeadleg: this.service.getCIMLIsitaDeadleg(),
  deadlegCategory: this.service.getCIMLDeadlegCategory(),
  deadlegCriticality: this.service.getCIMLDeadlegCriticality(),
  pressureReliefDevices: this.service.getCIMLPressureReliefDevices(),
  chemicalInjection: this.service.getCIMLChemicalInjection(),
  detectionSystem: this.service.getCIMLDetectionSystem(),
  isolationSystem: this.service.getCIMLIsolationSystem(),
  mitigationSystem: this.service.getCIMLMitigationSystem(),
  onlineCorrosionMonitoringOptions: this.service.getCIMLOnlineCorrosionMonitoring(),
  corrosionMonitoringType: this.service.getCIMLCorrosionMonitoringType(),
  hazardClassification: this.service.getCIMLHazardClassification(),
  incidentHistory: this.service.getCIMLIncidentHistory(),
  currentInspectionStrategy: this.service.getCIMLCurrentInspectionStrategy(),
  inspectionAccess: this.service.getCIMLInspectionAccess(),
  scheduledRepairReplacement: this.service.getCIMLScheduledRepairReplacement(),
  repairReplacementDuringNextShutdown: this.service.getCIMLRepairReplacementDuringNextShutdown(),
  syncStatus: this.service.getCIMLSyncStatus(),
  insulationRemovalRequired: this.service.getCIMLInsulationRemovalRequired(),
  internalEntry: this.service.GetDdlCIMLInternalEntry(),
  accessTypeOptions: this.service.GetDdlCIMLAccessType(),
  injectionPoints: this.service.GetDdlCIMLCIMLInjectionPoint(),
  soilToAirInterfaces: this.service.GetDdlCIMLSoilToAirInterface(),
  accessibilityOptions: this.service.GetDdlCIMLAccessible()
}).subscribe(results => {
  debugger;
  this.ddlplants = results.ddlplants;
  this.categories = results.categories;
  this.soilToAirInterfaces = results.soilToAirInterfaces;
  this.types = results.types;
  this.operationalStatus = results.operationalStatus;
  this.designCodes = results.designCode;
  this.editions = results.editionAddendum;
  this.certifications = results.complianceCertification;
  this.geometryOptions = results.geometry;
  this.orientationOptions = results.orientation;
  this.fluidPhases = results.fluidPhase;
  this.corrosivityOptions = results.corrosivity;
  this.processEnvironments = results.processEnvironment;
  this.toxicMixtures = results.toxicMixture;
  this.toxicFluids = results.toxicFluid;
  this.flammabilityOptions = results.flammability;
  this.criticalityOptions = results.criticality;
  this.seismicZones = results.seismicZoneClassification;
  this.fireExplosionRisks = results.fireExplosionRisk;
  this.toxicRisks = results.toxicRisk;
  this.injectionPoints = results.injectionPoints;
  this.heatTreatments = results.heatTreatment;
  this.heatTreatmentTypes = results.heatTreatmentType;
  this.impactTests = results.impactTest;
  this.pressureTests = results.pressureTest;
  this.pressureTestTypes = results.pressureTestType;
  this.radiographies = results.radiography;
  this.radiographyCategories = results.radiographyCategory;
  this.generalMaterials = results.generalMaterial;
  this.claddingOptions = results.cladding;
  this.claddingTypes = results.claddingType;
  this.claddingMaterials = results.claddingMaterial;
  this.liningOptions = results.lining;
  this.liningTypes = results.liningType;
  this.materialCertifications = results.materialCertification;
  this.externalCoatings = results.externalCoating;
  this.externalCoatingTypes = results.externalCoatingType;
  this.insulationOptions = results.insulation;
  this.insulationTypes = results.insulationType;
  this.insulationMaterials = results.insulationMaterial;
  this.cuiPotentials = results.cuPotential;
  this.externalEnvironments = results.externalEnvironment;
  this.supportTypes = results.supportType;
  this.heatTracings = results.heatTracing;
  this.fireProofings= results.fireProofing;
  this.buriedOptions = results.buried;
  this.cathodicProtections = results.cathodicProtection;
  this.deadlegOptions = results.isitaDeadleg;
  this.deadlegCategories = results.deadlegCategory;
  this.deadlegCriticalities = results.deadlegCriticality;
  this.pressureReliefDevicesOptions = results.pressureReliefDevices;
  this.chemicalInjectionOptions = results.chemicalInjection;
  this.detectionSystemOptions = results.detectionSystem;
  this.isolationSystemOptions = results.isolationSystem;
  this.mitigationSystemOptions = results.mitigationSystem;
  this.onlineCorrosionMonitoringOptions = results.onlineCorrosionMonitoringOptions;
  this.corrosionMonitoringTypes = results.corrosionMonitoringType;
  this.hazardClassifications = results.hazardClassification;
  this.incidentHistories = results.incidentHistory;
  this.inspectionStrategies = results.currentInspectionStrategy;
  this.inspectionAccessOptions = results.inspectionAccess;
  this.repairReplacementOptions = results.scheduledRepairReplacement;
  this.nextShutdownOptions = results.repairReplacementDuringNextShutdown;
  this.syncStatusOptions = results.syncStatus;
  this.insulationRemovalRequired = results.insulationRemovalRequired;
  this.internalEntryOptions = results.internalEntry;
  this.accessTypeOptions = results.accessTypeOptions;
  this.accessibilityOptions = results.accessibilityOptions;
});

  }

  //accodion
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
    this.showOperationProcess = state;
    this.showFabrication = state;
    this.showMaterial = state;
    this.showExternal = state;
    this.showDeadleg = state;
    this.showSafetyProcessControl = state;
    this.showIntegrityInspection = state;
    this.showEquipmentInspectionSchedule = state;
    this.showMaintenanceSchedule = state;
    this.showIntegrationMetadata = state;
    this.showRecordAuditInformation = state;
    this.showMinimumRequiredThickness = state;
    this.showRequiredInspectionMethode = state;
    this.showCR = state;
    this.showRL = state;
    this.showInspectionInterval = state;
    this.showThicknessInspectionSchedule = state;
    this.showInspectionAccess = state;
  }
}
