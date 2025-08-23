export class EquipmentDTO {
    // General Information
    id?: number;
    name?: string;
    equipmentDescription?: string;
    equipmentCategory?: number;
    equipmentType?: number;
    subCategory?: number;
    commissioningDate?: Date;
    builtDate?: Date;
    operationalStatus?: number;
   bottomLiningId?: number;
  bottomLiningTypeId?: number;
    cathodicProtectionTypeId?: number;
    // Location Details
    plantID?: number;
    areaID?: number;
    unitID?: number;
    systemID?: number;
    circuitID?: number;
    corrosionLoopID?: string;
    specificLocation?: string;
    pipeFrom?: string;
    pipeTo?: string;
    pfd?: string;
    pAndID?: string;
    isometricDrawing?: string;
    gaDrawing?: string;
      waterDrawsId?: number;
  
    // Design Information
    designCode?: number;
    editionAddendum?: number;
    designPressureInternal?: number;
    designPressureExternal?: number;
    designTemperatureMax?: number;
    designTemperatureMDMT?: number;
    mawp?: number;
    designLife?: number;
    primaryProducts?: string;
    marginPerDay?: string;
    complianceCertification?: number;
    governingRegulatoryBody?: string;
  
    // Geometry Information
    geometry?: number;
    nominalSizeNPS?: string;
    insideDiameter?: number;
    outsideDiameter?: number;
    lengthHeight?: number;
    fillHeight?: number;
    orientation?: number;
    emptyWeight?: number;
    capacity?: number;
    head1Type?: number;
    head2Type?: number;
  
    // Operating Conditions
    operatingPressureMax?: number;
    operatingPressureAvg?: number;
    operatingTempMax?: number;
    operatingTempMin?: number;
    processFluid?: string;
    fluidComposition?: string;
    fluidPhase?: number;
    inventoryVolume?: number;
    density?: string;
    viscosity?: string;
    specificGravity?: number;
    flowRate?: number;
    velocity?: number;
    corrosivity?: number;
    ph?: number;
    processEnvironment?: number;
    toxicMixture?: number;
    toxicFluid?: number;
    flammability?: number;
    operatingWeight?: number;
    criticality?: number;
    humidityLevel?: number;
    seismicZoneClassification?: number;
    fireExplosionRisk?: number;
    toxicRisk?: number;
    totalPopulation?: number;
    populationDensity?: number;
  
    // Fabrication Information
    manufacturer?: string;
    serialNumber?: string;
    warrantyDate?: Date;
    heatTreatment?: number;
    heatTreatmentType?: number;
    impactTest?: number;
    pressureTest?: number;
    pressureTestType?: number;
    testPressure?: number;
    radiography?: number;
    radiographyCategory?: number;
    jointEfficiency?: number;
    otherNDE?: string;
  
    // Material Information
    generalMaterial?: number;
    materialSpecification?: string;
    allowableStress?: number;
    schedule?: number;
    nominalThickness?: number;
    corrosionAllowance?: number;
    cladding?: number;
    claddingType?: number;
    claddingMaterial?: number;
    claddingThickness?: number;
    lining?: number;
    liningType?: number;
    materialCertification?: number;
  
    // External Conditions
    externalCoating?: number;
    externalCoatingType?: number;
    externalCoatingThickness?: string;
    externalCoatingAge?: string;
    insulation?: number;
    insulationType?: number;
    insulationMaterial?: number;
    insulationThickness?: string;
    cuiPotential?: number;
    externalEnvironment?: number;
    supportType?: number;
    heatTracing?: number;
    fireProofing?: number;
    buried?: number;
    cathodicProtection?: number;
     roofCategoryId?: number;
  shellJointcategoryId?: number;
  floorCategoryId?: number;
  foundationCategoryId?: number;
   inserviceStartDate?: Date;
  storageFluid?: string;
  
    // Soil Side Info
    deadLeg?: number;
    deadLegDescription?: string;
    deadLegCategory?: number;
    deadLegType?: number;
    deadLegCriticality?: number;
    injectionPoint?: number;
    mixPoint?: number;
    soilAirInterface?: number;
  
    // Safety and Process Control
    pressureReliefDevices?: number;
    prdID?: string;
    prdSetPressure?: number;
    chemicalInjection?: number;
    detectionSystem?: number;
    isolationSystem?: number;
    mitigationSystem?: number;
    onlineCorrosionMonitoring?: number;
    corrosionMonitoringType?: number;
    hazardClassification?: number;
    safetyEnvironmentalPermits?: string;
    incidentHistory?: number;
  
    // Integrity and Inspection
    currentInspectionStrategy?: number;
    damageMechanisms?: string;
    shutdownTurnaroundFrequency?: number;
    lastMajorShutdownDate?: Date;
    nextMajorShutdownDate?: Date;
    subsequentMajorShutdownDate?: Date;
    mtbf?: number;
    mttr?: number;
    cmlDrawingID?: string;
    inspectionAccess?: number;
    inspectionSupervisor?: string;
    inspector?: string;
    internalInspection?: Date;
    externalInspection?: Date;
    onStreamInspection?: Date;
    tmInspection?: Date;
    prevInternalInspectionDate?: Date;
    prevExternalInspectionDate?: Date;
    prevOnStreamInspectionDate?: Date;
    prevTmInspectionDate?: Date;
    scheduledRepairReplacement?: number;
    scheduledRepairReplacementDate?: Date;
    repairReplacementNextShutdown?: number;
  
    // ERP and Sync Metadata
    erpCircuitCode?: string;
    erpSystem?: string;
    functionalLocation?: string;
    externalSystemID?: string;
    syncStatus?: number;
  
    // Audit Metadata
    createdBy?: string;
    createdDate?: Date;
    lastModifiedBy?: string;
    lastModifiedDate?: Date;
    isDeleted?: boolean;
    isActive?: boolean;
  
    documents?: File[] = [];
    docs?: EquipmentDocs[] = [];
    deletedFiles?: string;
  
    clientId?: number;
    plant?: string;
    area?: string;
    unit?: string;
    system?: string;
    status?: string;
    type?: string;
    createdUser?: string;
    modifiedUser?: string;
    userId?: number;
    generalMaterialAnnularPlateId?: number;
  generalMaterialBottomPlateId?: number;
  generalMaterialShellId?: number;
  materialSpecificationAnnularPlate?: string;
  materialSpecificationBottomPlate?: string;
  materialSpecificationShell?: string;
  bottomTypeId?: number;
  shellLiningId?: number;
  shellLiningTypeId?: number;

  productSideConditionId?: number;
  soilResistivity?: number;
  equipmentFrom?: string;
  equipmentTo?: string;
  astDrainageTypeId?: number;
  astPadTypeId?: number;
  voltage?: number;
  outofServiceFrequency?: string;
  outofServiceInternalInspection?: Date;
  releasePreventionBarrierId?: number;
  rbpTypeId?: number;
  steamCoilHeaterId?: number;
  }
  
  export interface EquipmentDocs {
    id?: number;
    fileName?: string;
    filePath?: string;
    uploadedBy?: string;
    uploadedDate?: Date;
  }
  