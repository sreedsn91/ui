export class System {
    id!: number;
    systemName!: string;
    systemDescription!: string;
    plantId!: number | null;
  
    clientId?: number | null;
    areaId?: number | null;
    unitId?: number | null;
    systemTypeID?: number | null;
    userId?: number | null;
  
    location?: string;
    plant?: string;
    systemType?: string;
    status?: string;
    unit?: string;
    area?: string;
    systemFrom?: string;
    systemTo?: string;
    locationGpsCoordinates?: string;
    ownerOperator?: string;
    commissioningDate?: Date | string;
    builtDate?: Date | string;
    operationalStatusId?: number | null;
  
    // Design and Construction Data
    designCodesAndStandardsId?: number | null;
    designPressure?: number | null;
    designTemperature?: number | null;
    designLife?: number | null;
    primaryProducts?: string;
    capacity?: number | null;
    marginPerDay?: number | null;
    hazardClassification?: string;
    primaryMaterialOfConstruction?: string;
  
    // Environmental & Operating Conditions
    operatingMediumService?: string;
    operatingTemperature?: number | null;
    operatingPressure?: number | null;
    flowRate?: number | null;
    corrosivityId?: number | null;
    corrosiveEnvironments?: string;
    damageMechanisms?: string;
    humidityLevel?: number | null;
    seismicZoneClassification?: string;
    weatherConditions?: string;
    fireExplosionRiskId?: number | null;
    toxicRiskId?: number | null;
    totalPopulation?: number | null;
    populationDensity?: number | null;
  
    // Integrity & Inspection
    currentInspectionStrategyId?: number | null;
    shutdownTurnaroundFrequency?: string;
    lastInspectionDate?: Date | string;
    nextInspectionDueDate?: Date | string;
    lastMajorOverhaulDate?: Date | string;
    nextMajorOverhaulDate?: Date | string;
    subsequentMajorOverhaulDate?: Date | string;
    mtbf?: string;
    mttr?: string;
    inspectionSupervisor?: string;
    inspector?: string;
  
    // Regulatory & Compliance
    governingRegulatoryBody?: string;
    safetyEnvironmentalPermits?: string;
    complianceCertifications?: string;
    incidentHistory?: string;
  
    // Integration & Metadata
    erpcmmsSystemCode?: string;
    erpcmmsSystem?: string;
    functionalLocation?: string;
    externalSystemId?: string;
    syncStatus?: string;
  
    // Record Audit Information
    createdBy?: number | null;
    createdDate?: Date | string;
    lastModifiedBy?: number | null;
    createdUser?: string;
    modifiedUser?: string;
    lastModifiedDate?: Date | string;
  
    isDeleted?: boolean;
    isActive?: boolean;
  
    documents?: File[] = [];
    docs?: SystemDocs[] = [];
    deletedFiles?: string;
  }
  
  export class SystemDocs {
    id?: number;
    clientId: number;
    AreaId: number;
    docName: string;
    docLocation: string;
    // Add more fields if necessary based on backend structure
  }
  