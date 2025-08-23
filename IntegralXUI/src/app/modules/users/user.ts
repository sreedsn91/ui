export class User {
    id: number;
    userName?: string;
    clientId?: number;
    clientName?: string;
    contactNumber?: string;
    email?: string;
    role?: string;
    userId?: string;
    password?: string;
    roleId: number;
  
  }

  export class changePassword {
    userId: number;
    oldPassword: string;
    newPassword: number;
    confirmPassword: string;
  
  }

