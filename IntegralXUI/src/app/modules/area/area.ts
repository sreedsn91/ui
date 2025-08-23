export interface Area {
    areaId: number;
    description: string;
    plantId: number;
    location: string;
    type: string;
    category: string;
    status: string;
    builtCompletionDate: Date;
    operationStartDate: Date;
    capacity: number;
    marginPerDay: number;
    totalPopulation: number;
    populationDensity: number;
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
  
  export interface AreaDocs {
    id?: number;
    clientId: number;
    AreaId: number;
    docName: string;
    docLocation: string;
  }
  