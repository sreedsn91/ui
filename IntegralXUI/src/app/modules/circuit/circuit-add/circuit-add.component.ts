import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CircuitService } from 'src/app/services/circuit/circuit.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-circuit-add',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './circuit-add.component.html',
  styleUrl: './circuit-add.component.scss'
})
export class CircuitAddComponent {
  circuitForm!: FormGroup;
  documentPreviews: File[] = [];
  canAdd: boolean = false;
  circuitTypes: any[] = [];
  circuitStatus: any[] = [];
  plants: any[] = [];
  areas: any[] = [];
  units: any[] = [];
  systems: any[] = [];
  designCodeList: any[] = [];
  editionList: any[] = [];
  complianceCertList: any[] = [];
  geometryList: any[] = [];
  orientationList: any[] = [];
  fluidPhaseList: any[] = [];
  corrosivityList: any[] = [];
  environmentList: any[] = [];
  toxicMixtureList: any[] = [];
  toxicFluidList: any[] = [];
  flammabilityList: any[] = [];
  criticalityList: any[] = [];
  seismicZoneList: any[] = [];
  fireExplosionRiskList: any[] = [];
  toxicRiskList: any[] = [];

  heatTreatmentList: any[] = [];
  heatTreatmentTypeList: any[] = [];
  impactTestList: any[] = [];
  pressureTestList: any[] = [];
  pressureTestTypeList: any[] = [];
  radiographyList: any[] = [];
  radiographyCategoryList: any[] = [];

  generalMaterialList: any[] = [];
  scheduleList: any[] = [];
  claddingList: any[] = [];
  claddingTypeList: any[] = [];
  claddingMaterialList: any[] = [];
  liningList: any[] = [];
  materialCertificationList: any[] = [];
  liningTypeList: any[] = [];

  externalCoatingList: any[] = [];
  externalCoatingTypeList: any[] = [];
  insulationList: any[] = [];
  insulationTypeList: any[] = [];
  insulationMaterialList: any[] = [];
  cuiPotentialList: any[] = [];
  externalEnvironmentList: any[] = [];
  supportTypeList: any[] = [];
  heatTracingList: any[] = [];
  fireProofingList: any[] = [];
  buriedList: any[] = [];
  cathodicProtectionList: any[] = [];

  pressureReliefDevicesList: any[] = [];
  chemicalInjectionList: any[] = [];
  detectionSystemList: any[] = [];
  isolationSystemList: any[] = [];
  mitigationSystemList: any[] = [];
  onlineCorrosionMonitoringList: any[] = [];
  corrosionMonitoringTypeList: any[] = [];
  hazardClassificationList: any[] = [];

  inspectionAccessList: any[] = [];
  inspectionStrategyList: any[] = [];
  scheduledRepairList: any[] = [];
  expand = true
  showGeneral = this.expand;
  showLocation = this.expand;
  showDesign = this.expand;
  showGeometry = this.expand;
  showOperation = this.expand;
  showFabrication = this.expand;
  showMaterial = this.expand;
  showExternal = this.expand;
  showSafety = this.expand;
  showIntegrity = this.expand;
  showInspectionSchedule = this.expand;
  showMaintenance = this.expand;
  showMetadata = this.expand;
  showAudit = this.expand;




  constructor(private circuitService: CircuitService, private fb: FormBuilder, private au: AuthService, private router: Router) {
    this.canAdd = (this.au.getCanAdd());
    this.circuitForm = this.fb.group({
      id: [0],
      clientId: [this.au.getClientId()],
      name: [''],
      circuitDescription: [''],
      circuitTypeId: [null],
      commissioningDate: [null],
      builtDate: [null],
      operationalStatusId: [null],
      plantID: [null, Validators.required],
      areaID: [null],
      unitID: [null],
      systemID: [null],
      corrosionLoopID: [null],
      specificLocation: [''],
      circuitFrom: [''],
      circuitTo: [''],
      pfd: [''],
      pnID: [''],
      isometricDrawing: [''],
      designCodeId: [null],
      editionAndAddendumId: [null],
      designPressureInternal: [''],
      designPressureExternal: [''],
      designTemperatureMax: [''],
      designTemperatureMDMT: [''],
      mawp: [''],
      designLife: [''],
      primaryProducts: [''],
      marginPerDay: [''],
      complianceCertificationId: [null],
      governingRegulatoryBody: [''],
      geometryId: [null],
      nominalSizeNPS: [null],
      insideDiameter: [null],
      outsideDiameter: [null],
      lengthOrHeight: [null],
      fillHeight: [null],
      orientationId: [null],
      emptyWeight: [null],
      capacity: [null],
      operatingPressureMax: [null],
      operatingPressureAvg: [null],
      operatingTempMax: [null],
      operatingTempMin: [null],
      processFluid: [''],
      fluidComposition: [''],
      fluidPhaseId: [null],
      inventoryVolume: [null],
      density: [null],
      viscosity: [null],
      specificGravity: [null],
      flowRate: [null],
      velocity: [null],
      corrosivityId: [null],
      ph: [null],
      processEnvironmentId: [null],
      toxicMixtureId: [null],
      toxicFluidId: [null],
      flammabilityId: [null],
      operatingWeight: [null],
      criticalityId: [null],
      humidityLevel: [null],
      seismicZoneClassificationId: [null],
      fireAndExplosionRiskId: [null],
      toxicRiskId: [null],
      totalPopulation: [null],
      populationDensity: [null],
      manufacturer: [''],
      serialNumber: [''],
      warrantyDate: [null],
      heatTreatmentId: [null],
      heatTreatmentTypeId: [null],
      impactTestId: [null],
      pressureTestId: [null],
      pressureTestTypeId: [null],
      testPressure: [''],
      radiographyId: [null],
      radiographyCategoryid: [null],
      jointEfficiency: [''],
      otherNDE: [''],
      generalMaterialId: [null],
      materialSpecification: [''],
      allowableStress: [null],
      scheduleid: [null],
      nominalThickness: [null],
      corrosionAllowance: [null],
      claddingId: [null],
      claddingTypeId: [null],
      claddingMaterialId: [null],
      claddingThickness: [null],
      liningId: [null],
      liningTypeId: [null],
      materialCertificationId: [null],
      externalCoatingId: [null],
      externalCoatingTypeId: [null],
      externalCoatingThickness: [null],
      externalCoatingAge: [null],
      insulationId: [null],
      insulationTypeId: [null],
      insulationMaterialId: [null],
      insulationThickness: [''],
      cuiPotentialId: [null],
      externalEnvironmentId: [null],
      supportTypeId: [null],
      heatTracingId: [null],
      fireProofingId: [null],
      buriedId: [null],
      cathodicProtectionId: [null],
      pressureReliefDevicesId: [null],
      prdID: [''],
      prdSetPressure: [null],
      chemicalInjectionId: [null],
      detectionSystemId: [null],
      isolationSystemId: [null],
      mitigationSystemId: [null],
      onlineCorrosionMonitoringId: [null],
      corrosionMonitoringTypeId: [null],
      hazardClassificationId: [null],
      safetyAndEnvironmentalPermitsId: [''],
      incidentHistory: [''],
      currentInspectionStrategy: [null],
      damageMechanisms: [''],
      shutdownFrequency: [null],
      lastMajorShutdownDate: [null],
      nextMajorShutdownDate: [null],
      subsequentMajorShutdownDate: [null],
      mtbf: [null],
      mttr: [null],
      cmlDrawingID: [''],
      inspectionAccess: [null],
      inspectionSupervisor: [''],
      inspector: [''],
      inspectionTypeId: [null],
      internalInspectionDate: [null],
      externalInspectionDate: [null],
      onStreamInspectionDate: [null],
      tmInspectionDate: [null],
      scheduledRepairOrReplacementId: [null],
      scheduledRepairOrReplacementDate: [null],
      repairDuringNextShutdown: [false],
      erpCircuitCode: [''],
      erpSystem: [''],
      functionalLocation: [''],
      externalSystemID: [''],
      syncStatus: [''],
      createdBy: [null],
      createdDate: [null],
      lastModifiedBy: [null],
      lastModifiedDate: [null],
      isDeleted: [false],
      isActive: [true],
      deletedFiles: [''],
      createdUser: [''],
      modifiedUser: [''],
      plant: [''],
      area: [''],
      unit: [''],
      system: [''],
      status: [''],
      type: [''],
      userId: [null]
    });
  }
  toggle(section: string) {
    this[section] = !this[section];
  }
  // Expand all sections
  expandAll() {
    this.setAll(true);
  }

  // Collapse all sections
  collapseAll() {
    this.setAll(false);
  }

  // Helper to update all toggles
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
    this.showSafety = state;
    this.showIntegrity = state;
    this.showInspectionSchedule = state;
    this.showMaintenance = state;
    this.showMetadata = state;
    this.showAudit = state;
  }

  ngOnInit(): void {
    this.circuitForm.get('plantID')?.valueChanges.subscribe((plantID) => {
      alert();
      this.circuitForm.get('name')?.updateValueAndValidity();
      if (plantID) {
        this.loadAreasByPlant(plantID);
        this.loadUnits(plantID, 0);
        this.loadSystems(plantID, 0, 0);

      } else {
        this.areas = [];
        this.units = [];
        this.systems = []; // Reset area list if no plant is selected
      }
    });
    this.circuitForm.get('areaID')?.valueChanges.subscribe((areaID) => {

      this.circuitForm.get('name')?.updateValueAndValidity();
      if (areaID) {

        this.loadUnits(this.circuitForm.get('plantID').value, areaID);
        this.loadSystems(this.circuitForm.get('plantID').value, areaID, 0);

      } else {

        this.units = [];
        this.systems = []; // Reset area list if no plant is selected
      }
    });
    this.circuitForm.get('unitID')?.valueChanges.subscribe((unitID) => {

      this.circuitForm.get('name')?.updateValueAndValidity();
      if (unitID) {

        this.loadSystems(this.circuitForm.get('plantID').value, this.circuitForm.get('areaID').value, unitID);

      } else {

        this.systems = []; // Reset area list if no plant is selected
      }
    });

    this.circuitForm.get('areaID')?.valueChanges.subscribe(() => {
      this.circuitForm.get('name')?.updateValueAndValidity();
    });
    this.circuitForm.get('unitID')?.valueChanges.subscribe(() => {
      this.circuitForm.get('name')?.updateValueAndValidity();
    });
    this.circuitForm.get('unitID')?.valueChanges.subscribe(() => {
      this.circuitForm.get('name')?.updateValueAndValidity();
    });
    this.circuitForm.get('systemId')?.valueChanges.subscribe(() => {
      this.circuitForm.get('name')?.updateValueAndValidity();
    });
    this.loadDropdowns();
  }
  onPlantChange() {

    this.circuitForm.get('plantID')?.valueChanges.subscribe(plantID => {
      if (plantID) {
        this.loadAreasByPlant(plantID);

      } else {
        this.areas = []; // Reset area list if no plant is selected
      }
    });
  }
  loadAreasByPlant(plantID: number) {

    this.circuitService.getArea(plantID).subscribe((data: any[]) => {
      this.areas = data;
    });
  }
  loadUnits(plantID: number, areaID: number) {

    this.circuitService.getUnits(plantID, areaID).subscribe((data: any[]) => {
      this.units = data;
    });
  }
  loadSystems(plantID: number, areaID: number, unitID: number) {

    this.circuitService.getSystems(plantID, areaID, unitID).subscribe((data: any[]) => {
      this.systems = data;
    });
  }


  loadDropdowns() {


    // Load dropdown data from services
    this.circuitService.getPlants().subscribe((data: any) => {
      debugger;
      this.plants = data;
    });
    this.circuitService.getCircuitTypes().subscribe((data: any) => {
      this.circuitTypes = data;
    });
    this.circuitService.getOperationalStatus().subscribe((data: any) => {
      this.circuitStatus = data;
    });

    this.circuitService.getDesignCode().subscribe((data: any) => {
      this.designCodeList = data;
    });
    this.circuitService.getEditionAndAddendum().subscribe((data: any) => {
      this.editionList = data;
    });
    this.circuitService.getComplianceCertification().subscribe((data: any) => {
      this.complianceCertList = data;
    });
    this.circuitService.getGeometry().subscribe((data: any) => {
      this.geometryList = data;
    });
    this.circuitService.getOrientation().subscribe((data: any) => {
      this.orientationList = data;
    });

    this.circuitService.getFluidPhase().subscribe((data: any) => {
      this.fluidPhaseList = data;
    });
    this.circuitService.getCorrosivity().subscribe((data: any) => {
      this.corrosivityList = data;
    });
    this.circuitService.getProcessEnvironment().subscribe((data: any) => {
      this.environmentList = data;
    });
    //yesNo
    this.circuitService.getYesNo().subscribe((data: any) => {
      this.toxicMixtureList = data;
      this.flammabilityList = data;
      this.heatTreatmentList = data;
      this.impactTestList = data;
      this.pressureTestList = data;
      this.radiographyList = data;
      this.scheduledRepairList = data;
    });
    this.circuitService.getToxicFluid().subscribe((data: any) => {
      this.toxicFluidList = data;
    });

    this.circuitService.getCriticality().subscribe((data: any) => {
      this.criticalityList = data;
    });
    this.circuitService.getSeismicZoneClassification().subscribe((data: any) => {
      this.seismicZoneList = data;
    });
    this.circuitService.getFireExplosionRisk().subscribe((data: any) => {
      this.fireExplosionRiskList = data;
    });
    this.circuitService.getToxicRisk().subscribe((data: any) => {
      this.toxicRiskList = data;
    });

    this.circuitService.getHeatTreatmentType().subscribe((data: any) => {
      this.heatTreatmentTypeList = data;
    });


    this.circuitService.getPressureTestType().subscribe((data: any) => {
      this.pressureTestTypeList = data;
    });

    this.circuitService.getRadiographyCategory().subscribe((data: any) => {
      this.radiographyCategoryList = data;
    });

    this.circuitService.getGeneralMaterial().subscribe((data: any) => {
      this.generalMaterialList = data;
    });
    this.circuitService.getSchedule().subscribe((data: any) => {
      this.scheduleList = data;
    });
    //YesNoNA
    this.circuitService.getYesNoNa().subscribe((data: any) => {
      debugger
      this.claddingList = data;
      this.liningList = data;
      this.externalCoatingList = data;
      this.insulationList = data;
      this.heatTracingList = data;
      this.fireProofingList = data;
      this.buriedList = data;
      this.cathodicProtectionList = data;
      this.pressureReliefDevicesList = data;
      this.chemicalInjectionList = data;
      this.onlineCorrosionMonitoringList = data;
    });
    this.circuitService.getCladdingType().subscribe((data: any) => {
      this.claddingTypeList = data;
    });
    this.circuitService.getCladdingMaterial().subscribe((data: any) => {
      this.claddingMaterialList = data;
    });

    this.circuitService.getLiningType().subscribe((data: any) => {
      this.liningTypeList = data;
    });
    this.circuitService.getMaterialCertification().subscribe((data: any) => {
      this.materialCertificationList = data;
    });

    this.circuitService.getExternalCoatingType().subscribe((data: any) => {
      this.externalCoatingTypeList = data;
    });

    this.circuitService.getInsulationType().subscribe((data: any) => {
      this.insulationTypeList = data;
    });
    this.circuitService.getInsulationMaterial().subscribe((data: any) => {
      this.insulationMaterialList = data;
    });
    this.circuitService.getCuiPotential().subscribe((data: any) => {
      this.cuiPotentialList = data;
    });
    this.circuitService.getExternalEnvironment().subscribe((data: any) => {
      this.externalEnvironmentList = data;
    });
    this.circuitService.getSupportType().subscribe((data: any) => {
      this.supportTypeList = data;
    });
    this.circuitService.getDetectionSystem().subscribe((data: any) => {
      this.detectionSystemList = data;
    });
    this.circuitService.getIsolationSystem().subscribe((data: any) => {
      this.isolationSystemList = data;
    });
    this.circuitService.getMitigationSystem().subscribe((data: any) => {
      this.mitigationSystemList = data;
    });
    this.circuitService.getCorrosionMonitoringType().subscribe((data: any) => {
      this.corrosionMonitoringTypeList = data;
    });
    this.circuitService.getHazardClassification().subscribe((data: any) => {
      this.hazardClassificationList = data;
    });
    this.circuitService.getCurrentInspectionStrategy().subscribe((data: any) => {
      this.inspectionStrategyList = data;
    });
    this.circuitService.getInspectionAccess().subscribe((data: any) => {
      this.inspectionAccessList = data;
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

  saveCircuit() {
    if (this.circuitForm.invalid) {
    
      return;
    }
    const formData = new FormData();
    Object.keys(this.circuitForm.value).forEach(key => {
      const value = this.circuitForm.value[key];

      // Only append values that are not empty strings or "null"
      if (value !== "" && value !== "null" && value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    this.documentPreviews.forEach(file => {
      formData.append('documents', file);
    });

    this.circuitService.addCircuit(formData).subscribe(
      (response) => {


        Swal.fire({
          title: 'Success!',
          text: 'Circuit added successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.backToCircuit();
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
  // DeleteCircuit() {
  //        Swal.fire({
  //          title: 'Are you sure?You want to delete this system!',
  //          text: 'All data associated with this system will be lost',
  //          icon: 'warning',
  //          width: '300px',
  //          showCancelButton: true,
  //          confirmButtonColor: '#3085d6',
  //          cancelButtonColor: '#d33',
  //          confirmButtonText: 'Yes, Delete it!'
  //        }).then((result) => {
  //          if (result.isConfirmed) {
  //            this.circuitService.deleteCircuit(this.childValue).subscribe(
  //              () => this.backToCircuit(),
  //              error =>
  //                Swal.fire('Delete failed:', error)
  //            );

  //          }
  //        });
  //      }
  backToCircuit() {
    this.router.navigate(['/clientcircuit/list']);
  }

}
