import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { LoadingService } from 'src/app/common/loadingPanel/loading.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CimlService } from 'src/app/services/ciml/ciml.service';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';
import Swal from 'sweetalert2';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-ciml-edit',
  imports: [ReactiveFormsModule, CommonModule, AgGridAngular],
  templateUrl: './ciml-edit.component.html',
  styleUrl: './ciml-edit.component.scss'
})
export class CimlEditComponent {


  dataLoaded = false;
  activeTab: string = 'data'; // Default to data tab
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
  inspectionForm!: FormGroup;
  approvalForm!: FormGroup;

  // Thickness Inspection properties
  thicknessInspections: any[] = [];
  showInspectionModal: boolean = false;
  showApprovalModal: boolean = false;
  isEditMode: boolean = false;
  currentInspection: any = null;
  approvalAction: string = '';
  inspectors: any[] = [];
  verifiers: any[] = [];
  selectedMinThicknessOption: string = '';

  // AG Grid properties
  columnDefs: ColDef[] = [];
  gridOptions: GridOptions = {};
  gridApi: any;
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1,
    minWidth: 100
  };

  documentPreviews: File[] = [];
  ddlplants: any;
  ddlareas: any;
  ddlunits: any; ''
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
  clientData: any;
  childValue: number = 0;
  receivedData: any;
  canEdit: boolean = false;
  canDelete: boolean = false;

  constructor(private sharedDataService: SharedDataService, private service: CimlService, private ls: LoadingService, private fb: FormBuilder, private au: AuthService, private router: Router) {
    this.canDelete = (this.au.getCanDelete());
    this.canEdit = (this.au.getCanEdit());
    this.receivedData = this.sharedDataService.getData();
    this.childValue = this.receivedData.id;

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
      plantId: ['', Validators.required],
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
  async loadDetails() {
    this.service.getCIMLDetails(this.childValue).subscribe(data => {
      debugger;
      // Map the data to match the form structure
      this.cimlForm.patchValue({
        id: data.id || null,
        clientId: data.clientId || this.au.getClientId(),
        cml_Id: data.cmL_ID || '',
        cml_Description: data.cmL_Description || '',
        cml_Category: data.cmL_Category || '',
        cml_Type: data.cmL_Type || '',
        commissioningDate:  data.commissioningDate ? new Date(data.commissioningDate).toLocaleDateString('en-CA') : null,
        builtDate:  data.builtDate ? new Date(data.builtDate).toLocaleDateString('en-CA') : null,
        operationalStatus: data.operationalStatus || '',
        plantId: data.plantID || '',
        areaId: data.areaID || '',
        unitId: data.unitID || '',
        systemId: data.systemID || '',
        circuitId: data.circuitID || '',
        corrosionLoopId: data.corrosionLoopID || '',
        equipmentId: data.equipmentID || '',
        componentId: data.componentID || '',
        specificLocation: data.specificLocation || '',
        equipmentFrom:  data.equipmentFrom ? new Date(data.equipmentFrom).toLocaleDateString('en-CA') : null,
        equipmentTo:  data.equipmentTo ? new Date(data.equipmentTo).toLocaleDateString('en-CA') : null,
        pfd: data.pfd || '',
        pid: data.pid || '',
        gaDrawing: data.gaDrawing || '',
        designCode: data.designCode || '',
        editionAndAddendum: data.editionAndAddendum || '',
        designPressureInternal: data.designPressureInternal || '',
        designPressureExternal: data.designPressureExternal || '',
        designTemperatureMax: data.designTemperatureMax || '',
        designTemperatureMDMT: data.designTemperatureMDMT || '',
        mawp: data.mawp || '',
        designLife: data.designLife || '',
        primaryProducts: data.primaryProducts || '',
        marginPerDay: data.marginPerDay || '',
        complianceCertification: data.complianceCertification || '',
        governingRegulatoryBody: data.governingRegulatoryBody || '',
        geometry: data.geometry || '',
        nps: data.nps || '',
        insideDiameter: data.insideDiameter || '',
        outsideDiameter: data.outsideDiameter || '',
        lengthHeight: data.lengthHeight || '',
        fillHeight: data.fillHeight || '',
        orientation: data.orientation || '',
        emptyWeight: data.emptyWeight || '',
        capacity: data.capacity || '',
        operatingPressureMax: data.operatingPressureMax || '',
        operatingPressureAvg: data.operatingPressureAvg || '',
        operatingTempMax: data.operatingTempMax || '',
        operatingTempMin: data.operatingTempMin || '',
        processFluid: data.processFluid || '',
        fluidComposition: data.fluidComposition || '',
        fluidPhase: data.fluidPhase || '',
        inventoryVolume: data.inventoryVolume || '',
        density: data.density || '',
        viscosity: data.viscosity || '',
        specificGravity: data.specificGravity || '',
        flowRate: data.flowRate || '',
        velocity: data.velocity || '',
        corrosivity: data.corrosivity || '',
        ph: data.ph || '',
        processEnvironment: data.processEnvironment || '',
        toxicMixture: data.toxicMixture || '',
        toxicFluid: data.toxicFluid || '',
        flammability: data.flammability || '',
        operatingWeight: data.operatingWeight || '',
        criticality: data.criticality || '',
        humidityLevel: data.humidityLevel || '',
        seismicZoneClassification: data.seismicZoneClassification || '',
        fireExplosionRisk: data.fireExplosionRisk || '',
        toxicRisk: data.toxicRisk || '',
        totalPopulation: data.totalPopulation || '',
        populationDensity: data.populationDensity || '',
        manufacturer: data.manufacturer || '',
        serialNumber: data.serialNumber || '',
        warrantyDate: data.warrantyDate || '',
        heatTreatment: data.heatTreatment || '',
        heatTreatmentType: data.heatTreatmentType || '',
        impactTest: data.impactTest || '',
        pressureTest: data.pressureTest || '',
        pressureTestType: data.pressureTestType || '',
        testPressure: data.testPressure || '',
        radiography: data.radiography || '',
        radiographyCategory: data.radiographyCategory || '',
        jointEfficiency: data.jointEfficiency || '',
        otherNDE: data.otherNDE || '',
        generalMaterial: data.generalMaterial || '',
        materialSpecification: data.materialSpecification || '',
        allowableStress: data.allowableStress || '',
        nominalThickness: data.nominalThickness || '',
        corrosionAllowance: data.corrosionAllowance || '',
        cladding: data.cladding || '',
        claddingType: data.claddingType || '',
        claddingMaterial: data.claddingMaterial || '',
        claddingThickness: data.claddingThickness || '',
        lining: data.lining || '',
        liningType: data.liningType || '',
        materialCertification: data.materialCertification || '',
        externalCoating: data.externalCoating || '',
        externalCoatingType: data.externalCoatingType || '',
        externalCoatingThickness: data.externalCoatingThickness || '',
        externalCoatingAge: data.externalCoatingAge || '',
        insulation: data.insulation || '',
        insulationType: data.insulationType || '',
        insulationMaterial: data.insulationMaterial || '',
        insulationThickness: data.insulationThickness || '',
        cuiPotential: data.cuiPotential || '',
        externalEnvironment: data.externalEnvironment || '',
        supportType: data.supportType || '',
        heatTracing: data.heatTracing || '',
        fireProofing: data.fireProofing || '',
        buried: data.buried || '',
        cathodicProtection: data.cathodicProtection || '',
        isDeadleg: data.isDeadleg || '',
        deadlegId: data.deadlegId || '',
        deadlegDescription: data.deadlegDescription || '',
        deadlegCategory: data.deadlegCategory || '',
        deadlegCriticality: data.deadlegCriticality || '',
        injectionPoint: data.injectionPoint || '',
        soilToAirInterface: data.soilToAirInterface || '',
        pressureReliefDevices: data.pressureReliefDevices || '',
        prd_Id: data.prD_ID || '',
        prd_SetPressure: data.prD_SetPressure || '',
        chemicalInjection: data.chemicalInjection || '',
        detectionSystem: data.detectionSystem || '',
        isolationSystem: data.isolationSystem || '',
        mitigationSystem: data.mitigationSystem || '',
        onlineCorrosionMonitoring: data.onlineCorrosionMonitoring || '',
        corrosionMonitoringType: data.corrosionMonitoringType || '',
        hazardClassification: data.hazardClassification || '',
        safetyEnvironmentalPermits: data.safetyEnvironmentalPermits || '',
        incidentHistory: data.incidentHistory || '',
        currentInspectionStrategy: data.currentInspectionStrategy || '',
        damageMechanisms: data.damageMechanisms || '',
        shutdownTurnaroundFrequency: data.shutdownTurnaroundFrequency || '',
        lastMajorShutdownDate: data.lastMajorShutdownDate || '',
        nextMajorShutdownDate: data.nextMajorShutdownDate || '',
        subsequentMajorShutdownDate: data.subsequentMajorShutdownDate || '',
        meanTimeBetweenFailures: data.meanTimeBetweenFailures || '',
        meanTimeToRepair: data.meanTimeToRepair || '',
        cmlDrawingId: data.cmlDrawingId || '',
        inspectionSupervisor: data.inspectionSupervisor || '',
        inspector: data.inspector || '',
        internalInspection: data.internalInspection || '',
        externalInspection: data.externalInspection || '',
        onStreamInspection: data.onStreamInspection || '',
        tmInspection: data.tmInspection || '',
        prevInternalInspection: data.prevInternalInspection || '',
        prevExternalInspection: data.prevExternalInspection || '',
        prevOnStreamInspection: data.prevOnStreamInspection || '',
        prevTMInspection: data.prevTMInspection || '',
        scheduledRepairReplacement: data.scheduledRepairReplacement || '',
        scheduledRepairReplacementDate: data.scheduledRepairReplacementDate || '',
        repairReplacementDuringNextShutdown: data.repairReplacementDuringNextShutdown || '',
        erpCmmsCircuitCode: data.erpCmmsCircuitCode || '',
        erpCmmsSystem: data.erpCmmsSystem || '',
        functionalLocation: data.functionalLocation || '',
        externalSystemId: data.externalSystemId || '',
        syncStatus: data.syncStatus || '',
        addedBy: data.addedBy || '',
        addedOn: data.addedOn || '',
        modifiedBy: data.modifiedBy || '',
        modifiedOn: data.modifiedOn || '',
        isDeleted: data.isDeleted || '',
        isActive: data.isActive || '',
        nominalThicknessCA: data.nominalThicknessCA || '',
        defaultMinimumThickness: data.defaultMinimumThickness || '',
        structuralMinimumThk: data.structuralMinimumThk || '',
        calculatedInternalPressure: data.calculatedInternalPressure || '',
        calculatedExternalPressure: data.calculatedExternalPressure || '',
        maxStructuralCalculated: data.maxStructuralCalculated || '',
        maximumOfAbove: data.maximumOfAbove || '',
        manual: data.manual || '',
        selectedMinReqThk: data.selectedMinReqThk || '',
        cvi: data.cvi || '',
        utg: data.utg || '',
        uts: data.uts || '',
        rt: data.rt || '',
        prt: data.prt || '',
        mfl: data.mfl || '',
        pec: data.pec || '',
        other: data.other || '',
        ltcr: data.ltcr || '',
        stcr: data.stcr || '',
        maxAbove2: data.maxAbove2 || '',
        designCR: data.designCR || '',
        minOrDefaultCR: data.minOrDefaultCR || '',
        crForRL: data.crForRL || '',
        calculatedRemainingLife: data.calculatedRemainingLife || '',
        maxRemainingLife: data.maxRemainingLife || '',
        minAbove2: data.minAbove2 || '',
        remainingLife: data.remainingLife || '',
        perAPI: data.perAPI || '',
        halfRemainingLife: data.halfRemainingLife || '',
        minAbove2Interval: data.minAbove2Interval || '',
        defaultMinimumInterval: data.defaultMinimumInterval || '',
        manualEntry: data.manualEntry || '',
        selectedInspectionInterval: data.selectedInspectionInterval || '',
        accessible: data.accessible || '',
        accessType: data.accessType || '',
        internalEntry: data.internalEntry || '',
        insulationRemovalRequired: data.insulationRemovalRequired || ''
      });

      this.dataLoaded = true;
    });
  }

  async ngOnInit() {
    this.ls.showLoading();
    this.initializeInspectionForms();
    this.initializeGridColumns();
    await this.loadDetails();
    await this.loadDropdowns();
    await this.loadInspectors();
    await this.loadThicknessInspections();
    this.ls.hideLoading();
    this.cimlForm.get('plantId')?.valueChanges.subscribe((plantId) => {
     
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
        this.loadcorrosionLoop(this.cimlForm.get('plantId').value, 0, 0, 0, 0);
        this.loadEquipment(this.cimlForm.get('plantId').value, 0, 0, 0, 0, 0, 0);

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
        this.loadcorrosionLoop(this.cimlForm.get('plantId').value, this.cimlForm.get('areaId').value, 0, 0, 0);
        this.loadEquipment(this.cimlForm.get('plantId').value, this.cimlForm.get('areaId').value, 0, 0, 0, 0, 0);

      } else {

        this.ddlsystems = []; // Reset area list if no plant is selected
        this.ddlcircuits = [];
      }
    });
    this.cimlForm.get('systemId')?.valueChanges.subscribe((systemId) => {

      this.cimlForm.get('name')?.updateValueAndValidity();
      if (systemId) {

        this.loadCircuits(this.cimlForm.get('plantId').value, this.cimlForm.get('areaId').value, this.cimlForm.get('unitId').value, systemId);
        this.loadcorrosionLoop(this.cimlForm.get('plantId').value, this.cimlForm.get('areaId').value, this.cimlForm.get('unitId').value, 0, 0);
        this.loadEquipment(this.cimlForm.get('plantId').value, this.cimlForm.get('areaId').value, this.cimlForm.get('unitId').value, 0, 0, 0, 0);


      } else {

        this.ddlcircuits = []; // Reset area list if no plant is selected
      }
    });

    this.cimlForm.get('circuitId')?.valueChanges.subscribe((circuitId) => {

      this.cimlForm.get('name')?.updateValueAndValidity();
      if (circuitId) {

        this.loadcorrosionLoop(this.cimlForm.get('plantId').value, this.cimlForm.get('areaId').value, this.cimlForm.get('unitId').value, this.cimlForm.get('systemId').value, circuitId);
        this.loadEquipment(this.cimlForm.get('plantId').value, this.cimlForm.get('areaId').value, this.cimlForm.get('unitId').value, this.cimlForm.get('systemId').value, this.cimlForm.get('circuitId').value, 0, 0);

      } else {

        this.ddlcircuits = []; // Reset area list if no plant is selected
      }
    });

    this.cimlForm.get('corrosionLoopId')?.valueChanges.subscribe((corrosionLoopId) => {

      this.cimlForm.get('name')?.updateValueAndValidity();
      if (corrosionLoopId) {

        this.loadEquipment(this.cimlForm.get('plantId').value, this.cimlForm.get('areaId').value, this.cimlForm.get('unitId').value, this.cimlForm.get('systemId').value, this.cimlForm.get('circuitId').value, corrosionLoopId, 0);

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

    // Auto-calculate nominalThicknessCA when nominalThickness or corrosionAllowance changes
    this.cimlForm.get('nominalThickness')?.valueChanges.subscribe(() => {
      this.updateNominalThicknessCA();
    });
    this.cimlForm.get('corrosionAllowance')?.valueChanges.subscribe(() => {
      this.updateNominalThicknessCA();
    });

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
  loadComponents(plantId: number, areaId: number, unitId: number, systemId: number, corrosionLoopId: number, circuitId: number, equipmentId: number) {

    this.service.getComponent(plantId, areaId, unitId, systemId, corrosionLoopId, circuitId, equipmentId).subscribe((data: any[]) => {
      this.ddlcomponents = data;
    });
  }

  loadcorrosionLoop(plantId: number, areaId: number, unitId: number, systemId: number, corrosionLoopId: number) {

    this.service.getCorrosionLoop(plantId, areaId, unitId, systemId, corrosionLoopId).subscribe((data: any[]) => {
      this.ddlcorrosionLoops = data;
    });
  }

  loadEquipment(plantId: number, areaId: number, unitId: number, systemId: number, circuitId: number, corrosionLoopId: number, equipmentId: number) {

    this.service.getEquipment(plantId, areaId, unitId, systemId, corrosionLoopId, circuitId, equipmentId).subscribe((data: any[]) => {
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
  async loadDropdowns() {
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
      this.fireProofings = results.fireProofing;
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

  selectMinThicknessOption(option: string) {
    this.selectedMinThicknessOption = option;
  }

  updateNominalThicknessCA() {
    const nominalThicknessValue = this.cimlForm.get('nominalThickness')?.value;
    const corrosionAllowanceValue = this.cimlForm.get('corrosionAllowance')?.value;
    
    // Parse values and ensure they are valid numbers
    const nominalThickness = parseFloat(nominalThicknessValue);
    const corrosionAllowance = parseFloat(corrosionAllowanceValue);
    
    // Check if both values are valid numbers
    if (!isNaN(nominalThickness) && !isNaN(corrosionAllowance)) {
      const result = nominalThickness - corrosionAllowance;
      this.cimlForm.get('nominalThicknessCA')?.setValue(result.toFixed(2), { emitEvent: false });
    } else {
      this.cimlForm.get('nominalThicknessCA')?.setValue('', { emitEvent: false });
    }
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
  DeleteCIML() {
    Swal.fire({
      title: 'Are you sure?You want to delete this CML!',
      text: 'All data associated with this circuit will be lost',
      icon: 'warning',
      width: '300px',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteCIML(this.childValue).subscribe(
          () => this.backToCIML(),
          error =>
            Swal.fire('Delete failed:', error)
        );

      }
    });
  }

  // Thickness Inspection Methods
  initializeInspectionForms() {
    this.inspectionForm = this.fb.group({
      id: [null],
      clientId: [this.au.getClientId()],
      cmlId: [this.childValue],
      inspectionDate: ['', Validators.required],
      reading: [null],
      temperature: [null],
      thickness: [null],
      nde: [''],
      status: [1], // 1: Pending, 2: Approved, 3: Rejected
      inspectedBy: [null],
      verifiedBy: [null],
      comment: [''],
      addedBy: [this.au.getUserId()],
      isDeleted: [false],
      isActive: [true]
    });

    this.approvalForm = this.fb.group({
      approvalComment: ['', Validators.required]
    });
  }

  initializeGridColumns() {
    this.columnDefs = [
      {
        headerName: 'Inspection Date',
        field: 'inspectionDate',
        filter: 'agDateColumnFilter',
        valueFormatter: (params) => {
          if (params.value) {
            const date = new Date(params.value);
            return date.toLocaleDateString('en-GB');
          }
          return '';
        },
        filterParams: {
          comparator: (filterDate: Date, cellValue: string) => {
            if (!cellValue) return -1;
            const cellDate = new Date(cellValue);
            if (cellDate < filterDate) return -1;
            if (cellDate > filterDate) return 1;
            return 0;
          }
        },
        minWidth: 130
      },
      { headerName: 'Reading', field: 'reading', minWidth: 100 },
      { headerName: 'Temperature', field: 'temperature', minWidth: 120 },
      { headerName: 'Thickness', field: 'thickness', minWidth: 110 },
      { headerName: 'NDE', field: 'nde', minWidth: 100 },
      {
        headerName: 'Status',
        field: 'status',
        minWidth: 110,
        cellRenderer: (params: any) => {
          const status = params.value;
          let badgeClass = 'badge-secondary';
          let statusText = 'Pending';
          
          if (status === 2) {
            badgeClass = 'badge-success';
            statusText = 'Approved';
          } else if (status === 3) {
            badgeClass = 'badge-danger';
            statusText = 'Rejected';
          }
          
          return `<span class="badge ${badgeClass}">${statusText}</span>`;
        }
      },
      { headerName: 'Inspected By', field: 'inspectedByName', minWidth: 130 },
      { headerName: 'Verified By', field: 'verifiedByName', minWidth: 130 },
      { headerName: 'Comment', field: 'comment', minWidth: 150 },
      {
        headerName: 'Approval/Rejection Comment',
        field: 'approvalComment',
        minWidth: 200,
        cellRenderer: (params: any) => {
          const status = params.data.status;
          const comment = params.value;
          
          if (status === 2 || status === 3) {
            const badgeClass = status === 2 ? 'badge-success' : 'badge-danger';
            return `<span class="badge ${badgeClass}">${comment || ''}</span>`;
          }
          return '<span class="text-muted">-</span>';
        }
      },
      {
        headerName: 'Actions',
        field: 'actions',
        minWidth: 180,
        cellRenderer: (params: any) => {
          const inspection = params.data;
          const isFinalized = inspection.status === 2 || inspection.status === 3;
          const isUserInspector = this.isCurrentUserInspector(inspection);
          
          return `
            <div class="btn-group" role="group">
              <button 
                type="button" 
                class="btn btn-sm btn-info action-btn edit-btn" 
                ${isFinalized ? 'disabled' : ''}
                title="Edit">
                <i class="feather icon-edit"></i>
              </button>
              <button 
                type="button" 
                class="btn btn-sm btn-danger action-btn delete-btn" 
                ${isFinalized ? 'disabled' : ''}
                title="Delete">
                <i class="feather icon-trash"></i>
              </button>
              <button 
                type="button" 
                class="btn btn-sm btn-success action-btn approve-btn" 
                ${isFinalized || isUserInspector ? 'disabled' : ''}
                title="Approve">
                <i class="feather icon-check"></i>
              </button>
              <button 
                type="button" 
                class="btn btn-sm btn-warning action-btn reject-btn" 
                ${isFinalized || isUserInspector ? 'disabled' : ''}
                title="Reject">
                <i class="feather icon-x"></i>
              </button>
            </div>
          `;
        },
        sortable: false,
        filter: false
      }
    ];

    this.gridOptions = {
      rowData: this.thicknessInspections,
      columnDefs: this.columnDefs,
      defaultColDef: this.defaultColDef,
      pagination: true,
      paginationPageSize: 10,
      paginationPageSizeSelector: [10, 25, 50, 100],
      domLayout: 'autoHeight',
      onGridReady: (params: GridReadyEvent) => {
        params.api.sizeColumnsToFit();
      },
      getRowClass: (params) => {
        if (params.data.status === 2) {
          return 'ag-row-success';
        } else if (params.data.status === 3) {
          return 'ag-row-danger';
        }
        return '';
      },
      onCellClicked: (event) => {
        const target = event.event?.target as HTMLElement;
        if (target.closest('.edit-btn')) {
          this.editInspection(event.data);
        } else if (target.closest('.delete-btn')) {
          this.deleteInspection(event.data.id);
        } else if (target.closest('.approve-btn')) {
          this.openApprovalModal(event.data, 'approve');
        } else if (target.closest('.reject-btn')) {
          this.openApprovalModal(event.data, 'reject');
        }
      }
    };
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
  }

  refreshGrid() {
    if (this.gridApi) {
      this.gridApi.setGridOption('rowData', this.thicknessInspections);
    }
  }

  async loadInspectors() {
    try {
      this.service.getUsersForInspection().subscribe(
        (data) => {
          this.inspectors = data;
        },
        (error) => {
          console.error('Error loading inspectors:', error);
        }
      );
    } catch (error) {
      console.error('Error loading inspectors:', error);
    }
  }

  async loadThicknessInspections() {
    try {
      this.service.getThicknessInspectionsByCML(this.childValue).subscribe(
        (data) => {
          this.thicknessInspections = data;
          this.refreshGrid();
        },
        (error) => {
          console.error('Error loading inspections:', error);
          Swal.fire('Error', 'Failed to load thickness inspections', 'error');
        }
      );
    } catch (error) {
      console.error('Error loading thickness inspections:', error);
    }
  }

  openInspectionModal() {
    this.isEditMode = false;
    this.currentInspection = null;
    this.inspectionForm.reset({
      clientId: this.au.getClientId(),
      cmlId: this.childValue,
      status: 1,
      addedBy: this.au.getUserId(),
      isDeleted: false,
      isActive: true
    });
    this.showInspectionModal = true;
  }

  editInspection(inspection: any) {
    this.isEditMode = true;
    this.currentInspection = inspection;
    this.inspectionForm.patchValue(inspection);
    this.showInspectionModal = true;
  }

  closeInspectionModal() {
    this.showInspectionModal = false;
    this.inspectionForm.reset();
  }

  saveInspection() {
    if (this.inspectionForm.invalid) {
      return;
    }

    const formValue = this.inspectionForm.value;
    
    // Prepare the data with proper formatting
    const inspectionData: any = {
      id: formValue.id || 0,
      clientId: Number(this.au.getClientId()),
      cmlId: Number(this.childValue),
      inspectionDate: formValue.inspectionDate ? new Date(formValue.inspectionDate).toISOString() : new Date().toISOString(),
      reading: formValue.reading ? Number(formValue.reading) : 0,
      temperature: formValue.temperature ? Number(formValue.temperature) : 0,
      thickness: formValue.thickness ? Number(formValue.thickness) : 0,
      nde: formValue.nde || '',
      status: Number(formValue.status),
      inspectedBy: formValue.inspectedBy ? Number(formValue.inspectedBy) : 0,
      verifiedBy: formValue.verifiedBy ? Number(formValue.verifiedBy) : 0,
      comment: formValue.comment || '',
      addedBy: Number(formValue.addedBy),
      isDeleted: formValue.isDeleted || false,
      isActive: formValue.isActive !== false
    };
    
    // Add modification fields for edit mode
    if (this.isEditMode) {
      inspectionData.modifiedBy = Number(this.au.getUserId());
      inspectionData.modifiedOn = new Date().toISOString();
    }
    
    console.log('Inspection Data being sent:', inspectionData);

    if (this.isEditMode) {
      this.service.updateThicknessInspection(inspectionData.id, inspectionData).subscribe(
        () => {
          Swal.fire('Success', 'Inspection updated successfully', 'success');
          this.loadThicknessInspections();
          this.closeInspectionModal();
        },
        (error) => {
          console.error('Error updating inspection:', error);
          Swal.fire('Error', 'Failed to update inspection', 'error');
        }
      );
    } else {
      this.service.createThicknessInspection(inspectionData).subscribe(
        () => {
          Swal.fire('Success', 'Inspection added successfully', 'success');
          this.loadThicknessInspections();
          this.closeInspectionModal();
        },
        (error) => {
          console.error('Error adding inspection:', error);
          Swal.fire('Error', 'Failed to add inspection', 'error');
        }
      );
    }
  }

  deleteInspection(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this inspection?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteThicknessInspection(id).subscribe(
          () => {
            Swal.fire('Deleted!', 'Inspection has been deleted.', 'success');
            this.loadThicknessInspections();
          },
          (error) => {
            console.error('Error deleting inspection:', error);
            Swal.fire('Error', 'Failed to delete inspection', 'error');
          }
        );
      }
    });
  }

  openApprovalModal(inspection: any, action: string) {
    this.currentInspection = inspection;
    this.approvalAction = action;
    this.approvalForm.reset();
    this.showApprovalModal = true;
  }

  closeApprovalModal() {
    this.showApprovalModal = false;
    this.approvalForm.reset();
  }

  submitApproval() {
    if (this.approvalForm.invalid) {
      return;
    }

    const approvalComment = this.approvalForm.get('approvalComment')?.value;
    const newStatus = this.approvalAction === 'approve' ? 2 : 3; // 2: Approved, 3: Rejected

    this.service.updateInspectionStatus(this.currentInspection.id, newStatus, approvalComment).subscribe(
      () => {
        const message = this.approvalAction === 'approve' ? 'approved' : 'rejected';
        Swal.fire('Success', `Inspection ${message} successfully`, 'success');
        this.loadThicknessInspections();
        this.closeApprovalModal();
      },
      (error) => {
        console.error('Error updating inspection status:', error);
        Swal.fire('Error', 'Failed to update inspection status', 'error');
      }
    );
  }

  getStatusLabel(status: number): string {
    switch (status) {
      case 1:
        return 'Pending';
      case 2:
        return 'Approved';
      case 3:
        return 'Rejected';
      default:
        return 'Unknown';
    }
  }

  isCurrentUserInspector(inspection: any): boolean {
    const currentUserId = Number(this.au.getUserId());
    return inspection.inspectedBy === currentUserId;
  }
}
