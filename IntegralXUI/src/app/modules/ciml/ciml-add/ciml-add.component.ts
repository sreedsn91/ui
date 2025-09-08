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
  showGeneral = false;
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
  

  constructor(private service: CimlService, private fb: FormBuilder, private au: AuthService, private router: Router) {
      this.canAdd = (this.au.getCanAdd());
  
     this.cimlForm = this.fb.group({
      id: [null],
      clientId: [this.au.getClientId()],
      cmlId: ['', Validators.required],
      cmlDescription: ['', Validators.required],
      cmlCategory: ['', Validators.required],
      cmlType: [''],
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
      prdId: [''],
      prdSetPressure: [''],
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
    ddlplants : this.service.getPlants(),
ddlcomponentCategory: this.service.getCIMLCategory(),
ddlcomponentType: this.service.getCIMLType(),
ddlcomponentOperationalStatus: this.service.getCIMLOperationalStatus(),
ddlcomponentDesignCode: this.service.getCIMLDesignCode(),
ddlcomponentEditionAddendum: this.service.getCIMLEditionAddendum(),
ddlcomponentComplianceCertification: this.service.getCIMLComplianceCertification(),
ddlcomponentGeometry: this.service.getCIMLGeometry(),
ddlcomponentOrientation: this.service.getCIMLOrientation(),
ddlcomponentFluidPhase: this.service.getCIMLFluidPhase(),
ddlcomponentCorrosivity: this.service.getCIMLCorrosivity(),
ddlcomponentProcessEnvironment: this.service.getCIMLProcessEnvironment(),
ddlcomponentToxicMixture: this.service.getCIMLToxicMixture(),
ddlcomponentToxicFluid: this.service.getCIMLToxicFluid(),
ddlcomponentFlammability: this.service.getCIMLFlammability(),
ddlcomponentCriticality: this.service.getCIMLCriticality(),
ddlcomponentSeismicZoneClassification: this.service.getCIMLSeismicZoneClassification(),
ddlcomponentFireExplosionRisk: this.service.getCIMLFireExplosionRisk(),
ddlcomponentToxicRisk: this.service.getCIMLToxicRisk(),
ddlcomponentHeatTreatment: this.service.getCIMLHeatTreatment(),
ddlcomponentHeatTreatmentType: this.service.getCIMLHeatTreatmentType(),
ddlcomponentImpactTest: this.service.getCIMLImpactTest(),
ddlcomponentPressureTest: this.service.getCIMLPressureTest(),
ddlcomponentPressureTestType: this.service.getCIMLPressureTestType(),
ddlcomponentRadiography: this.service.getCIMLRadiography(),
ddlcomponentRadiographyCategory: this.service.getCIMLRadiographyCategory(),
ddlcomponentGeneralMaterial: this.service.getCIMLGeneralMaterial(),
ddlcomponentCladding: this.service.getCIMLCladding(),
ddlcomponentCladdingType: this.service.getCIMLCladdingType(),
ddlcomponentCladdingMaterial: this.service.getCIMLCladdingMaterial(),
ddlcomponentLining: this.service.getCIMLLining(),
ddlcomponentLiningType: this.service.getCIMLLiningType(),
ddlcomponentMaterialCertification: this.service.getCIMLMaterialCertification(),
ddlcomponentExternalCoating: this.service.getCIMLExternalCoating(),
ddlcomponentExternalCoatingType: this.service.getCIMLExternalCoatingType(),
ddlcomponentInsulation: this.service.getCIMLInsulation(),
ddlcomponentInsulationType: this.service.getCIMLInsulationType(),
ddlcomponentInsulationMaterial: this.service.getCIMLInsulationMaterial(),
ddlcomponentCUIPotential: this.service.getCIMLCUIPotential(),
ddlcomponentExternalEnvironment: this.service.getCIMLExternalEnvironment(),
ddlcomponentSupportType: this.service.getCIMLSupportType(),
ddlcomponentHeatTracing: this.service.getCIMLHeatTracing(),
ddlcomponentFireProofing: this.service.getCIMLFireProofing(),
ddlcomponentBuried: this.service.getCIMLBuried(),
ddlcomponentCathodicProtection: this.service.getCIMLCathodicProtection(),
ddlcomponentIsitaDeadleg: this.service.getCIMLIsitaDeadleg(),
ddlcomponentDeadlegCategory: this.service.getCIMLDeadlegCategory(),
ddlcomponentDeadlegCriticality: this.service.getCIMLDeadlegCriticality(),
ddlcomponentPressureReliefDevices: this.service.getCIMLPressureReliefDevices(),
ddlcomponentChemicalInjection: this.service.getCIMLChemicalInjection(),
ddlcomponentDetectionSystem: this.service.getCIMLDetectionSystem(),
ddlcomponentIsolationSystem: this.service.getCIMLIsolationSystem(),
ddlcomponentMitigationSystem: this.service.getCIMLMitigationSystem(),
ddlcomponentOnlineCorrosionMonitoring: this.service.getCIMLOnlineCorrosionMonitoring(),
ddlcomponentCorrosionMonitoringType: this.service.getCIMLCorrosionMonitoringType(),
ddlcomponentHazardClassification: this.service.getCIMLHazardClassification(),
ddlcomponentIncidentHistory: this.service.getCIMLIncidentHistory(),
ddlcomponentCurrentInspectionStrategy: this.service.getCIMLCurrentInspectionStrategy(),
ddlcomponentInspectionAccess: this.service.getCIMLInspectionAccess(),
ddlcomponentScheduledRepairReplacement: this.service.getCIMLScheduledRepairReplacement(),
ddlcomponentRepairReplacementDuringNextShutdown: this.service.getCIMLRepairReplacementDuringNextShutdown(),
ddlcomponentSyncStatus: this.service.getCIMLSyncStatus()
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
