export interface Marker {
  x: number;
  y: number;
  page: number;
}

export interface MarkerData {
  markers: Marker[];
  totalPages?: number;
  timestamp?: string;
}