import { CommonModule } from '@angular/common';
import { Component, Renderer2, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { LoadingService } from 'src/app/common/loadingPanel/loading.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CimlService } from 'src/app/services/ciml/ciml.service';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';
import { PlantService } from 'src/app/services/plant/plant.service';
import Swal from 'sweetalert2';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-ciml-edit',
  imports: [ReactiveFormsModule, CommonModule, AgGridAngular],
  templateUrl: './ciml-edit.component.html',
  styleUrl: './ciml-edit.component.scss'
})
export class CimlEditComponent implements OnDestroy {


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
  isViewMode: boolean = false;
  currentInspection: any = null;
  approvalAction: string = '';
  inspectors: any[] = [];
  verifiers: any[] = [];
  modeOfThicknessLossOptions: any[] = [];
  selectedMinThicknessOption: string = '';
  selectedCROption: string = '';
  selectedRLOption: string = '';
  selectedInspectionIntervalOption: string = '';
  selectedInspectionMethod: string = '';
  thicknessLossPercentage: number | null = null;
  calculationsLoading: boolean = false;
  thicknessReferencesChecked: boolean = false;

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
  clientData: any;
  childValue: number = 0;
  receivedData: any;
  canEdit: boolean = false;
  canDelete: boolean = false;

  private backdropEl: HTMLElement | null = null;

  constructor(private sharedDataService: SharedDataService, private service: CimlService, private ls: LoadingService, private fb: FormBuilder, private au: AuthService, private router: Router, private renderer: Renderer2, private plantService: PlantService) {
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
      weldJointStRedFact: [1],
      designfactor: [0.4],
      otherNDE: [''],
      pressureClass: [''],
      generalMaterial: [''],
      materialSpecification: [''],
      allowableStress: [''],
      nominalThickness: [''],
      baselineThickness: [''],
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
      selectedMinThicknessOption: [''],
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
      selectedCROption: [''],
      calculatedRemainingLife: [''],
      selectedRLOption: [''],
      maxRemainingLife: [''],
      minAbove2: [''],
      remainingLife: [''],
      perAPI: [''],
      halfRemainingLife: [''],
      minAbove2Interval: [''],
      defaultMinimumInterval: [''],
      manualEntry: [''],
      selectedInspectionIntervalOption: [''],
      selectedInspectionInterval: [''],
      accessible: [''],
      accessType: [''],
      internalEntry: [''],
      insulationRemovalRequired: ['']
    });
  }
  async loadDetails() {
    this.service.getCIMLDetails(this.childValue).subscribe(data => {
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
        weldJointStRedFact: data.weldJointStRedFact ?? 1,
        designfactor: data.designfactor ?? 0.4,
        otherNDE: data.otherNDE || '',
        pressureClass: data.pressureClass || '',
        generalMaterial: data.generalMaterial || '',
        materialSpecification: data.materialSpecification || '',
        allowableStress: data.allowableStress || '',
        nominalThickness: data.nominalThickness || '',
        baselineThickness: data.baselineThickness || '',
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
        selectedMinThicknessOption: data.selectedMinThicknessOption || '',
        selectedCROption: data.selectedCROption || '',
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
        selectedRLOption: data.selectedRLOption || '',
        maxRemainingLife: data.maxRemainingLife || '',
        minAbove2: data.minAbove2 || '',
        remainingLife: data.remainingLife || '',
        perAPI: data.perAPI || '',
        halfRemainingLife: data.halfRemainingLife || '',
        minAbove2Interval: data.minAbove2Interval || '',
        defaultMinimumInterval: data.defaultMinimumInterval || '',
        manualEntry: data.manualEntry || '',
        selectedInspectionIntervalOption: data.selectedInspectionIntervalOption || '',
        selectedInspectionInterval: data.selectedInspectionInterval || '',
        accessible: data.accessible || '',
        accessType: data.accessType || '',
        internalEntry: data.internalEntry || '',
        insulationRemovalRequired: data.insulationRemovalRequired || ''
      });

      if (data.selectedMinThicknessOption) {
        this.selectedMinThicknessOption = data.selectedMinThicknessOption;
      }
      if (data.selectedCROption) {
        this.selectedCROption = data.selectedCROption;
      }
      if (data.selectedRLOption) {
        this.selectedRLOption = data.selectedRLOption;
      }
      if (data.selectedInspectionIntervalOption) {
        this.selectedInspectionIntervalOption = data.selectedInspectionIntervalOption;
      }
      const inspectionMethods = ['cvi', 'utg', 'uts', 'rt', 'prt', 'mfl', 'pec', 'other'];
      const activeMethod = inspectionMethods.find(m => data[m] === true);
      if (activeMethod) {
        this.selectedInspectionMethod = activeMethod;
      }

      this.dataLoaded = true;
      this.applyRecentApprovedCR();
      this.syncCRForRL();
      this.syncMinAbove2RL();
      this.syncRemainingLife();
      this.syncMinAbove2Interval();
      this.syncSelectedInspectionInterval();
    });
  }

  async ngOnInit() {
    this.ls.showLoading();
    this.initializeInspectionForms();
    this.subscribeToInspectionCalculations();
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
        this.plantService.getPlantDetails(plantId).subscribe({
          next: (plant: any) => {
            if (plant?.defaultMinimumThickness != null) {
              this.cimlForm.get('defaultMinimumThickness')?.setValue(plant.defaultMinimumThickness, { emitEvent: false });
            }
            if (plant?.minOrDefaultCR != null) {
              this.cimlForm.get('minOrDefaultCR')?.setValue(plant.minOrDefaultCR, { emitEvent: false });
            }
            if (plant?.maxRemainingLife != null) {
              this.cimlForm.get('maxRemainingLife')?.setValue(plant.maxRemainingLife, { emitEvent: false });
              this.syncMinAbove2RL();
            }
            if (plant?.minimumInspectionInterval != null) {
              this.cimlForm.get('defaultMinimumInterval')?.setValue(plant.minimumInspectionInterval, { emitEvent: false });
            }
          },
          error: () => {}
        });
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
    this.cimlForm.get('nominalThickness')?.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => this.updateNominalThicknessCA());
    this.cimlForm.get('corrosionAllowance')?.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => this.updateNominalThicknessCA());

    // Auto-update Structural Minimum Thickness when NPS, Pressure Class, Material, or Temperature changes
    const updateStructuralMinThk = () => {
      const materialId = parseInt(this.cimlForm.get('generalMaterial')?.value, 10);
      const pressureClass = parseInt(this.cimlForm.get('pressureClass')?.value, 10);
      const nps = parseFloat(this.cimlForm.get('nps')?.value);
      const designTemp = parseFloat(this.cimlForm.get('designTemperatureMax')?.value);
      if (materialId > 0 && pressureClass > 0 && nps > 0) {
        this.service.getStructuralMinThicknessByMaterial(materialId, pressureClass, nps, isNaN(designTemp) ? undefined : designTemp)
          .subscribe({
            next: (value: any) => {
              this.cimlForm.get('structuralMinimumThk')?.setValue(value, { emitEvent: false });
            },
            error: () => {}
          });
      }
    };

    this.cimlForm.get('nps')?.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(() => updateStructuralMinThk());
    this.cimlForm.get('pressureClass')?.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(() => updateStructuralMinThk());
    this.cimlForm.get('generalMaterial')?.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(() => updateStructuralMinThk());
    this.cimlForm.get('designTemperatureMax')?.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(() => updateStructuralMinThk());

    // Auto-calculate Calculated (Internal Pressure) when any relevant field changes
    const updateInternalPressure = () => {
      const equipmentType = parseInt(this.cimlForm.get('cml_Type')?.value, 10);
      const equipmentCategory = parseInt(this.cimlForm.get('cml_Category')?.value, 10);
      if (!equipmentType || !equipmentCategory) return;

      const payload: any = { equipmentType, equipmentCategory };

      const designPressure = parseFloat(this.cimlForm.get('designPressureInternal')?.value);
      if (!isNaN(designPressure)) payload.designPressure = designPressure;

      const outsideDiameter = parseFloat(this.cimlForm.get('outsideDiameter')?.value);
      if (!isNaN(outsideDiameter)) payload.outsideDiameter = outsideDiameter;

      const allowableStress = parseFloat(this.cimlForm.get('allowableStress')?.value);
      if (!isNaN(allowableStress)) payload.allowableStress = allowableStress;

      const jointEfficiency = parseFloat(this.cimlForm.get('jointEfficiency')?.value);
      if (!isNaN(jointEfficiency)) payload.jointEfficiency = jointEfficiency;

      const weldJointStRedFact = parseFloat(this.cimlForm.get('weldJointStRedFact')?.value);
      if (!isNaN(weldJointStRedFact)) payload.weldJointStRedFact = weldJointStRedFact;

      const designFactor = parseFloat(this.cimlForm.get('designfactor')?.value);
      if (!isNaN(designFactor)) payload.designFactor = designFactor;

      const lengthHeight = parseFloat(this.cimlForm.get('lengthHeight')?.value);
      if (!isNaN(lengthHeight)) payload.length = lengthHeight;

      this.service.calculateInternalPressureThickness(payload).subscribe({
        next: (res: any) => {
          this.cimlForm.get('calculatedInternalPressure')?.setValue(
            res.calculatedInternalPressure ?? '', { emitEvent: false }
          );
        },
        error: () => {}
      });
    };

    ['designPressureInternal', 'outsideDiameter', 'allowableStress', 'jointEfficiency',
     'weldJointStRedFact', 'designfactor', 'lengthHeight', 'cml_Type', 'cml_Category', 'nominalThickness']
      .forEach(field =>
        this.cimlForm.get(field)?.valueChanges
          .pipe(debounceTime(400), distinctUntilChanged())
          .subscribe(() => updateInternalPressure())
      );

    const updateMaxStructuralCalculated = () => {
      const vals = [
        parseFloat(this.cimlForm.get('structuralMinimumThk')?.value),
        parseFloat(this.cimlForm.get('calculatedInternalPressure')?.value),
        parseFloat(this.cimlForm.get('calculatedExternalPressure')?.value)
      ].filter(v => !isNaN(v));
      const max = vals.length > 0 ? Math.max(...vals) : null;
      this.cimlForm.get('maxStructuralCalculated')?.setValue(max !== null ? max.toFixed(2) : '', { emitEvent: false });
    };

    ['structuralMinimumThk', 'calculatedInternalPressure', 'calculatedExternalPressure']
      .forEach(field =>
        this.cimlForm.get(field)?.valueChanges
          .pipe(debounceTime(400), distinctUntilChanged())
          .subscribe(() => updateMaxStructuralCalculated())
      );

    const updateMaximumOfAbove = () => {
      const vals = [
        parseFloat(this.cimlForm.get('nominalThicknessCA')?.value),
        parseFloat(this.cimlForm.get('defaultMinimumThickness')?.value),
        parseFloat(this.cimlForm.get('structuralMinimumThk')?.value),
        parseFloat(this.cimlForm.get('calculatedInternalPressure')?.value),
        parseFloat(this.cimlForm.get('calculatedExternalPressure')?.value),
        parseFloat(this.cimlForm.get('maxStructuralCalculated')?.value)
      ].filter(v => !isNaN(v));
      const max = vals.length > 0 ? Math.max(...vals) : null;
      this.cimlForm.get('maximumOfAbove')?.setValue(max !== null ? max.toFixed(2) : '', { emitEvent: false });
    };

    ['nominalThicknessCA', 'defaultMinimumThickness', 'structuralMinimumThk',
     'calculatedInternalPressure', 'calculatedExternalPressure', 'maxStructuralCalculated']
      .forEach(field =>
        this.cimlForm.get(field)?.valueChanges
          .pipe(debounceTime(400), distinctUntilChanged())
          .subscribe(() => updateMaximumOfAbove())
      );

    const updateMaxAbove2 = () => {
      const vals = [
        parseFloat(this.cimlForm.get('ltcr')?.value),
        parseFloat(this.cimlForm.get('stcr')?.value)
      ].filter(v => !isNaN(v));
      const max = vals.length > 0 ? Math.max(...vals) : null;
      this.cimlForm.get('maxAbove2')?.setValue(max !== null ? max.toFixed(4) : '', { emitEvent: false });
    };

    ['ltcr', 'stcr'].forEach(field =>
      this.cimlForm.get(field)?.valueChanges
        .pipe(debounceTime(400), distinctUntilChanged())
        .subscribe(() => updateMaxAbove2())
    );

    ['nominalThicknessCA', 'defaultMinimumThickness', 'structuralMinimumThk',
     'calculatedInternalPressure', 'calculatedExternalPressure', 'maxStructuralCalculated',
     'maximumOfAbove', 'manual']
      .forEach(field =>
        this.cimlForm.get(field)?.valueChanges
          .pipe(debounceTime(400), distinctUntilChanged())
          .subscribe(() => this.syncSelectedMinReqThk())
      );

    ['ltcr', 'stcr', 'maxAbove2', 'designCR', 'minOrDefaultCR']
      .forEach(field =>
        this.cimlForm.get(field)?.valueChanges
          .pipe(debounceTime(400), distinctUntilChanged())
          .subscribe(() => this.syncCRForRL())
      );

    this.cimlForm.get('crForRL')?.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(value => {
        const parsed = parseFloat(value);
        this.cimlForm.get('calculatedRemainingLife')?.setValue(
          !isNaN(parsed) ? parsed.toFixed(4) : '', { emitEvent: false }
        );
        this.syncMinAbove2RL();
      });

    this.cimlForm.get('maxRemainingLife')?.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(() => this.syncMinAbove2RL());

    ['perAPI', 'halfRemainingLife'].forEach(field =>
      this.cimlForm.get(field)?.valueChanges
        .pipe(debounceTime(400), distinctUntilChanged())
        .subscribe(() => this.syncMinAbove2Interval())
    );

    ['defaultMinimumInterval', 'manualEntry'].forEach(field =>
      this.cimlForm.get(field)?.valueChanges
        .pipe(debounceTime(400), distinctUntilChanged())
        .subscribe(() => this.syncSelectedInspectionInterval())
    );

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
          text: 'CIML updated successfully',
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
    this.cimlForm.get('selectedMinThicknessOption')?.setValue(option, { emitEvent: false });
    this.syncSelectedMinReqThk();
  }

  syncSelectedMinReqThk() {
    if (!this.selectedMinThicknessOption) return;
    const value = parseFloat(this.cimlForm.get(this.selectedMinThicknessOption)?.value);
    this.cimlForm.get('selectedMinReqThk')?.setValue(!isNaN(value) ? value.toFixed(2) : '', { emitEvent: false });
  }

  selectCROption(option: string) {
    this.selectedCROption = option;
    this.cimlForm.get('selectedCROption')?.setValue(option, { emitEvent: false });
    this.syncCRForRL();
  }

  syncCRForRL() {
    if (!this.selectedCROption) return;
    const value = parseFloat(this.cimlForm.get(this.selectedCROption)?.value);
    this.cimlForm.get('crForRL')?.setValue(!isNaN(value) ? value.toFixed(4) : '', { emitEvent: false });
  }

  syncMinAbove2RL() {
    const calc = parseFloat(this.cimlForm.get('calculatedRemainingLife')?.value);
    const maxRL = parseFloat(this.cimlForm.get('maxRemainingLife')?.value);
    const vals = [calc, maxRL].filter(v => !isNaN(v));
    const min = vals.length > 0 ? Math.min(...vals) : null;
    this.cimlForm.get('minAbove2')?.setValue(min !== null ? min.toFixed(4) : '', { emitEvent: false });
    this.syncRemainingLife();
  }

  syncMinAbove2Interval() {
    const perAPI = parseFloat(this.cimlForm.get('perAPI')?.value);
    const halfRL = parseFloat(this.cimlForm.get('halfRemainingLife')?.value);
    const vals = [perAPI, halfRL].filter(v => !isNaN(v));
    const min = vals.length > 0 ? Math.min(...vals) : null;
    this.cimlForm.get('minAbove2Interval')?.setValue(min !== null ? min.toFixed(4) : '', { emitEvent: false });
    this.syncSelectedInspectionInterval();
  }

  selectInspectionIntervalOption(option: string) {
    this.selectedInspectionIntervalOption = option;
    this.cimlForm.get('selectedInspectionIntervalOption')?.setValue(option, { emitEvent: false });
    this.syncSelectedInspectionInterval();
  }

  syncSelectedInspectionInterval() {
    if (!this.selectedInspectionIntervalOption) return;
    const value = parseFloat(this.cimlForm.get(this.selectedInspectionIntervalOption)?.value);
    this.cimlForm.get('selectedInspectionInterval')?.setValue(!isNaN(value) ? value.toFixed(4) : '', { emitEvent: false });
  }

  selectRLOption(option: string) {
    this.selectedRLOption = option;
    this.cimlForm.get('selectedRLOption')?.setValue(option, { emitEvent: false });
    this.syncRemainingLife();
  }

  selectInspectionMethod(method: string) {
    const methods = ['cvi', 'utg', 'uts', 'rt', 'prt', 'mfl', 'pec', 'other'];
    if (this.selectedInspectionMethod === method) {
      this.selectedInspectionMethod = '';
      methods.forEach(m => this.cimlForm.get(m)?.setValue(false, { emitEvent: false }));
    } else {
      this.selectedInspectionMethod = method;
      methods.forEach(m => this.cimlForm.get(m)?.setValue(m === method, { emitEvent: false }));
    }
  }

  syncRemainingLife() {
    if (!this.selectedRLOption) return;
    const value = parseFloat(this.cimlForm.get(this.selectedRLOption)?.value);
    this.cimlForm.get('remainingLife')?.setValue(!isNaN(value) ? value.toFixed(4) : '', { emitEvent: false });
  }

  updateNominalThicknessCA() {
    const nominalThickness = parseFloat(this.cimlForm.get('nominalThickness')?.value);
    const corrosionAllowance = parseFloat(this.cimlForm.get('corrosionAllowance')?.value) || 0;

    if (!isNaN(nominalThickness)) {
      const result = nominalThickness - corrosionAllowance;
      this.cimlForm.get('nominalThicknessCA')?.setValue(result.toFixed(2), { emitEvent: false });
    } else {
      this.cimlForm.get('nominalThicknessCA')?.setValue('', { emitEvent: false });
    }
  }

  performThicknessCalculations(measuredThickness: number, measuredDate: string): void {
    if (!measuredThickness || !measuredDate) {
      Swal.fire('Validation', 'Measured thickness and date are required for calculations.', 'warning');
      return;
    }

    this.ls.showLoading();

    forkJoin({
      stcr: this.service.calculateSTCR(this.childValue, measuredThickness, measuredDate),
      ltcr: this.service.calculateLTCR(this.childValue, measuredThickness, measuredDate),
      remainingCA: this.service.calculateRemainingCA(this.childValue, measuredThickness),
      thicknessLoss: this.service.calculateThicknessLoss(this.childValue, measuredThickness),
      baselineThickness: this.service.getBaselineThickness(this.childValue),
      nominalThickness: this.service.getNominalThickness(this.childValue)
    }).subscribe({
      next: (results) => {
        this.cimlForm.patchValue({
          stcr: results.stcr?.stcr ?? '',
          ltcr: results.ltcr?.ltcr ?? '',
          calculatedRemainingLife: results.remainingCA?.remainingCA ?? '',
          baselineThickness: results.baselineThickness?.baselineThickness ?? '',
          nominalThickness: results.nominalThickness?.nominalThickness ?? ''
        }, { emitEvent: false });

        this.thicknessLossPercentage = results.thicknessLoss?.thicknessLossPercentage ?? null;

        this.ls.hideLoading();
        Swal.fire('Success', 'Thickness calculations completed successfully.', 'success');
      },
      error: (error) => {
        this.ls.hideLoading();
        console.error('Error performing thickness calculations:', error);
        Swal.fire('Error', 'Failed to perform thickness calculations.', 'error');
      }
    });
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
        this.service.deleteCIML(this.childValue).subscribe({
          next: () => this.backToCIML(),
          error: (err) => Swal.fire('Delete failed:', err)
        });

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
      modeOfThicknessLoss: [null],
      nde: [''],
      status: [1], // 1: Pending, 2: Approved, 3: Rejected
      inspectedBy: [null],
      verifiedBy: [null],
      comment: [''],
      addedBy: [this.au.getUserId()],
      isDeleted: [false],
      isActive: [true],
      stcr: [null],
      ltcr: [null],
      remainingCA: [null],
      thicknessLossPercentage: [null],
      calcBaselineThickness: [null],
      calcNominalThickness: [null],
      remainingLifeLTCR: [null],
      remainingLifeSTCR: [null],
      minThickness: [null]
    });

    this.approvalForm = this.fb.group({
      approvalComment: ['', Validators.required]
    });
  }

  subscribeToInspectionCalculations(): void {
    const triggerCalc = () => {
      const thickness = Number(this.inspectionForm.get('thickness')?.value);
      const inspectionDate = this.inspectionForm.get('inspectionDate')?.value as string;
      if (thickness > 0 && inspectionDate) {
        this.performInspectionCalculations(thickness, inspectionDate);
      }
    };

    this.inspectionForm.get('thickness')?.valueChanges.pipe(
      debounceTime(600),
      distinctUntilChanged()
    ).subscribe((value) => {
      if (value != null && value !== '') {
      
      }
      triggerCalc();
    });

    this.inspectionForm.get('inspectionDate')?.valueChanges.pipe(
      debounceTime(600),
      distinctUntilChanged()
    ).subscribe(() => triggerCalc());
  }

  performInspectionCalculations(measuredThickness: number, measuredDate: string): void {
    this.calculationsLoading = true;

    forkJoin({
      stcr: this.service.calculateSTCR(this.childValue, measuredThickness, measuredDate).pipe(catchError(() => of(null))),
      ltcr: this.service.calculateLTCR(this.childValue, measuredThickness, measuredDate).pipe(catchError(() => of(null))),
      remainingCA: this.service.calculateRemainingCA(this.childValue, measuredThickness).pipe(catchError(() => of(null))),
      thicknessLoss: this.service.calculateThicknessLoss(this.childValue, measuredThickness).pipe(catchError(() => of(null))),
      baselineThickness: this.service.getBaselineThickness(this.childValue).pipe(catchError(() => of(null))),
      nominalThickness: this.service.getNominalThickness(this.childValue).pipe(catchError(() => of(null)))
    }).subscribe({
      next: (results) => {
        const round4 = (v: number | null) => v != null ? parseFloat(v.toFixed(4)) : null;

        const remainingCA = round4(results.remainingCA?.remainingCA ?? null);
        const ltcr = round4(results.ltcr?.ltcr ?? null);
        const stcr = round4(results.stcr?.stcr ?? null);

        const remainingLifeLTCR = round4((remainingCA != null && ltcr != null && ltcr !== 0)
          ? remainingCA / ltcr : null);
        const remainingLifeSTCR = round4((remainingCA != null && stcr != null && stcr !== 0)
          ? remainingCA / stcr : null);

        const thicknessLossPercentage = round4(results.thicknessLoss?.thicknessLossPercentage ?? null);
        const calcBaselineThickness = round4(results.baselineThickness?.baselineThickness ?? null);
        const calcNominalThickness = round4(results.nominalThickness?.nominalThickness ?? null);

        const calcValues = [
          stcr, ltcr, remainingCA, thicknessLossPercentage, calcBaselineThickness, calcNominalThickness
        ].filter((v): v is number => v !== null);
        const minThickness = round4(calcValues.length > 0 ? Math.min(...calcValues) : null);

        this.inspectionForm.patchValue({
          stcr,
          ltcr,
          remainingCA,
          thicknessLossPercentage,
          calcBaselineThickness,
          calcNominalThickness,
          remainingLifeLTCR,
          remainingLifeSTCR,
          minThickness
        }, { emitEvent: false });
        this.calculationsLoading = false;
      },
      error: () => {
        this.calculationsLoading = false;
      }
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
      { headerName: 'Min Thickness', field: 'minThickness', minWidth: 120 },
      { headerName: 'Mode of Thickness Loss', field: 'modeOfThicknessLossName', minWidth: 170 },
      { headerName: 'NDE', field: 'nde', minWidth: 100 },
      {
        headerName: 'Status',
        field: 'status',
        minWidth: 110,
        cellRenderer: (params: any) => {
          const status = Number(params.value);
          let badgeClass = 'bg-secondary';
          let statusText = 'Pending';

          if (status === 2) {
            badgeClass = 'bg-success';
            statusText = 'Approved';
          } else if (status === 3) {
            badgeClass = 'bg-danger';
            statusText = 'Rejected';
          }

          return `<span class="badge ${badgeClass}">${statusText}</span>`;
        }
      },
      //{ headerName: 'Inspected By', field: 'inspectedByName', minWidth: 130 },
      { headerName: 'Verified By', field: 'verifiedByName', minWidth: 130 },
      // { headerName: 'Entered By', field: 'addedByName', minWidth: 130 },
      { headerName: 'Comment', field: 'comment', minWidth: 150 },
      {
        headerName: 'Approval/Rejection Comment',
        field: 'approvalComment',
        minWidth: 200,
        cellRenderer: (params: any) => {
          const status = Number(params.data.status);
          const comment = params.value;

          if (status === 2 || status === 3) {
            const badgeClass = status === 2 ? 'bg-success' : 'bg-danger';
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
          const isFinalized = Number(inspection.status) === 2 || Number(inspection.status) === 3;
          const isUserInspector = this.isCurrentUserInspector(inspection);
          
          if (isFinalized) {
            return `
              <div class="btn-group" role="group">
                <button type="button" class="btn btn-sm btn-secondary action-btn view-btn" title="View">
                  <i class="feather icon-eye"></i>
                </button>
              </div>
            `;
          }

          return `
            <div class="btn-group" role="group">
              <button
                type="button"
                class="btn btn-sm btn-info action-btn edit-btn"
                title="Edit">
                <i class="feather icon-edit"></i>
              </button>
              <button
                type="button"
                class="btn btn-sm btn-danger action-btn delete-btn"
                title="Delete">
                <i class="feather icon-trash"></i>
              </button>
              <button
                type="button"
                class="btn btn-sm btn-success action-btn approve-btn"
                ${isUserInspector ? 'disabled' : ''}
                title="Approve">
                <i class="feather icon-check"></i>
              </button>
              <button
                type="button"
                class="btn btn-sm btn-warning action-btn reject-btn"
                ${isUserInspector ? 'disabled' : ''}
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
        if (Number(params.data.status) === 2) {
          return 'ag-row-success';
        } else if (Number(params.data.status) === 3) {
          return 'ag-row-danger';
        }
        return '';
      },
      onCellClicked: (event) => {
        const target = event.event?.target as HTMLElement;
        if (target.closest('.view-btn')) {
          this.viewInspection(event.data);
        } else if (target.closest('.edit-btn')) {
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
      this.service.getUsersForInspection().subscribe({
        next: (data) => { this.inspectors = data; },
        error: (error) => { console.error('Error loading inspectors:', error); }
      });
      this.service.getModeOfThicknessLoss().subscribe({
        next: (data) => { this.modeOfThicknessLossOptions = data; },
        error: (error) => { console.error('Error loading mode of thickness loss options:', error); }
      });
    } catch (error) {
      console.error('Error loading inspectors:', error);
    }
  }

  async loadThicknessInspections() {
    try {
      this.service.getThicknessInspectionsByCML(this.childValue).subscribe({
        next: (data) => {
          debugger;
          this.thicknessInspections = data;
          this.refreshGrid();
          this.applyRecentApprovedCR();
        },
        error: (error) => {
          console.error('Error loading inspections:', error);
          Swal.fire('Error', 'Failed to load thickness inspections', 'error');
        }
      });
    } catch (error) {
      console.error('Error loading thickness inspections:', error);
    }
  }

  applyRecentApprovedCR() {
    if (!this.thicknessInspections?.length) return;
    const approved = this.thicknessInspections.find(i => Number(i.status) === 2);
    if (!approved) return;
    const ltcr = approved.ltcr ?? null;
    const stcr = approved.stcr ?? null;
    this.cimlForm.patchValue({ ltcr: ltcr ?? '', stcr: stcr ?? '' });
  }

  private showBackdrop() {
    this.backdropEl = this.renderer.createElement('div');
    this.renderer.addClass(this.backdropEl, 'insp-backdrop');
    this.renderer.appendChild(document.body, this.backdropEl);
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
    setTimeout(() => this.backdropEl && this.renderer.addClass(this.backdropEl, 'insp-backdrop--visible'), 10);
  }

  private hideBackdrop() {
    if (this.backdropEl) {
      this.renderer.removeClass(this.backdropEl, 'insp-backdrop--visible');
      setTimeout(() => {
        if (this.backdropEl) {
          this.renderer.removeChild(document.body, this.backdropEl);
          this.backdropEl = null;
        }
      }, 250);
    }
    this.renderer.removeStyle(document.body, 'overflow');
  }

  ngOnDestroy() {
    this.hideBackdrop();
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
    this.showBackdrop();
  }

  editInspection(inspection: any) {
    this.isEditMode = true;
    this.isViewMode = false;
    this.currentInspection = inspection;
    this.inspectionForm.patchValue({
      ...inspection,
      inspectionDate: inspection.inspectionDate ? new Date(inspection.inspectionDate).toISOString().split('T')[0] : ''
    }, { emitEvent: false });
    this.inspectionForm.enable({ emitEvent: false });
    this.showInspectionModal = true;
    this.showBackdrop();
  }

  viewInspection(inspection: any) {
    this.isEditMode = false;
    this.isViewMode = true;
    this.currentInspection = inspection;
    this.inspectionForm.patchValue({
      ...inspection,
      inspectionDate: inspection.inspectionDate ? new Date(inspection.inspectionDate).toISOString().split('T')[0] : ''
    }, { emitEvent: false });
    this.inspectionForm.disable({ emitEvent: false });
    this.showInspectionModal = true;
    this.showBackdrop();
  }

  closeInspectionModal() {
    this.isViewMode = false;
    this.inspectionForm.enable({ emitEvent: false });
    this.showInspectionModal = false;
    this.inspectionForm.reset({}, { emitEvent: false });
    this.hideBackdrop();
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
      modeOfThicknessLoss: formValue.modeOfThicknessLoss ? Number(formValue.modeOfThicknessLoss) : null,
      nde: formValue.nde || '',
      stcr: formValue.stcr != null ? Number(formValue.stcr) : null,
      ltcr: formValue.ltcr != null ? Number(formValue.ltcr) : null,
      remainingCA: formValue.remainingCA != null ? Number(formValue.remainingCA) : null,
      thicknessLossPercentage: formValue.thicknessLossPercentage != null ? Number(formValue.thicknessLossPercentage) : null,
      calcBaselineThickness: formValue.calcBaselineThickness != null ? Number(formValue.calcBaselineThickness) : null,
      calcNominalThickness: formValue.calcNominalThickness != null ? Number(formValue.calcNominalThickness) : null,
      remainingLifeLTCR: formValue.remainingLifeLTCR != null ? Number(formValue.remainingLifeLTCR) : null,
      remainingLifeSTCR: formValue.remainingLifeSTCR != null ? Number(formValue.remainingLifeSTCR) : null,
      minThickness: formValue.minThickness != null ? Number(formValue.minThickness) : null,
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
      this.service.updateThicknessInspection(inspectionData.id, inspectionData).subscribe({
        next: () => {
          Swal.fire('Success', 'Inspection updated successfully', 'success');
          this.loadThicknessInspections();
          this.closeInspectionModal();
        },
        error: (error) => {
          console.error('Error updating inspection:', error);
          Swal.fire('Error', 'Failed to update inspection', 'error');
        }
      });
    } else {
      this.service.createThicknessInspection(inspectionData).subscribe({
        next: () => {
          Swal.fire('Success', 'Inspection added successfully', 'success');
          this.loadThicknessInspections();
          this.closeInspectionModal();
        },
        error: (error) => {
          console.error('Error adding inspection:', error);
          Swal.fire('Error', 'Failed to add inspection', 'error');
        }
      });
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
        this.service.deleteThicknessInspection(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'Inspection has been deleted.', 'success');
            this.loadThicknessInspections();
          },
          error: (error) => {
            console.error('Error deleting inspection:', error);
            Swal.fire('Error', 'Failed to delete inspection', 'error');
          }
        });
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

    this.service.updateInspectionStatus(this.currentInspection.id, newStatus, approvalComment).subscribe({
      next: () => {
        const message = this.approvalAction === 'approve' ? 'approved' : 'rejected';
        Swal.fire('Success', `Inspection ${message} successfully`, 'success');
        this.loadThicknessInspections();
        this.closeApprovalModal();
      },
      error: (error) => {
        console.error('Error updating inspection status:', error);
        Swal.fire('Error', 'Failed to update inspection status', 'error');
      }
    });
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

  onInspectionsTabClick(): void {
    if (this.thicknessReferencesChecked) return;

    this.service.checkThicknessReferences(this.childValue).subscribe({
      next: (res: any) => {
        this.thicknessReferencesChecked = true;

        if (!res.hasNominalThickness && !res.hasBaselineThickness) {
          Swal.fire({
            title: 'No Reference Thickness Found',
            html: 'Both <b>Nominal Thickness</b> and <b>Baseline Thickness</b> are missing or zero for this CIML.<br><br>' +
                  'Calculations (Thickness Loss, Remaining CA, LTCR, STCR) will not be available until a valid reference thickness is set.',
            icon: 'warning',
            confirmButtonText: 'OK'
          });
        } else if (!res.hasBaselineThickness) {
          Swal.fire({
            title: 'Baseline Thickness Not Set',
            html: `<b>Baseline Thickness</b> is not set for this CIML.<br><br>` +
                  `Calculations will use <b>Nominal Thickness (${res.nominalThickness} mm)</b> as the reference.`,
            icon: 'info',
            confirmButtonText: 'OK'
          });
        }
      },
      error: () => {
        this.thicknessReferencesChecked = true;
      }
    });
  }
}
