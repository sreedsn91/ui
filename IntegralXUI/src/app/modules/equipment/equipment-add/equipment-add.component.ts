import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EquipmentService } from 'src/app/services/equipment/equipment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-equipment-add',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './equipment-add.component.html',
  styleUrl: './equipment-add.component.scss'
})
export class EquipmentAddComponent {
  backToEquipment() {
    this.router.navigate(['/clientequipment/list']);
  }

  documentPreviews: File[] = [];
  expand = true
  showGeneral: boolean = this.expand;
  showDocument: boolean = this.expand;
  showDeadLeg: boolean = this.expand;
  showMaintenance: boolean = this.expand;
  showSoilSide: boolean = this.expand;
  showProductSide: boolean = this.expand;
  showLocation: boolean = this.expand;;
  showDesign: boolean = this.expand;;
  showGeometry: boolean = this.expand;;
  showOperation: boolean = this.expand;;
  showFabrication: boolean = this.expand;;
  showMaterial: boolean = this.expand;;
  showExternal: boolean = this.expand;;
  showSafety: boolean = this.expand;;
  showIntegrity: boolean = this.expand;;
  showInspectionSchedule: boolean = this.expand;;
  showMaintenanceSchedule: boolean = this.expand;;
  showIntegration: boolean = this.expand;;
  showAuditInfo: boolean = this.expand;;


  plants: any[] = [];
  areas: any[] = [];
  units: any[] = [];
  systems: any[] = [];
  circuits: any[] = [];
  designCodes: any[] = [];
  editionAddendums: any[] = [];
  complianceCertifications: any[] = [];


  canAdd: boolean = false;
  equipmentForm!: FormGroup;
  selectedType: string = '';
  selectedTypeId: number = 0;
  equipmentCategoryList: any;
  equipmentTypeList: any;
  subCategoryList: any;
  operationalStatusList: any;
  operationalStatus: any;
  tankOperationalStatus: any;
  toxicRisk: any;
  toxicFluid: any;
  syncStatus: any;
  supportType: any;
  subCategory: any;
  shellLiningType: any;
  shellJointCategory: any;
  seismicZoneClassification: any;
  schedule: any;
  rpbType: any;
  roofCategory: any;
  radiographyCategory: any;
  productSideCondition: any;
  processEnvironment: any;
  yesNo: any;
  yesNoNa: any;
  pressureTestType: any;
  orientation: any;
  mitigationSystem: any;
  materialCertification: any;
  liningType: any;
  isolationSystem: any;
  insulationType: any;
  insulationMaterial: any;
  inspectionAccess: any;
  heatTreatmentType: any;
  heatTreatment: any;
  head2Type: any;
  head1Type: any;
  hazardClassification: any;
  geometry: any;
  materialShell: any;
  materialBottomPlate: any;
  materialAnnularPlate: any;
  generalMaterial: any;
  foundationCategory: any;
  fluidPhase: any;
  floorCategory: any;
  fireExplosionRisk: any;
  fabricationGeometry: any;
  externalEnvironment: any;
  externalCoatingType: any;
  equipmentType: any;
  equipmentCategory: any;
  editionAddendum: any;
  detectionSystem: any;
  designCode: any;
  deadLegType: any;
  deadLegCriticality: any;
  deadLegCategory: any;

  currentInspectionStrategy: any;
  cuiPotential: any;
  criticality: any;
  corrosivity: any;
  corrosionMonitoringType: any;
  complianceCertification: any;
  claddingType: any;
  claddingMaterial: any;
  cathodicProtectionType: any;
  bottomType: any;
  bottomLiningType: any;
  astPadType: any;
  astDrainageType: any;


  constructor(private equipmentService: EquipmentService, private fb: FormBuilder, private au: AuthService, private router: Router) {
    this.canAdd = (this.au.getCanAdd());

  }

  ngOnInit(): void {
    this.equipmentForm = this.fb.group({
      // General Info
      id: [0],
      name: [null, Validators.required],
      equipmentDescription: [null, Validators.required],
      equipmentCategory: [0],
      equipmentType: [0],
      subCategory: [0],
      commissioningDate: [null],
      builtDate: [null],
      operationalStatus: [0],
      bottomLiningId: [null],
      bottomLiningTypeId: [null],
      // Location
      plantID: [null, Validators.required],
      areaID: [0],
      unitID: [0],
      systemID: [0],
      circuitID: [0],
      corrosionLoopID: [''],
      specificLocation: [''],
      pipeFrom: [''],
      pipeTo: [''],
      pfd: [''],
      pAndID: [''],
      isometricDrawing: [''],
      gaDrawing: [''],
      inserviceStartDate: [null],
      storageFluid: [''],
      // Design
      designCode: [0],
      editionAddendum: [0],
      designPressureInternal: [],
      designPressureExternal: [],
      designTemperatureMax: [],
      designTemperatureMDMT: [],
      mawp: [],
      designLife: [],
      primaryProducts: [''],
      marginPerDay: [''],
      complianceCertification: [0],
      governingRegulatoryBody: [''],
      roofCategoryId: [null],
      shellJointcategoryId: [null],
      floorCategoryId: [null],
      foundationCategoryId: [null],

      // Geometry
      geometry: [0],
      nominalSizeNPS: [''],
      insideDiameter: [],
      outsideDiameter: [],
      lengthHeight: [],
      fillHeight: [null],
      orientation: [0],
      emptyWeight: [],
      capacity: [],
      head1Type: [0],
      head2Type: [0],

      // Operation
      operatingPressureMax: [],
      operatingPressureAvg: [],
      operatingTempMax: [],
      operatingTempMin: [],
      processFluid: [''],
      fluidComposition: [''],
      fluidPhase: [0],
      inventoryVolume: [],
      density: [''],
      viscosity: [''],
      specificGravity: [],
      flowRate: [],
      velocity: [],
      corrosivity: [0],
      ph: [],
      processEnvironment: [0],
      toxicMixture: [0],
      toxicFluid: [0],
      flammability: [0],
      operatingWeight: [],
      criticality: [0],
      humidityLevel: [],
      seismicZoneClassification: [0],
      fireExplosionRisk: [0],
      toxicRisk: [0],
      totalPopulation: [],
      populationDensity: [],

      // Fabrication
      manufacturer: [''],
      serialNumber: [''],
      warrantyDate: [null],
      heatTreatment: [0],
      heatTreatmentType: [0],
      impactTest: [0],
      pressureTest: [0],
      pressureTestType: [0],
      testPressure: [0],
      radiography: [0],
      radiographyCategory: [0],
      jointEfficiency: [0],
      otherNDE: [''],

      // Material
      generalMaterial: [0],
      materialSpecification: [''],
      allowableStress: [],
      schedule: [0],
      nominalThickness: [],
      corrosionAllowance: [],
      cladding: [0],
      claddingType: [0],
      claddingMaterial: [0],
      claddingThickness: [],
      lining: [0],
      liningType: [0],
      materialCertification: [0],

      // External
      externalCoating: [0],
      externalCoatingType: [0],
      externalCoatingThickness: [''],
      externalCoatingAge: [''],
      insulation: [0],
      insulationType: [0],
      insulationMaterial: [0],
      insulationThickness: [''],
      cuiPotential: [0],
      externalEnvironment: [0],
      supportType: [0],
      heatTracing: [0],
      fireProofing: [0],
      buried: [0],
      cathodicProtection: [0],
      cathodicProtectionTypeId: [0],
      waterDrawsId: [0],

      // Soil
      deadLeg: [0],
      deadLegDescription: [''],
      deadLegCategory: [0],
      deadLegType: [0],
      deadLegCriticality: [0],
      injectionPoint: [0],
      mixPoint: [0],
      soilAirInterface: [0],

      // Safety
      pressureReliefDevices: [0],
      prdID: [''],
      prdSetPressure: [],
      chemicalInjection: [0],
      detectionSystem: [0],
      isolationSystem: [0],
      mitigationSystem: [0],
      onlineCorrosionMonitoring: [0],
      corrosionMonitoringType: [0],
      hazardClassification: [0],
      safetyEnvironmentalPermits: [''],
      incidentHistory: [0],

      // Inspection
      currentInspectionStrategy: [0],
      damageMechanisms: [''],
      shutdownTurnaroundFrequency: [null],
      lastMajorShutdownDate: [null],
      nextMajorShutdownDate: [null],
      subsequentMajorShutdownDate: [null],
      mtbf: [],
      mttr: [],
      cmlDrawingID: [''],
      inspectionAccess: [0],
      inspectionSupervisor: [''],
      inspector: [''],
      internalInspection: [null],
      externalInspection: [null],
      onStreamInspection: [null],
      tmInspection: [null],
      scheduledRepairReplacement: [0],
      scheduledRepairReplacementDate: [null],
      repairReplacementNextShutdown: [0],

      // ERP & Sync
      erpCircuitCode: [''],
      erpSystem: [''],
      functionalLocation: [''],
      externalSystemID: [''],
      syncStatus: [0],

      // Audit
      createdBy: [this.au.getUserId()],
      createdDate: [null],
      lastModifiedBy: [this.au.getUserId()],
      lastModifiedDate: [null],
      isDeleted: [false],
      isActive: [true],

      // Custom fields
      clientId: [this.au.getClientId()],
      plant: [''],
      area: [''],
      unit: [''],
      system: [''],
      status: [''],
      type: [''],
      createdUser: [''],
      modifiedUser: [''],
      userId: [0],
      generalMaterialAnnularPlateId: [null],
      generalMaterialBottomPlateId: [null],
      generalMaterialShellId: [null],
      materialSpecificationAnnularPlate: [''],
      materialSpecificationBottomPlate: [''],
      materialSpecificationShell: [''],
      bottomTypeId: [null],
      shellLiningId: [null],
      shellLiningTypeId: [null],
      productSideConditionId: [null],
      soilResistivity: [null],
      equipmentFrom: [''],
      equipmentTo: [''],
      astDrainageTypeId: [null],
      astPadTypeId: [null],
      voltage: [null],
      outofServiceFrequency: [''],
      outofServiceInternalInspection: [null],
      releasePreventionBarrierId: [null],
      rbpTypeId: [null],
      steamCoilHeaterId: [null]
    });

    this.loadDropDowns();

    this.equipmentForm.get('plantID')?.valueChanges.subscribe((plantID) => {
      this.equipmentForm.get('name')?.updateValueAndValidity();
      if (plantID) {
        this.loadAreasByPlant(plantID);
        this.loadUnits(plantID, 0);
        this.loadSystems(plantID, 0, 0);
        this.loadCircuits(plantID, 0, 0, 0);

      } else {
        this.areas = [];
        this.units = [];
        this.systems = [];
        this.circuits = []; // Reset area list if no plant is selected
      }
    });
    this.equipmentForm.get('areaID')?.valueChanges.subscribe((areaID) => {

      this.equipmentForm.get('name')?.updateValueAndValidity();
      if (areaID) {

        this.loadUnits(this.equipmentForm.get('plantID').value, areaID);
        this.loadSystems(this.equipmentForm.get('plantID').value, areaID, 0);
        this.loadCircuits(this.equipmentForm.get('plantID').value, areaID, 0, 0);

      } else {

        this.units = [];
        this.systems = [];
        this.circuits = []; // Reset area list if no plant is selected
      }
    });
    this.equipmentForm.get('unitID')?.valueChanges.subscribe((unitID) => {

      this.equipmentForm.get('name')?.updateValueAndValidity();
      if (unitID) {

        this.loadSystems(this.equipmentForm.get('plantID').value, this.equipmentForm.get('areaID').value, unitID);
        this.loadCircuits(this.equipmentForm.get('plantID').value, this.equipmentForm.get('areaID').value, unitID, 0);

      } else {

        this.systems = []; // Reset area list if no plant is selected
        this.circuits = [];
      }
    });
    this.equipmentForm.get('systemID')?.valueChanges.subscribe((systemId) => {

      this.equipmentForm.get('name')?.updateValueAndValidity();
      if (systemId) {

        this.loadCircuits(this.equipmentForm.get('plantID').value, this.equipmentForm.get('areaID').value, this.equipmentForm.get('unitID').value, systemId);

      } else {

        this.circuits = []; // Reset area list if no plant is selected
      }
    });

    this.equipmentForm.get('areaID')?.valueChanges.subscribe(() => {
      this.equipmentForm.get('name')?.updateValueAndValidity();
    });
    this.equipmentForm.get('unitID')?.valueChanges.subscribe(() => {
      this.equipmentForm.get('name')?.updateValueAndValidity();
    });
    this.equipmentForm.get('unitID')?.valueChanges.subscribe(() => {
      this.equipmentForm.get('name')?.updateValueAndValidity();
    });
    this.equipmentForm.get('systemId')?.valueChanges.subscribe(() => {
      this.equipmentForm.get('name')?.updateValueAndValidity();
    });
    this.equipmentForm.get('circuitId')?.valueChanges.subscribe(() => {
      this.equipmentForm.get('name')?.updateValueAndValidity();
    });
  }

  saveEquipment() {
   
    if (this.equipmentForm.invalid) {
      return;
    }
    const formData = new FormData();
    Object.keys(this.equipmentForm.value).forEach(key => {
      const value = this.equipmentForm.value[key];

      // Only append values that are not empty strings or "null"
      if (value !== "" && value !== "null" && value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    this.documentPreviews.forEach(file => {
      formData.append('documents', file);
    });

    this.equipmentService.addEquipment(formData).subscribe(
      (response) => {


        Swal.fire({
          title: 'Success!',
          text: 'Equipment added successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.backToEquipment();
      }
    );
  }
  loadAreasByPlant(plantID: number) {

    this.equipmentService.getArea(plantID).subscribe((data: any[]) => {
      this.areas = data;
    });
  }
  loadUnits(plantID: number, areaID: number) {

    this.equipmentService.getUnits(plantID, areaID).subscribe((data: any[]) => {
      this.units = data;
    });
  }
  loadSystems(plantID: number, areaID: number, unitID: number) {

    this.equipmentService.getSystems(plantID, areaID, unitID).subscribe((data: any[]) => {
      this.systems = data;
    });
  }

  loadCircuits(plantID: number, areaID: number, unitID: number, systemID: number) {

    this.equipmentService.getCircuits(plantID, areaID, unitID, systemID).subscribe((data: any[]) => {
      this.circuits = data;
    });
  }
  expandAll() {
    this.setAll(true);
  }

  // Collapse all sections
  collapseAll() {
    this.setAll(false);
  }

  toggle(section: string) {
    this[section] = !this[section];
  }
  // Helper to update all toggles
  private setAll(state: boolean) {
    this.expand = state;
    this.showGeneral = state;
    this.showSoilSide = state;
    this.showProductSide = state;
    this.showDeadLeg = state;
    this.showMaintenance = state;
    this.showDocument = state;
    this.showLocation = state;
    this.showDesign = state;
    this.showGeometry = state;
    this.showOperation = state;
    this.showFabrication = state;
    this.showMaterial = state;
    this.showExternal = state;
    this.showSafety = state;
    this.showIntegrity = state;
    this.showInspectionSchedule = state;
    this.showMaintenanceSchedule = state;
    this.showIntegration = state;
    this.showAuditInfo = state;
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
  loadTankDropDowns() {
    this.equipmentService.getPlants().subscribe((data: any) => {
      this.plants = data;
    });
    this.equipmentService.getEquipmentDesignCode(2).subscribe((data: any) => {
      this.designCodes = data;
    });
    this.equipmentService.getEquipmentEditionAddendum(2).subscribe((data: any) => {
      this.editionAddendums = data;
    });
    this.equipmentService.getEquipmentComplianceCertification(2).subscribe((data: any) => {
      this.complianceCertifications = data;
    });

    this.equipmentService.getEquipmentRoofCategory(2).subscribe((data: any) => {
      this.roofCategory = data;
    });
    this.equipmentService.getEquipmentShellJointCategory(2).subscribe((data: any) => {
      this.shellJointCategory = data;
    });
    this.equipmentService.getEquipmentFloorCategory(2).subscribe((data: any) => {
      this.floorCategory = data;
    });
    this.equipmentService.getEquipmentFoundationCategory(2).subscribe((data: any) => {
      this.foundationCategory = data;
    });
    // this.equipmentService.getEquipmentGeometry(1).subscribe((data: any) => {
    //   this.geometry = data;
    // });
    this.equipmentService.getEquipmentOrientation(1).subscribe((data: any) => {
      this.orientation = data;
    });
    this.equipmentService.getEquipmentProductSideCondition(1).subscribe((data: any) => {
      this.productSideCondition = data;
    });
    this.equipmentService.getEquipmentOperationalStatus(1).subscribe((data: any) => {
      this.operationalStatus = data;
    });


    this.equipmentService.getEquipmentRPBType(1).subscribe((data: any) => {
      this.rpbType = data;
    });
    this.equipmentService.getEquipmentBottomType(1).subscribe((data: any) => {
      this.bottomType = data;
    });
    this.equipmentService.getEquipmentOperationalStatus(1).subscribe((data: any) => {
      this.operationalStatus = data;
    });
    this.equipmentService.getEquipmentCathodicProtectionType(1).subscribe((data: any) => {
      this.cathodicProtectionType = data;
    });
    this.equipmentService.getEquipmentASTPadType(1).subscribe((data: any) => {
      this.astPadType = data;
    });
    this.equipmentService.getEquipmentASTDrainageType(1).subscribe((data: any) => {
      this.astDrainageType = data;
    });


    // this.equipmentService.getEquipmentHead1Type(1).subscribe((data: any) => {
    //   this.head1Type = data;
    //   this.head2Type = data;
    // }); 

    this.equipmentService.getEquipmentFluidPhase(2).subscribe((data: any) => {
      this.fluidPhase = data;
    });
    this.equipmentService.getEquipmentCorrosivity(2).subscribe((data: any) => {
      this.corrosivity = data;
    });
    this.equipmentService.getEquipmentProcessEnvironment(2).subscribe((data: any) => {
      this.processEnvironment = data;
    });
    this.equipmentService.getYesNo().subscribe((data: any) => {
      this.yesNo = data;
    });
    this.equipmentService.getYesNoNa().subscribe((data: any) => {
      this.yesNoNa = data;
    });
    this.equipmentService.getEquipmentToxicFluid(2).subscribe((data: any) => {
      this.toxicFluid = data;
    });
    this.equipmentService.getEquipmentCriticality(2).subscribe((data: any) => {
      this.criticality = data;
    });
    // this.equipmentService.getEquipmentSeismicZoneClassification(2).subscribe((data: any) => {
    //   this.seismicZoneClassification = data;
    // });
    // this.equipmentService.getEquipmentFireExplosionRisk(2).subscribe((data: any) => {
    //   this.fireExplosionRisk = data;
    // });
    // this.equipmentService.getEquipmentToxicRisk(2).subscribe((data: any) => {
    //   this.toxicRisk = data;
    // });
    this.equipmentService.getEquipmentHeatTreatmentType(2).subscribe((data: any) => {
      this.heatTreatmentType = data;
    });
    this.equipmentService.getEquipmentPressureTestType(2).subscribe((data: any) => {
      this.pressureTestType = data;
    });
    this.equipmentService.getEquipmentRadiographyCategory(2).subscribe((data: any) => {
      this.radiographyCategory = data;
    });
    this.equipmentService.getEquipmentGeneralMaterial(2).subscribe((data: any) => {
      this.generalMaterial = data;
    });
    this.equipmentService.getEquipmentGeneralMaterialBottomPlate(2).subscribe((data: any) => {
      this.materialBottomPlate = data;
    });
    this.equipmentService.getEquipmentGeneralMaterialAnnularPlate(2).subscribe((data: any) => {
      this.materialAnnularPlate = data;
    });
    this.equipmentService.getEquipmentCladdingType(2).subscribe((data: any) => {
      this.claddingType = data;
    });
    this.equipmentService.getEquipmentCladdingMaterial(2).subscribe((data: any) => {
      this.claddingMaterial = data;
    });
    this.equipmentService.getEquipmentShellLiningType(2).subscribe((data: any) => {
      this.shellLiningType = data;
    });

    this.equipmentService.getEquipmentBottomLiningType(2).subscribe((data: any) => {
      this.bottomLiningType = data;
    });
    // this.equipmentService.getEquipmentLiningType(2).subscribe((data: any) => {
    //   this.liningType = data;
    // });
    this.equipmentService.getEquipmentMaterialCertification(2).subscribe((data: any) => {
      this.materialCertification = data;
    });
    this.equipmentService.getEquipmentSchedule(2).subscribe((data: any) => {
      this.schedule = data;
    });
    this.equipmentService.getEquipmentExternalCoatingType(2).subscribe((data: any) => {
      this.externalCoatingType = data;
    });
    this.equipmentService.getEquipmentInsulationType(2).subscribe((data: any) => {
      this.insulationType = data;
    });
    this.equipmentService.getEquipmentInsulationMaterial(2).subscribe((data: any) => {
      this.insulationMaterial = data;
    });
    this.equipmentService.getEquipmentCUIPotential(2).subscribe((data: any) => {
      this.cuiPotential = data;
    });
    this.equipmentService.getEquipmentExternalEnvironment(2).subscribe((data: any) => {
      this.externalEnvironment = data;
    });
    this.equipmentService.getEquipmentSupportType(2).subscribe((data: any) => {
      this.supportType = data;
    });
    // this.equipmentService.getEquipmentDeadLegCategory(2).subscribe((data: any) => {
    //   this.deadLegCategory = data;
    // });
    // this.equipmentService.getEquipmentDeadLegType(2).subscribe((data: any) => {
    //   this.deadLegType = data;
    // });
    // this.equipmentService.getEquipmentCriticality(2).subscribe((data: any) => {
    //   this.criticality = data;
    // });

    this.equipmentService.getEquipmentDetectionSystem(2).subscribe((data: any) => {
      this.detectionSystem = data;
    });
    this.equipmentService.getEquipmentIsolationSystem(2).subscribe((data: any) => {
      this.isolationSystem = data;
    });
    this.equipmentService.getEquipmentMitigationSystem(2).subscribe((data: any) => {
      this.mitigationSystem = data;
    });
    // this.equipmentService.getEquipmentCorrosionMonitoringType(2).subscribe((data: any) => {
    //   this.corrosionMonitoringType = data;
    // });
    // this.equipmentService.getEquipmentHazardClassification(2).subscribe((data: any) => {
    //   this.hazardClassification = data;
    // });

    // this.equipmentService.getEquipmentCurrentInspectionStrategy(1).subscribe((data: any) => {
    //   this.currentInspectionStrategy = data;
    // });
    // this.equipmentService.getEquipmentInspectionAccess(1).subscribe((data: any) => {
    //   this.inspectionAccess = data;
    // });
    // this.equipmentService.getEquipmentSyncStatus(2).subscribe((data: any) => {
    //   this.syncStatus = data;
    // });
  }
  loadVessalsDropDowns() {
    this.equipmentService.getPlants().subscribe((data: any) => {
      this.plants = data;
    });
    this.equipmentService.getEquipmentDesignCode(1).subscribe((data: any) => {
      this.designCodes = data;
    });
    this.equipmentService.getEquipmentEditionAddendum(1).subscribe((data: any) => {
      this.editionAddendums = data;
    });
    this.equipmentService.getEquipmentComplianceCertification(1).subscribe((data: any) => {
      this.complianceCertifications = data;
    });
    this.equipmentService.getEquipmentGeometry(1).subscribe((data: any) => {
      this.geometry = data;
    });
    this.equipmentService.getEquipmentOrientation(1).subscribe((data: any) => {
      this.orientation = data;
    });
    this.equipmentService.getEquipmentHead1Type(1).subscribe((data: any) => {
      this.head1Type = data;
      this.head2Type = data;
    });

    this.equipmentService.getEquipmentFluidPhase(1).subscribe((data: any) => {
      this.fluidPhase = data;
    });
    this.equipmentService.getEquipmentCorrosivity(1).subscribe((data: any) => {
      this.corrosivity = data;
    });
    this.equipmentService.getEquipmentProcessEnvironment(1).subscribe((data: any) => {
      this.processEnvironment = data;
    });
    this.equipmentService.getYesNo().subscribe((data: any) => {
      this.yesNo = data;
    });
    this.equipmentService.getYesNoNa().subscribe((data: any) => {
      this.yesNoNa = data;
    });
    this.equipmentService.getEquipmentToxicFluid(1).subscribe((data: any) => {
      this.toxicFluid = data;
    });
    this.equipmentService.getEquipmentCriticality(1).subscribe((data: any) => {
      this.criticality = data;
    });
    this.equipmentService.getEquipmentSeismicZoneClassification(1).subscribe((data: any) => {
      this.seismicZoneClassification = data;
    });
    this.equipmentService.getEquipmentFireExplosionRisk(1).subscribe((data: any) => {
      this.fireExplosionRisk = data;
    });
    this.equipmentService.getEquipmentToxicRisk(1).subscribe((data: any) => {
      this.toxicRisk = data;
    });
    this.equipmentService.getEquipmentHeatTreatmentType(1).subscribe((data: any) => {
      this.heatTreatmentType = data;
    });
    this.equipmentService.getEquipmentPressureTestType(1).subscribe((data: any) => {
      this.pressureTestType = data;
    });
    this.equipmentService.getEquipmentRadiographyCategory(1).subscribe((data: any) => {
      this.radiographyCategory = data;
    });
    this.equipmentService.getEquipmentGeneralMaterial(1).subscribe((data: any) => {
      this.generalMaterial = data;
    });
    this.equipmentService.getEquipmentCladdingType(1).subscribe((data: any) => {
      this.claddingType = data;
    });
    this.equipmentService.getEquipmentCladdingMaterial(1).subscribe((data: any) => {
      this.claddingMaterial = data;
    });
    this.equipmentService.getEquipmentLiningType(1).subscribe((data: any) => {
      this.liningType = data;
    });
    this.equipmentService.getEquipmentMaterialCertification(1).subscribe((data: any) => {
      this.materialCertification = data;
    });
    this.equipmentService.getEquipmentExternalCoatingType(1).subscribe((data: any) => {
      this.externalCoatingType = data;
    });
    this.equipmentService.getEquipmentInsulationType(1).subscribe((data: any) => {
      this.insulationType = data;
    });
    this.equipmentService.getEquipmentInsulationMaterial(1).subscribe((data: any) => {
      this.insulationMaterial = data;
    });
    this.equipmentService.getEquipmentCUIPotential(1).subscribe((data: any) => {
      this.cuiPotential = data;
    });
    this.equipmentService.getEquipmentExternalEnvironment(1).subscribe((data: any) => {
      this.externalEnvironment = data;
    });
    this.equipmentService.getEquipmentSupportType(1).subscribe((data: any) => {
      this.supportType = data;
    });

    this.equipmentService.getEquipmentDetectionSystem(1).subscribe((data: any) => {
      this.detectionSystem = data;
    });
    this.equipmentService.getEquipmentIsolationSystem(1).subscribe((data: any) => {
      this.isolationSystem = data;
    });
    this.equipmentService.getEquipmentMitigationSystem(1).subscribe((data: any) => {
      this.mitigationSystem = data;
    });
    this.equipmentService.getEquipmentCorrosionMonitoringType(1).subscribe((data: any) => {
      this.corrosionMonitoringType = data;
    });
    this.equipmentService.getEquipmentHazardClassification(1).subscribe((data: any) => {
      this.hazardClassification = data;
    });

    this.equipmentService.getEquipmentCurrentInspectionStrategy(1).subscribe((data: any) => {
      this.currentInspectionStrategy = data;
    });
    this.equipmentService.getEquipmentInspectionAccess(1).subscribe((data: any) => {
      this.inspectionAccess = data;
    });
    this.equipmentService.getEquipmentSyncStatus(1).subscribe((data: any) => {
      this.syncStatus = data;
    });
  }

  loadPipeDropDowns() {
    this.equipmentService.getPlants().subscribe((data: any) => {
      this.plants = data;
    });
    this.equipmentService.getEquipmentDesignCode(2).subscribe((data: any) => {
      this.designCodes = data;
    });
    this.equipmentService.getEquipmentEditionAddendum(2).subscribe((data: any) => {
      this.editionAddendums = data;
    });
    this.equipmentService.getEquipmentComplianceCertification(2).subscribe((data: any) => {
      this.complianceCertifications = data;
    });
    this.equipmentService.getEquipmentGeometry(1).subscribe((data: any) => {
      this.geometry = data;
    });
    this.equipmentService.getEquipmentOrientation(1).subscribe((data: any) => {
      this.orientation = data;
    });
    // this.equipmentService.getEquipmentHead1Type(1).subscribe((data: any) => {
    //   this.head1Type = data;
    //   this.head2Type = data;
    // }); 

    this.equipmentService.getEquipmentFluidPhase(2).subscribe((data: any) => {
      this.fluidPhase = data;
    });
    this.equipmentService.getEquipmentCorrosivity(2).subscribe((data: any) => {
      this.corrosivity = data;
    });
    this.equipmentService.getEquipmentProcessEnvironment(2).subscribe((data: any) => {
      this.processEnvironment = data;
    });
    this.equipmentService.getYesNo().subscribe((data: any) => {
      this.yesNo = data;
    });
    this.equipmentService.getYesNoNa().subscribe((data: any) => {
      this.yesNoNa = data;
    });
    this.equipmentService.getEquipmentToxicFluid(2).subscribe((data: any) => {
      this.toxicFluid = data;
    });
    this.equipmentService.getEquipmentCriticality(2).subscribe((data: any) => {
      this.criticality = data;
    });
    this.equipmentService.getEquipmentSeismicZoneClassification(2).subscribe((data: any) => {
      this.seismicZoneClassification = data;
    });
    this.equipmentService.getEquipmentFireExplosionRisk(2).subscribe((data: any) => {
      this.fireExplosionRisk = data;
    });
    this.equipmentService.getEquipmentToxicRisk(2).subscribe((data: any) => {
      this.toxicRisk = data;
    });
    this.equipmentService.getEquipmentHeatTreatmentType(2).subscribe((data: any) => {
      this.heatTreatmentType = data;
    });
    this.equipmentService.getEquipmentPressureTestType(2).subscribe((data: any) => {
      this.pressureTestType = data;
    });
    this.equipmentService.getEquipmentRadiographyCategory(2).subscribe((data: any) => {
      this.radiographyCategory = data;
    });
    this.equipmentService.getEquipmentGeneralMaterial(2).subscribe((data: any) => {
      this.generalMaterial = data;
    });
    this.equipmentService.getEquipmentCladdingType(2).subscribe((data: any) => {
      this.claddingType = data;
    });
    this.equipmentService.getEquipmentCladdingMaterial(2).subscribe((data: any) => {
      this.claddingMaterial = data;
    });
    this.equipmentService.getEquipmentLiningType(2).subscribe((data: any) => {
      this.liningType = data;
    });
    this.equipmentService.getEquipmentMaterialCertification(2).subscribe((data: any) => {
      this.materialCertification = data;
    });
    this.equipmentService.getEquipmentSchedule(2).subscribe((data: any) => {
      this.schedule = data;
    });
    this.equipmentService.getEquipmentExternalCoatingType(2).subscribe((data: any) => {
      this.externalCoatingType = data;
    });
    this.equipmentService.getEquipmentInsulationType(2).subscribe((data: any) => {
      this.insulationType = data;
    });
    this.equipmentService.getEquipmentInsulationMaterial(2).subscribe((data: any) => {
      this.insulationMaterial = data;
    });
    this.equipmentService.getEquipmentCUIPotential(2).subscribe((data: any) => {
      this.cuiPotential = data;
    });
    this.equipmentService.getEquipmentExternalEnvironment(2).subscribe((data: any) => {
      this.externalEnvironment = data;
    });
    this.equipmentService.getEquipmentSupportType(2).subscribe((data: any) => {
      this.supportType = data;
    });
    this.equipmentService.getEquipmentDeadLegCategory(2).subscribe((data: any) => {
      this.deadLegCategory = data;
    });
    this.equipmentService.getEquipmentDeadLegType(2).subscribe((data: any) => {
      this.deadLegType = data;
    });
    this.equipmentService.getEquipmentCriticality(2).subscribe((data: any) => {
      this.criticality = data;
    });

    this.equipmentService.getEquipmentDetectionSystem(2).subscribe((data: any) => {
      this.detectionSystem = data;
    });
    this.equipmentService.getEquipmentIsolationSystem(2).subscribe((data: any) => {
      this.isolationSystem = data;
    });
    this.equipmentService.getEquipmentMitigationSystem(2).subscribe((data: any) => {
      this.mitigationSystem = data;
    });
    this.equipmentService.getEquipmentCorrosionMonitoringType(2).subscribe((data: any) => {
      this.corrosionMonitoringType = data;
    });
    this.equipmentService.getEquipmentHazardClassification(2).subscribe((data: any) => {
      this.hazardClassification = data;
    });

    this.equipmentService.getEquipmentCurrentInspectionStrategy(1).subscribe((data: any) => {
      this.currentInspectionStrategy = data;
    });
    this.equipmentService.getEquipmentInspectionAccess(1).subscribe((data: any) => {
      this.inspectionAccess = data;
    });
    this.equipmentService.getEquipmentSyncStatus(2).subscribe((data: any) => {
      this.syncStatus = data;
    });
  }
  loadDropDowns() {


    this.equipmentService.getEquipmentCategory(0).subscribe((data: any) => {
      this.equipmentCategoryList = data;
    });
    this.equipmentService.getEquipmentType(0).subscribe((data: any) => {
      this.equipmentTypeList = data;
    });
    this.equipmentService.EquipmentSubCategory(0).subscribe((data: any) => {
      this.subCategoryList = data;
    });
    this.equipmentService.getEquipmentOperationalStatus(0).subscribe((data: any) => {
      this.operationalStatusList = data;
    });
  }



















  loadDropDownsOnChange() {
    const typeId = this.selectedTypeId;
    this.equipmentService.getEquipmentOperationalStatus(typeId).subscribe((data: any) => {
      this.operationalStatus = data;
    });
    this.equipmentService.getEquipmentTankOperationalStatus(typeId).subscribe((data: any) => {
      this.tankOperationalStatus = data;
    });
    this.equipmentService.getEquipmentToxicRisk(typeId).subscribe((data: any) => {
      this.toxicRisk = data;
    });
    this.equipmentService.getEquipmentToxicFluid(typeId).subscribe((data: any) => {
      this.toxicFluid = data;
    });
    this.equipmentService.getEquipmentSyncStatus(typeId).subscribe((data: any) => {
      this.syncStatus = data;
    });
    this.equipmentService.getEquipmentSupportType(typeId).subscribe((data: any) => {
      this.supportType = data;
    });
    this.equipmentService.getEquipmentSubCategory(typeId).subscribe((data: any) => {
      this.subCategory = data;
    });
    this.equipmentService.getEquipmentShellLiningType(typeId).subscribe((data: any) => {
      this.shellLiningType = data;
    });
    this.equipmentService.getEquipmentShellJointCategory(typeId).subscribe((data: any) => {
      this.shellJointCategory = data;
    });
    this.equipmentService.getEquipmentSeismicZoneClassification(typeId).subscribe((data: any) => {
      this.seismicZoneClassification = data;
    });
    this.equipmentService.getEquipmentSchedule(typeId).subscribe((data: any) => {
      this.schedule = data;
    });
    this.equipmentService.getEquipmentRPBType(typeId).subscribe((data: any) => {
      this.rpbType = data;
    });
    this.equipmentService.getEquipmentRoofCategory(typeId).subscribe((data: any) => {
      this.roofCategory = data;
    });
    this.equipmentService.getEquipmentRadiographyCategory(typeId).subscribe((data: any) => {
      this.radiographyCategory = data;
    });
    this.equipmentService.getEquipmentProductSideCondition(typeId).subscribe((data: any) => {
      this.productSideCondition = data;
    });
    this.equipmentService.getEquipmentProcessEnvironment(typeId).subscribe((data: any) => {
      this.processEnvironment = data;
    });
    this.equipmentService.getEquipmentPressureTestType(typeId).subscribe((data: any) => {
      this.pressureTestType = data;
    });
    this.equipmentService.getEquipmentOrientation(typeId).subscribe((data: any) => {
      this.orientation = data;
    });
    this.equipmentService.getEquipmentMitigationSystem(typeId).subscribe((data: any) => {
      this.mitigationSystem = data;
    });
    this.equipmentService.getEquipmentMaterialCertification(typeId).subscribe((data: any) => {
      this.materialCertification = data;
    });
    this.equipmentService.getEquipmentLiningType(typeId).subscribe((data: any) => {
      this.liningType = data;
    });
    this.equipmentService.getEquipmentIsolationSystem(typeId).subscribe((data: any) => {
      this.isolationSystem = data;
    });
    this.equipmentService.getEquipmentInsulationType(typeId).subscribe((data: any) => {
      this.insulationType = data;
    });
    this.equipmentService.getEquipmentInsulationMaterial(typeId).subscribe((data: any) => {
      this.insulationMaterial = data;
    });
    this.equipmentService.getEquipmentInspectionAccess(typeId).subscribe((data: any) => {
      this.inspectionAccess = data;
    });
    this.equipmentService.getEquipmentHeatTreatmentType(typeId).subscribe((data: any) => {
      this.heatTreatmentType = data;
    });
    this.equipmentService.getEquipmentHeatTreatment(typeId).subscribe((data: any) => {
      this.heatTreatment = data;
    });
    this.equipmentService.getEquipmentHead2Type(typeId).subscribe((data: any) => {
      this.head2Type = data;
    });
    this.equipmentService.getEquipmentHead1Type(typeId).subscribe((data: any) => {
      this.head1Type = data;
    });
    this.equipmentService.getEquipmentHazardClassification(typeId).subscribe((data: any) => {
      this.hazardClassification = data;
    });
    this.equipmentService.getEquipmentGeometry(typeId).subscribe((data: any) => {
      this.geometry = data;
    });
    this.equipmentService.getEquipmentGeneralMaterialShell(typeId).subscribe((data: any) => {
      this.materialShell = data;
    });
    this.equipmentService.getEquipmentGeneralMaterialBottomPlate(typeId).subscribe((data: any) => {
      this.materialBottomPlate = data;
    });
    this.equipmentService.getEquipmentGeneralMaterialAnnularPlate(typeId).subscribe((data: any) => {
      this.materialAnnularPlate = data;
    });
    this.equipmentService.getEquipmentGeneralMaterial(typeId).subscribe((data: any) => {
      this.generalMaterial = data;
    });
    this.equipmentService.getEquipmentFoundationCategory(typeId).subscribe((data: any) => {
      this.foundationCategory = data;
    });
    this.equipmentService.getEquipmentFluidPhase(typeId).subscribe((data: any) => {
      this.fluidPhase = data;
    });
    this.equipmentService.getEquipmentFloorCategory(typeId).subscribe((data: any) => {
      this.floorCategory = data;
    });
    this.equipmentService.getEquipmentFireExplosionRisk(typeId).subscribe((data: any) => {
      this.fireExplosionRisk = data;
    });
    this.equipmentService.getEquipmentFabricationGeometry(typeId).subscribe((data: any) => {
      this.fabricationGeometry = data;
    });
    this.equipmentService.getEquipmentExternalEnvironment(typeId).subscribe((data: any) => {
      this.externalEnvironment = data;
    });
    this.equipmentService.getEquipmentExternalCoatingType(typeId).subscribe((data: any) => {
      this.externalCoatingType = data;
    });
    this.equipmentService.getEquipmentEquipmentType(typeId).subscribe((data: any) => {
      this.equipmentType = data;
    });
    this.equipmentService.getEquipmentEquipmentCategory(typeId).subscribe((data: any) => {
      this.equipmentCategory = data;
    });
    this.equipmentService.getEquipmentEditionAddendum(typeId).subscribe((data: any) => {
      this.editionAddendum = data;
    });
    this.equipmentService.getEquipmentDetectionSystem(typeId).subscribe((data: any) => {
      this.detectionSystem = data;
    });
    this.equipmentService.getEquipmentDesignCode(typeId).subscribe((data: any) => {
      this.designCode = data;
    });
    this.equipmentService.getEquipmentDeadLegType(typeId).subscribe((data: any) => {
      this.deadLegType = data;
    });
    this.equipmentService.getEquipmentDeadLegCriticality(typeId).subscribe((data: any) => {
      this.deadLegCriticality = data;
    });
    this.equipmentService.getEquipmentDeadLegCategory(typeId).subscribe((data: any) => {
      this.deadLegCategory = data;
    });
    this.equipmentService.getEquipmentCurrentInspectionStrategy(typeId).subscribe((data: any) => {
      this.currentInspectionStrategy = data;
    });

    this.equipmentService.getEquipmentCUIPotential(typeId).subscribe((data: any) => {
      this.cuiPotential = data;
    });

    this.equipmentService.getEquipmentCriticality(typeId).subscribe((data: any) => {
      this.criticality = data;
    });

    this.equipmentService.getEquipmentCorrosivity(typeId).subscribe((data: any) => {
      this.corrosivity = data;
    });

    this.equipmentService.getEquipmentCorrosionMonitoringType(typeId).subscribe((data: any) => {
      this.corrosionMonitoringType = data;
    });

    this.equipmentService.getEquipmentComplianceCertification(typeId).subscribe((data: any) => {
      this.complianceCertification = data;
    });

    this.equipmentService.getEquipmentCladdingType(typeId).subscribe((data: any) => {
      this.claddingType = data;
    });

    this.equipmentService.getEquipmentCladdingMaterial(typeId).subscribe((data: any) => {
      this.claddingMaterial = data;
    });

    this.equipmentService.getEquipmentCathodicProtectionType(typeId).subscribe((data: any) => {
      this.cathodicProtectionType = data;
    });

    this.equipmentService.getEquipmentBottomType(typeId).subscribe((data: any) => {
      this.bottomType = data;
    });

    this.equipmentService.getEquipmentBottomLiningType(typeId).subscribe((data: any) => {
      this.bottomLiningType = data;
    });

    this.equipmentService.getEquipmentASTPadType(typeId).subscribe((data: any) => {
      this.astPadType = data;
    });

    this.equipmentService.getEquipmentASTDrainageType(typeId).subscribe((data: any) => {
      this.astDrainageType = data;
    });
  }
  onEquipmentTypeChange() {
    this.selectedType = this.equipmentForm.get('equipmentCategory')?.value;
    // this.resetform(this.selectedType);
    if (this.selectedType == '1') {
      this.loadVessalsDropDowns()
    }
    if (this.selectedType == '2') {
      this.loadPipeDropDowns()
    }
    if (this.selectedType == '4') {
      this.loadTankDropDowns()
    }
  }

  resetform(catid: any) {
    this.equipmentForm = this.fb.group({
      // General Info
      id: [0],
      equipmentCategory: [catid],
      // Location
      plantID: [null],
      areaID: [0],
      unitID: [0],
      systemID: [0],
      circuitID: [0],
      corrosionLoopID: [''],
      specificLocation: [''],
      pipeFrom: [''],
      pipeTo: [''],
      pfd: [''],
      pAndID: [''],
      isometricDrawing: [''],
      gaDrawing: [''],
      inserviceStartDate: [null],
      storageFluid: [''],
      // Design
      designCode: [0],
      editionAddendum: [0],
      designPressureInternal: [],
      designPressureExternal: [],
      designTemperatureMax: [],
      designTemperatureMDMT: [],
      mawp: [],
      designLife: [],
      primaryProducts: [''],
      marginPerDay: [''],
      complianceCertification: [0],
      governingRegulatoryBody: [''],
      roofCategoryId: [null],
      shellJointcategoryId: [null],
      floorCategoryId: [null],
      foundationCategoryId: [null],

      // Geometry
      geometry: [0],
      nominalSizeNPS: [''],
      insideDiameter: [],
      outsideDiameter: [],
      lengthHeight: [],
      fillHeight: [null],
      orientation: [0],
      emptyWeight: [],
      capacity: [],
      head1Type: [0],
      head2Type: [0],

      // Operation
      operatingPressureMax: [],
      operatingPressureAvg: [],
      operatingTempMax: [],
      operatingTempMin: [],
      processFluid: [''],
      fluidComposition: [''],
      fluidPhase: [0],
      inventoryVolume: [],
      density: [''],
      viscosity: [''],
      specificGravity: [],
      flowRate: [],
      velocity: [],
      corrosivity: [0],
      ph: [],
      processEnvironment: [0],
      toxicMixture: [0],
      toxicFluid: [0],
      flammability: [0],
      operatingWeight: [],
      criticality: [0],
      humidityLevel: [],
      seismicZoneClassification: [0],
      fireExplosionRisk: [0],
      toxicRisk: [0],
      totalPopulation: [],
      populationDensity: [],

      // Fabrication
      manufacturer: [''],
      serialNumber: [''],
      warrantyDate: [null],
      heatTreatment: [0],
      heatTreatmentType: [0],
      impactTest: [0],
      pressureTest: [0],
      pressureTestType: [0],
      testPressure: [0],
      radiography: [0],
      radiographyCategory: [0],
      jointEfficiency: [0],
      otherNDE: [''],

      // Material
      generalMaterial: [0],
      materialSpecification: [''],
      allowableStress: [],
      schedule: [0],
      nominalThickness: [],
      corrosionAllowance: [],
      cladding: [0],
      claddingType: [0],
      claddingMaterial: [0],
      claddingThickness: [],
      lining: [0],
      liningType: [0],
      materialCertification: [0],

      // External
      externalCoating: [0],
      externalCoatingType: [0],
      externalCoatingThickness: [''],
      externalCoatingAge: [''],
      insulation: [0],
      insulationType: [0],
      insulationMaterial: [0],
      insulationThickness: [''],
      cuiPotential: [0],
      externalEnvironment: [0],
      supportType: [0],
      heatTracing: [0],
      fireProofing: [0],
      buried: [0],
      cathodicProtection: [0],
      cathodicProtectionTypeId: [0],
      waterDrawsId: [0],

      // Soil
      deadLeg: [0],
      deadLegDescription: [''],
      deadLegCategory: [0],
      deadLegType: [0],
      deadLegCriticality: [0],
      injectionPoint: [0],
      mixPoint: [0],
      soilAirInterface: [0],

      // Safety
      pressureReliefDevices: [0],
      prdID: [''],
      prdSetPressure: [],
      chemicalInjection: [0],
      detectionSystem: [0],
      isolationSystem: [0],
      mitigationSystem: [0],
      onlineCorrosionMonitoring: [0],
      corrosionMonitoringType: [0],
      hazardClassification: [0],
      safetyEnvironmentalPermits: [''],
      incidentHistory: [0],

      // Inspection
      currentInspectionStrategy: [0],
      damageMechanisms: [''],
      shutdownTurnaroundFrequency: [null],
      lastMajorShutdownDate: [null],
      nextMajorShutdownDate: [null],
      subsequentMajorShutdownDate: [null],
      mtbf: [],
      mttr: [],
      cmlDrawingID: [''],
      inspectionAccess: [0],
      inspectionSupervisor: [''],
      inspector: [''],
      internalInspection: [null],
      externalInspection: [null],
      onStreamInspection: [null],
      tmInspection: [null],
      scheduledRepairReplacement: [0],
      scheduledRepairReplacementDate: [null],
      repairReplacementNextShutdown: [0],

      // ERP & Sync
      erpCircuitCode: [''],
      erpSystem: [''],
      functionalLocation: [''],
      externalSystemID: [''],
      syncStatus: [0],

      // Audit
      createdBy: [this.au.getUserId()],
      createdDate: [null],
      lastModifiedBy: [this.au.getUserId()],
      lastModifiedDate: [null],
      isDeleted: [false],
      isActive: [true],

      // Custom fields
      clientId: [this.au.getClientId()],
      plant: [''],
      area: [''],
      unit: [''],
      system: [''],
      status: [''],
      type: [''],
      createdUser: [''],
      modifiedUser: [''],
      userId: [0],
      generalMaterialAnnularPlateId: [null],
      generalMaterialBottomPlateId: [null],
      generalMaterialShellId: [null],
      materialSpecificationAnnularPlate: [''],
      materialSpecificationBottomPlate: [''],
      materialSpecificationShell: [''],
      bottomTypeId: [null],
      shellLiningId: [null],
      shellLiningTypeId: [null],
      productSideConditionId: [null],
      soilResistivity: [null],
      equipmentFrom: [''],
      equipmentTo: [''],
      astDrainageTypeId: [null],
      astPadTypeId: [null],
      voltage: [null],
      outofServiceFrequency: [''],
      outofServiceInternalInspection: [null],
      releasePreventionBarrierId: [null],
      rbpTypeId: [null],
      steamCoilHeaterId: [null]
    });

  }

}
