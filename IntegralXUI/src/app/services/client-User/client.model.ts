export interface Client {
  id: number;
  name: string;
  purchaseDate: Date;
  expiryDate: Date;
}

export interface ClientStatus {
  id: number;
  name: string;
  purchaseDate?: Date;
  expiryDate: Date;
  daysRemaining: number;
  status: string;
  numberOfUsers: number;        // Add this
  activeUserCount: number;      // Add this
}

export interface ClientChartData {
  active: number;
  expiring: number;
  expired: number;
  clients: ClientStatus[];
}