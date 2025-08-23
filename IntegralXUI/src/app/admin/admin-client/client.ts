export interface Client {
     id?: number;
  name: string;
  email: string;
  website: string;
  totalUsers: number;
  purchaseDate?: Date;
  expiryDate?: Date;
  createdOn?: Date;
  lastModifiedOn?: Date;
  details: string;
  selectedModulesJson: string,
  logo?: File;
  documents?: File[];
  selectedModules:  [[]];
  docs:[[]]
  }

  export interface ClientDocument {
    id?: number;
    clientId: number;
    docName: string;
    docLocation: string;
  }
