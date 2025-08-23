import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { Area } from 'src/app/modules/area/area';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  private apiUrl: string;
 
 
   constructor(private http: HttpClient,private configService: ConfigService ,private authService: AuthService) {
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
   getAreas() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Area/Areas/${clientId}`, { headers: this.getHeaders() });
   }
   getAreaDetails(areaId:number): Observable<any> {
    const clientId =Number( this.authService.getClientId());
      return this.http.get(`${this.apiUrl}Area/GetAreaDetails/${clientId}/${areaId}`,{ headers: this.getHeaders() }
      );
    }
   getAreaTypes() { 
    
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Area/getAreaTypes/${clientId}`, { headers: this.getHeaders() });
   }
   getAreaPlants() { 
    
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Area/getPlants/${clientId}`, { headers: this.getHeaders() });
   }
   getAreaCategories() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Area/getAreacategory/${clientId}`, { headers: this.getHeaders() });
   }
   getAreaStatuses() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Area/getAreaStatus/${clientId}`, { headers: this.getHeaders() });
   }
  addArea(area: FormData): Observable<Area> {
     return this.http.post<Area>(`${this.apiUrl}Area/createArea`, area, { headers: this.getHeadersWithoutType() });
   }
   
  checkAreaExists(areaId: number,plantId: number,value:string): Observable<Area> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get<Area>(`${this.apiUrl}Area/CheckAreaExists/${clientId}/${areaId}/${plantId}/${value}`,{ headers: this.getHeaders() });
  }
  downloadDocument(documentId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}Area/download/${documentId}`, { headers: this.getHeadersWithoutType(), responseType: 'blob' });
  }
  
  deleteArea(id: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.delete(`${this.apiUrl}Area/DeleteArea/${id}`, { headers: this.getHeadersWithoutType() });
  }
 
  getPlantdesignCodesStandards() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Area/getPlantdesignCodesStandards/${clientId}`, { headers: this.getHeaders() });
   }
   getPlantprocessTypes() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Area/getPlantprocessTypes/${clientId}`, { headers: this.getHeaders() });
   }
   getPlantprimaryFeedstocks() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Area/getPlantprimaryFeedstocks/${clientId}`, { headers: this.getHeaders() });
   }
   getPlantmaintenanceStrategies() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Area/getPlantmaintenanceStrategies/${clientId}`, { headers: this.getHeaders() });
   }
   getPlantfireExplosionRisks() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Area/getPlantfireExplosionRisks/${clientId}`, { headers: this.getHeaders() });
   }
   getPlanthazardClassifications() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Area/getPlanthazardClassifications/${clientId}`, { headers: this.getHeaders() });
   }
   getPlantreliabilityMetrics() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Area/getPlantreliabilityMetrics/${clientId}`, { headers: this.getHeaders() });
   }
   getPlantmodelAvailabilities() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Area/getPlantmodelAvailabilities/${clientId}`, { headers: this.getHeaders() });
   }
   getPlantsapLinkedEquipmentData() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Area/getPlantsapLinkedEquipmentData/${clientId}`, { headers: this.getHeaders() });
   }
   getPlanthistoricalRecordsAvailability() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Area/getPlanthistoricalRecordsAvailability/${clientId}`, { headers: this.getHeaders() });
   }
}
