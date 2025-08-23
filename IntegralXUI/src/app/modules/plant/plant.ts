export interface Plant {
  id?: number;
  clientId?: number;
  name?: string;
  description?: string;
  location?: string;
  locationGpsCoordinates?: string;
  facilityName?: string;
  ownerOrOperator?: string;
  commissioningDate?: Date;
  builtDate?: Date;
  status?: string;
  statusId?: number;
  plantType?: string;
  typeId?: number;
  plantCategory?: string;
  categoryId?: number;
  designLife?: number;
  primaryProducts?: string;
  capacity?: number;
  marginPerDay?: number;
  numberOfProcessingUnits?: number;
  operatingTemperatureRange?: number;
  operatingPressureRange?: number;
  corrosiveEnvironments?: string;
  humidityLevel?: string;
  seismicZoneClassification?: string;
  weatherConditions?: string;
  totalPopulation?: number;
  populationDensity?: number;
  governingRegulatoryBody?: string;
  safetyEnvironmentalPermits?: string;
  complianceCertifications?: string;
  incidentHistory?: string;
  shutdownTurnaroundFrequency?: number;
  lastMajorOverhaulDate?: Date;
  nextMajorOverhaulDate?: Date;
  addedBy?: number;
  addedOn?: Date;
  modifiedBy?: number;
  modifiedOn?: Date;
  isDeleted?: boolean;
  isActive?: boolean;
  designCodesStandardId?: number;
  processTypeId?: number;
  primaryFeedstockId?: number;
  currentMaintenanceStrategyId?: number;
  fireExplosionRiskId?: number;
  hazardClassificationId?: number;
  reliabilityMetricsId?: number;
  modelAvailabilityId?: number;
  sapLinkedEquipmentDataId?: number;
  historicalRecordsAvailabilityId?: number;
  userId?: number;
  deletedFiles?: string;
  eRPorCMMSPlantCode?:  string;
  eRPorCMMSSystem? :  string;
  functionalLocation?:  string;
  externalSystemID? :  string;
  syncStatus? :  string;
  addedOnDate ?: Date;
  modifiedOnDate?: Date;
  addedByName :string;
  modifiedByName:string;
}

  
  
  export interface PlantDocs {
    id?: number;
    clientId: number;
    PlantId: number;
    docName: string;
    docLocation: string;
  }