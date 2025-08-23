import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { System } from 'src/app/modules/system/system';
@Injectable({
  providedIn: 'root'
})
export class CorrossionLoopService {

   private apiUrl: string;
   
   
     constructor(private http: HttpClient, private configService: ConfigService, private authService: AuthService) {
       this.apiUrl = configService.getConfig("apiUrl");
     }
     private getHeadersAccept(): HttpHeaders {
       return new HttpHeaders({
         'accept': '*/*',
         Authorization: `Bearer ${this.authService.getToken()}`, // Get token from AuthService
       });
     }
     private getHeaders(): HttpHeaders {
       return new HttpHeaders({
         'Content-Type': 'application/json',
         Authorization: `Bearer ${this.authService.getToken()}`, // Get token from AuthService
       });
     }
   
     private getHeadersWithoutType(): HttpHeaders {
       return new HttpHeaders({
         Authorization: `Bearer ${this.authService.getToken()}`, // Get token from AuthService
       });
     }
   
     getCorrosionLoop() {
      const clientId = Number(this.authService.getClientId());
      return this.http.get(`${this.apiUrl}CorrossionLoop/CorrosionLoop/${clientId}`, { headers: this.getHeaders() });
    }
  
    getPlants() {
  
      const clientId = Number(this.authService.getClientId());
      return this.http.get(`${this.apiUrl}CorrossionLoop/getPlants/${clientId}`, { headers: this.getHeaders() });
    }
    getArea(plantId: number) {
  
      const clientId = Number(this.authService.getClientId());
      return this.http.get(`${this.apiUrl}CorrossionLoop/getArea/${clientId}/${plantId}`, { headers: this.getHeaders() });
    }
  
    getUnits(plantId: number, areaId: number) {
      const clientId = Number(this.authService.getClientId());
      return this.http.get(`${this.apiUrl}CorrossionLoop/getUnits/${clientId}/${plantId}/${areaId}`, { headers: this.getHeaders() });
    }
    
    getSystems(plantId: number, areaId: number, unitId: number) {
      const clientId = Number(this.authService.getClientId());
      return this.http.get(`${this.apiUrl}CorrossionLoop/getSystems/${clientId}/${plantId}/${areaId}/${unitId}`, { headers: this.getHeaders() });
    }

     getCLDetails(systemId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
   debugger
    return this.http.get(`${this.apiUrl}CorrossionLoop/GetCorrosionLoopDetails/${clientId}/${systemId}`, { headers: this.getHeaders() }
    );
  }
    deleteCL(id: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.delete(`${this.apiUrl}CorrossionLoop/DeleteCorrossionLoop/${id}`, { headers: this.getHeadersWithoutType() });
  }
    downloadDocument(documentId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}CorrossionLoop/download/${documentId}`, { headers: this.getHeadersWithoutType(), responseType: 'blob' });
  }

    addCL(circuit: FormData): Observable<System> {
    return this.http.post<System>(`${this.apiUrl}CorrossionLoop/CreateCorrosionLoop`, circuit, { headers: this.getHeadersWithoutType() });
  }
}
