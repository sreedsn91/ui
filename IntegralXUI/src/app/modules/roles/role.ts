export interface Role {
    id?: number;
    name: string;
    details:string;
    clientId?: number;
    isDeleted?: boolean;
    isActive?: boolean;
    isLocked?:boolean;
    accessControlls: AccessControl[];
  }
  
  export interface AccessControl {
    id?: number;
    roleId?: number;
    moduleName:string;
    moduleId: number;
    canAdd: boolean;
    canEdit: boolean;
    canDelete: boolean;
  }