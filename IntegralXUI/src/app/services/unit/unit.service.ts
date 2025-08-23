import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { Unit } from 'src/app/modules/units/units';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

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
   getArea(plantId:number) { 
    
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Unit/getArea/${clientId}/${plantId}`, { headers: this.getHeaders() });
   }
   getPlants() { 
    
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Unit/getPlants/${clientId}`, { headers: this.getHeaders() });
   }
   getUnits() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Unit/Units/${clientId}`, { headers: this.getHeaders() });
   }
   getUnitDetails(unitId:number): Observable<any> {
    const clientId =Number( this.authService.getClientId());
      return this.http.get(`${this.apiUrl}Unit/GetUnitDetails/${clientId}/${unitId}`,{ headers: this.getHeaders() }
      );
    }
   getUnitTypes() { 
    
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Unit/getUnitTypes/${clientId}`, { headers: this.getHeaders() });
   }
   getUnitPlants() { 
    
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Unit/getPlants/${clientId}`, { headers: this.getHeaders() });
   }
   getUnitCategories() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Unit/getUnitcategory/${clientId}`, { headers: this.getHeaders() });
   }
   getUnitStatuses() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Unit/getUnitStatus/${clientId}`, { headers: this.getHeaders() });
   }
  addUnit(unit: FormData): Observable<Unit> {
     return this.http.post<Unit>(`${this.apiUrl}Unit/createUnit`, unit, { headers: this.getHeadersWithoutType() });
   }
   
  checkUnitExists(unitId: number,plantId: number,value:string): Observable<Unit> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get<Unit>(`${this.apiUrl}Unit/CheckUnitExists/${clientId}/${unitId}/${plantId}/${value}`,{ headers: this.getHeaders() });
  }
  downloadDocument(documentId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}Unit/download/${documentId}`, { headers: this.getHeadersWithoutType(), responseType: 'blob' });
  }
  
  deleteUnit(id: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.delete(`${this.apiUrl}Unit/DeleteUnit/${id}`, { headers: this.getHeadersWithoutType() });
  }
 
  getPlantdesignCodesStandards() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Unit/getPlantdesignCodesStandards/${clientId}`, { headers: this.getHeaders() });
   }
   getPlantprocessTypes() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Unit/getPlantprocessTypes/${clientId}`, { headers: this.getHeaders() });
   }
   getPlantprimaryFeedstocks() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Unit/getPlantprimaryFeedstocks/${clientId}`, { headers: this.getHeaders() });
   }
   getPlantmaintenanceStrategies() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Unit/getPlantmaintenanceStrategies/${clientId}`, { headers: this.getHeaders() });
   }
   getPlantfireExplosionRisks() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Unit/getPlantfireExplosionRisks/${clientId}`, { headers: this.getHeaders() });
   }
   getPlanthazardClassifications() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Unit/getPlanthazardClassifications/${clientId}`, { headers: this.getHeaders() });
   }
   getPlantreliabilityMetrics() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Unit/getPlantreliabilityMetrics/${clientId}`, { headers: this.getHeaders() });
   }
   getPlantmodelAvailabilities() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Unit/getPlantmodelAvailabilities/${clientId}`, { headers: this.getHeaders() });
   }
   getPlantsapLinkedEquipmentData() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Unit/getPlantsapLinkedEquipmentData/${clientId}`, { headers: this.getHeaders() });
   }
   getPlanthistoricalRecordsAvailability() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Unit/getPlanthistoricalRecordsAvailability/${clientId}`, { headers: this.getHeaders() });
   }
}
