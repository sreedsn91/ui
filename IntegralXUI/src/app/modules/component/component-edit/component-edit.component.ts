import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { LoadingService } from 'src/app/common/loadingPanel/loading.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ComponentService } from 'src/app/services/component/component.service';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-component-edit',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './component-edit.component.html',
  styleUrl: './component-edit.component.scss'
})
export class ComponentEditComponent {

dataLoaded: boolean = false;
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
  clientData: any;
  childValue: number = 0;
  receivedData: any;
  canEdit: boolean = false;
  canDelete: boolean = false;
  expand = false;
  showGeneral: boolean = true;
  showLocation: boolean = true;
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
  selectedType: string = '0';

  documentsToDelete: number[] = [];
  documents: any[] = [];
  constructor(private service: ComponentService, private fb: FormBuilder, private au: AuthService, private router: Router,private sharedDataService: SharedDataService,private ls: LoadingService) {
   this.canDelete = (this.au.getCanDelete());
    this.canEdit = (this.au.getCanEdit());
    this.receivedData = this.sharedDataService.getData();
    this.childValue = this.receivedData.id;

     this.componentForm = this.fb.group({
      // IDentification
      id: [null],
      clientID: [this.au.getClientId()],
      componentID: [null,Validators.required],
      componentDescription: [null,Validators.required],
      componentCategory: [''],
      componentType: [null],

      // Dates
      commissioningDate: [null],
      builtDate: [null],
      operationalStatus: [null],

      // Location
      plantID: [null,Validators.required],
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
      deadlegID: [''],
      deadlegDescription: [''],
      deadlegCategory: [null],
      deadlegCriticality: [null],

      pressureReliefDevices: [null],
      prdID: [''],
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
      cmlDrawingID: [''],
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
      externalSystemID: [''],
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
    async ngOnInit() {

    this.ls.showLoading();

    await this.loadComponentDetails();
    await this.loadDropdowns();
    
    this.ls.hideLoading();
    this.componentForm.get('plantID')?.valueChanges.subscribe((plantID) => {
      
      this.componentForm.get('name')?.updateValueAndValidity();
      if (plantID) {
        this.loadAreasByPlant(plantID);
        this.loadUnits(plantID, 0);
        this.loadSystems(plantID, 0, 0);
        this.loadCircuits(plantID, 0, 0, 0);

      } else {
        this.ddlareas = [];
        this.ddlunits = [];
        this.ddlsystems = [];
        this.ddlcircuits = []; // Reset area list if no plant is selected
      }
    });
    this.componentForm.get('areaID')?.valueChanges.subscribe((areaID) => {

      this.componentForm.get('name')?.updateValueAndValidity();
      if (areaID) {

        this.loadUnits(this.componentForm.get('plantID').value, areaID);
        this.loadSystems(this.componentForm.get('plantID').value, areaID, 0);
        this.loadCircuits(this.componentForm.get('plantID').value, areaID, 0, 0);
                this.loadSystems(this.componentForm.get('plantID').value, 0, 0);
        this.loadCircuits(this.componentForm.get('plantID').value, 0, 0, 0);
        this.loadcorrosionLoop(this.componentForm.get('plantID').value,0, 0,0,0);
        this.loadEquipment(this.componentForm.get('plantID').value, 0, 0, 0,0,0, 0);

      } else {

        this.ddlunits = [];
        this.ddlsystems = [];
        this.ddlcircuits = []; // Reset area list if no plant is selected
      }
    });
    this.componentForm.get('unitID')?.valueChanges.subscribe((unitID) => {

      this.componentForm.get('name')?.updateValueAndValidity();
      if (unitID) {

        this.loadSystems(this.componentForm.get('plantID').value, this.componentForm.get('areaID').value, unitID);
        this.loadCircuits(this.componentForm.get('plantID').value, this.componentForm.get('areaID').value, unitID, 0);
        this.loadcorrosionLoop(this.componentForm.get('plantID').value, this.componentForm.get('areaID').value, 0,0,0);
        this.loadEquipment(this.componentForm.get('plantID').value, this.componentForm.get('areaID').value, 0, 0,0, 0,0);

      } else {

        this.ddlsystems = []; // Reset area list if no plant is selected
        this.ddlcircuits = [];
      }
    });
    this.componentForm.get('systemID')?.valueChanges.subscribe((systemID) => {

      this.componentForm.get('name')?.updateValueAndValidity();
      if (systemID) {

        this.loadCircuits(this.componentForm.get('plantID').value, this.componentForm.get('areaID').value, this.componentForm.get('unitID').value, systemID);
           this.loadcorrosionLoop(this.componentForm.get('plantID').value, this.componentForm.get('areaID').value, this.componentForm.get('unitID').value,0,0);
        this.loadEquipment(this.componentForm.get('plantID').value, this.componentForm.get('areaID').value, this.componentForm.get('unitID').value, 0,0, 0,0);


      } else {

        this.ddlcircuits = []; // Reset area list if no plant is selected
      }
    });

     this.componentForm.get('circuitID')?.valueChanges.subscribe((circuitID) => {

      this.componentForm.get('name')?.updateValueAndValidity();
      if (circuitID) {

        this.loadcorrosionLoop(this.componentForm.get('plantID').value, this.componentForm.get('areaID').value, this.componentForm.get('unitID').value,this.componentForm.get('systemID').value, circuitID);
        this.loadEquipment(this.componentForm.get('plantID').value, this.componentForm.get('areaID').value, this.componentForm.get('unitID').value, this.componentForm.get('systemID').value, this.componentForm.get('circuitID').value, 0,0);

      } else {

        this.ddlcircuits = []; // Reset area list if no plant is selected
      }
    });

     this.componentForm.get('corrosionLoopID')?.valueChanges.subscribe((corrosionLoopID) => {

      this.componentForm.get('name')?.updateValueAndValidity();
      if (corrosionLoopID) {

        this.loadEquipment(this.componentForm.get('plantID').value, this.componentForm.get('areaID').value, this.componentForm.get('unitID').value, this.componentForm.get('systemID').value, this.componentForm.get('circuitID').value, corrosionLoopID,0);

      } else {

        this.ddlcircuits = []; // Reset area list if no plant is selected
      }
    });

    this.componentForm.get('areaID')?.valueChanges.subscribe(() => {
      this.componentForm.get('name')?.updateValueAndValidity();
    });
    this.componentForm.get('unitID')?.valueChanges.subscribe(() => {
      this.componentForm.get('name')?.updateValueAndValidity();
    });
    this.componentForm.get('unitID')?.valueChanges.subscribe(() => {
      this.componentForm.get('name')?.updateValueAndValidity();
    });
    this.componentForm.get('systemID')?.valueChanges.subscribe(() => {
      this.componentForm.get('name')?.updateValueAndValidity();
    });
    this.componentForm.get('circuitID')?.valueChanges.subscribe(() => {
      this.componentForm.get('name')?.updateValueAndValidity();
    });
       this.componentForm.get('corrosionLoopID')?.valueChanges.subscribe(() => {
      this.componentForm.get('name')?.updateValueAndValidity();
    });
      this.componentForm.get('equipmentID')?.valueChanges.subscribe(() => {
      this.componentForm.get('name')?.updateValueAndValidity();
    });

    // this.loadDropdowns();

 this.dataLoaded = true;
  }


  async loadComponentDetails() {
    this.service.getComponentDetails(this.childValue).subscribe((data: any) => {
      debugger;
      
     this.componentForm.patchValue({
    // IDentification
    id: data.id || null,
    clientID: data.clientID || this.au.getClientId(),
    componentID: data.componentID || null,
    componentDescription: data.componentDescription || null,
    componentCategory: data.componentCategory || '',
    componentType: data.componentType || null,

    // Dates
    commissioningDate: data.commissioningDate || null,
    builtDate: data.builtDate || null,
    operationalStatus: data.operationalStatus || null,

    // Location
    plantID: data.plantID || null,
    areaID: data.areaID || null,
    unitID: data.unitID || null,
    systemID: data.systemID || null,
    circuitID: data.circuitID || null,
    corrosionLoopID: data.corrosionLoopID || null,
    equipmentID: data.equipmentID || null,
    specificLocation: data.specificLocation || '',
    equipmentFrom: data.equipmentFrom || '',
    equipmentTo: data.equipmentTo || '',
    pfd: data.pfd || '',
    pAndID: data.pAndID || '',
    gaDrawing: data.gaDrawing || '',

    // Design
    designCode: data.designCode || null,
    editionAndAddendum: data.editionAndAddendum || null,
    designPressureInternal: data.designPressureInternal || null,
    designPressureExternal: data.designPressureExternal || null,
    designTemperatureMax: data.designTemperatureMax || null,
    designTemperatureMDMT: data.designTemperatureMDMT || null,
    mawp: data.mawp || null,
    designLife: data.designLife || null,
    primaryProducts: data.primaryProducts || '',
    marginPerDay: data.marginPerDay || null,
    complianceCertification: data.complianceCertification || null,
    governingRegulatoryBody: data.governingRegulatoryBody || '',

    // Geometry
    geometry: data.geometry || null,
    nps: data.nps || null,
    insideDiameter: data.insideDiameter || null,
    outsideDiameter: data.outsideDiameter || null,
    lengthHeight: data.lengthHeight || null,
    fillHeight: data.fillHeight || null,
    orientation: data.orientation || null,
    emptyWeight: data.emptyWeight || null,
    capacity: data.capacity || null,

    // Operating Conditions
    operatingPressureMax: data.operatingPressureMax || null,
    operatingPressureAvg: data.operatingPressureAvg || null,
    operatingTempMax: data.operatingTempMax || null,
    operatingTempMin: data.operatingTempMin || null,
    processFluid: data.processFluid || '',
    fluidComposition: data.fluidComposition || '',
    fluidPhase: data.fluidPhase || null,
    inventoryVolume: data.inventoryVolume || null,
    density: data.density || null,
    viscosity: data.viscosity || null,
    specificGravity: data.specificGravity || null,
    flowRate: data.flowRate || null,
    velocity: data.velocity || null,
    corrosivity: data.corrosivity || null,
    ph: data.ph || data.pH || null, // Handle both cases
    processEnvironment: data.processEnvironment || null,
    toxicMixture: data.toxicMixture || null,
    toxicFluid: data.toxicFluid || null,
    flammability: data.flammability || null,
    operatingWeight: data.operatingWeight || null,
    criticality: data.criticality || null,
    humidityLevel: data.humidityLevel || null,
    seismicZoneClassification: data.seismicZoneClassification || null,
    fireAndExplosionRisk: data.fireAndExplosionRisk || null,
    toxicRisk: data.toxicRisk || null,
    totalPopulation: data.totalPopulation || null,
    populationDensity: data.populationDensity || null,

    // Manufacturer & Testing
    manufacturer: data.manufacturer || '',
    serialNumber: data.serialNumber || '',
    warrantyDate: data.warrantyDate || null,
    heatTreatment: data.heatTreatment || null,
    heatTreatmentType: data.heatTreatmentType || null,
    impactTest: data.impactTest || null,
    pressureTest: data.pressureTest || null,
    pressureTestType: data.pressureTestType || null,
    testPressure: data.testPressure || '',
    radiography: data.radiography || null,
    radiographyCategory: data.radiographyCategory || null,
    jointEfficiency: data.jointEfficiency || '',
    otherNDE: data.otherNDE || '',

    // Material
    generalMaterial: data.generalMaterial || null,
    materialSpecification: data.materialSpecification || '',
    allowableStress: data.allowableStress || null,
    nominalThickness: data.nominalThickness || null,
    corrosionAllowance: data.corrosionAllowance || null,
    cladding: data.cladding || null,
    claddingType: data.claddingType || null,
    claddingMaterial: data.claddingMaterial || null,
    claddingThickness: data.claddingThickness || null,
    lining: data.lining || null,
    liningType: data.liningType || null,
    materialCertification: data.materialCertification || null,

    // External
    externalCoating: data.externalCoating || null,
    externalCoatingType: data.externalCoatingType || null,
    externalCoatingThickness: data.externalCoatingThickness || null,
    externalCoatingAge: data.externalCoatingAge || null,
    insulation: data.insulation || null,
    insulationType: data.insulationType || null,
    insulationMaterial: data.insulationMaterial || null,
    insulationThickness: data.insulationThickness || '',
    cuiPotential: data.cuiPotential || null,
    externalEnvironment: data.externalEnvironment || null,
    supportType: data.supportType || null,
    heatTracing: data.heatTracing || null,
    fireProofing: data.fireProofing || null,
    buried: data.buried || null,
    cathodicProtection: data.cathodicProtection || null,

    // Deadleg
    isDeadleg: data.isDeadleg || null,
    deadlegID: data.deadlegID || '',
    deadlegDescription: data.deadlegDescription || '',
    deadlegCategory: data.deadlegCategory || null,
    deadlegCriticality: data.deadlegCriticality || null,

    // Safety and Process Control
    pressureReliefDevices: data.pressureReliefDevices || null,
    prdID: data.prdID || '',
    prdSetPressure: data.prdSetPressure || null,
    chemicalInjection: data.chemicalInjection || null,
    detectionSystem: data.detectionSystem || null,
    isolationSystem: data.isolationSystem || null,
    mitigationSystem: data.mitigationSystem || null,
    onlineCorrosionMonitoring: data.onlineCorrosionMonitoring || null,
    corrosionMonitoringType: data.corrosionMonitoringType || null,
    hazardClassification: data.hazardClassification || null,
    safetyEnvironmentalPermits: data.safetyEnvironmentalPermits || '',
    incidentHistory: data.incidentHistory || null,

    // Integrity & Inspection
    currentInspectionStrategy: data.currentInspectionStrategy || null,
    damageMechanisms: data.damageMechanisms || '',
    shutdownFrequency: data.shutdownFrequency || null,
    lastMajorShutdownDate: data.lastMajorShutdownDate || '',
    nextMajorShutdownDate: data.nextMajorShutdownDate || '',
    subsequentMajorShutdownDate: data.subsequentMajorShutdownDate || '',
    mtbf: data.mtbf || null,
    mttr: data.mttr || null,
    cmlDrawingID: data.cmlDrawingID || '',
    inspectionAccess: data.inspectionAccess || null,
    inspectionSupervisor: data.inspectionSupervisor || '',
    inspector: data.inspector || '',

    // Inspection Schedule
    internalInspection: data.internalInspection || data.internalInspectionDate || '',
    externalInspection: data.externalInspection || data.externalInspectionDate || '',
    onStreamInspection: data.onStreamInspection || data.onStreamInspectionDate || '',
    tmInspection: data.tmInspection || data.tmInspectionDate || '',

    // Previous Inspections
    prevInternalInspection: data.prevInternalInspection || data.prevInternalInspectionDate || '',
    prevExternalInspection: data.prevExternalInspection || data.prevExternalInspectionDate || '',
    prevOnStreamInspection: data.prevOnStreamInspection || data.prevOnStreamInspectionDate || '',
    prevTmInspection: data.prevTmInspection || data.prevTMInspectionDate || '',

    // Maintenance Schedule
    scheduledRepairReplacement: data.scheduledRepairReplacement || null,
    scheduledRepairReplacementDate: data.scheduledRepairReplacementDate || '',
    repairReplacementDuringNextShutdown: data.repairReplacementDuringNextShutdown || data.repairReplacementNextShutdown || null,

    // Integration & Metadata
    erpCircuitCode: data.erpCircuitCode || data.erpCmmsCircuitCode || '',
    erpSystem: data.erpSystem || data.erpCmmsSystem || '',
    functionalLocation: data.functionalLocation || '',
    externalSystemID: data.externalSystemID || '',
    syncStatus: data.syncStatus || null,

    // Meta
    addedBy: data.addedBy || null,
    addedOn: data.addedOn || null,
    modifiedBy: data.modifiedBy || null,
    modifiedOn: data.modifiedOn || null,
    isDeleted: data.isDeleted || false,
    isActive: data.isActive !== undefined ? data.isActive : true
  });
      this.documents = (data.docs);
    });
  }

  loadAreasByPlant(plantID: number) {

    this.service.getArea(plantID).subscribe((data: any[]) => {
      this.ddlareas = data;
    });
  }
  loadUnits(plantID: number, areaID: number) {

    this.service.getUnits(plantID, areaID).subscribe((data: any[]) => {
      this.ddlunits = data;
    });
  }
  loadSystems(plantID: number, areaID: number, unitID: number) {

    this.service.getSystems(plantID, areaID, unitID).subscribe((data: any[]) => {
      this.ddlsystems = data;
    });
  }

  loadCircuits(plantID: number, areaID: number, unitID: number, systemID: number) {

    this.service.getCircuits(plantID, areaID, unitID, systemID).subscribe((data: any[]) => {
      this.ddlcircuits = data;
    });
  }
  
  loadcorrosionLoop(plantID: number, areaID: number, unitID: number, systemID: number,corrosionLoopID: number) {

    this.service.getCorrosionLoop(plantID, areaID, unitID, systemID,corrosionLoopID).subscribe((data: any[]) => {
      this.ddlcorrosionLoops = data;
    });
  }
  
  loadEquipment(plantID: number, areaID: number, unitID: number, systemID: number,circuitID :number,corrosionLoopID: number,equipmentID: number ) {

    this.service.getEquipment(plantID, areaID, unitID, systemID,corrosionLoopID,circuitID,equipmentID).subscribe((data: any[]) => {
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
  formData.append('deletedFiles', JSON.stringify(this.documentsToDelete).toString());


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
    debugger;
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  
  downloadFileExisting(documentID: number, fileName: string) {
    this.service.downloadDocument(documentID).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
  deleteFileExisting(documentID: number) {
    this.documentsToDelete.push(documentID);
    this.documents = this.documents.filter(doc => doc.id !== documentID); // Remove from UI
  }
  
    DeleteComp() {
      Swal.fire({
        title: 'Are you sure?You want to delete this component!',
        text: 'All data associated with this component will be lost',
        icon: 'warning',
        width: '300px',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.deleteComponent(this.childValue).subscribe(
            () => this.backToComponent(),
            error =>
              Swal.fire('Delete failed:', error)
          );
  
        }
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
