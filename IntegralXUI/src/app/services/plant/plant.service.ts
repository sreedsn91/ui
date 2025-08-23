import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { Plant } from 'src/app/modules/plant/plant';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

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
   getPlants() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Plant/Plants/${clientId}`, { headers: this.getHeaders() });
   }
   getPlantDetails(plantId:number): Observable<any> {
    const clientId =Number( this.authService.getClientId());
      return this.http.get(`${this.apiUrl}Plant/GetPlantDetails/${clientId}/${plantId}`,{ headers: this.getHeaders() }
      );
    }
   getPlantTypes() { 
    
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Plant/getPlantTypes/${clientId}`, { headers: this.getHeaders() });
   }
   getPlantCategories() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Plant/getPlantcategory/${clientId}`, { headers: this.getHeaders() });
   }
   getPlantStatuses() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Plant/getPlantStatus/${clientId}`, { headers: this.getHeaders() });
   }
  addPlant(plant: FormData): Observable<Plant> {
     return this.http.post<Plant>(`${this.apiUrl}Plant/CreatePlant`, plant, { headers: this.getHeadersWithoutType() });
   }
   
  checkPlantExists(plantId: number,value:string): Observable<Plant> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get<Plant>(`${this.apiUrl}Plant/CheckPlantExists/${clientId}/${plantId}/${value}`,{ headers: this.getHeaders() });
  }
  downloadDocument(documentId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}Plant/download/${documentId}`, { headers: this.getHeadersWithoutType(), responseType: 'blob' });
  }
  deletePlant(id: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.delete(`${this.apiUrl}Plant/DeletePlant/${id}`, { headers: this.getHeadersWithoutType() });
  }

  getPlantdesignCodesStandards() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Plant/getPlantdesignCodesStandards/${clientId}`, { headers: this.getHeaders() });
   }
   getPlantprocessTypes() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Plant/getPlantprocessTypes/${clientId}`, { headers: this.getHeaders() });
   }
   getPlantprimaryFeedstocks() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Plant/getPlantprimaryFeedstocks/${clientId}`, { headers: this.getHeaders() });
   }
   getPlantmaintenanceStrategies() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Plant/getPlantmaintenanceStrategies/${clientId}`, { headers: this.getHeaders() });
   }
   getPlantfireExplosionRisks() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Plant/getPlantfireExplosionRisks/${clientId}`, { headers: this.getHeaders() });
   }
   getPlanthazardClassifications() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Plant/getPlanthazardClassifications/${clientId}`, { headers: this.getHeaders() });
   }
   getPlantreliabilityMetrics() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Plant/getPlantreliabilityMetrics/${clientId}`, { headers: this.getHeaders() });
   }
   getPlantmodelAvailabilities() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Plant/getPlantmodelAvailabilities/${clientId}`, { headers: this.getHeaders() });
   }
   getPlantsapLinkedEquipmentData() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Plant/getPlantsapLinkedEquipmentData/${clientId}`, { headers: this.getHeaders() });
   }
   getPlanthistoricalRecordsAvailability() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Plant/getPlanthistoricalRecordsAvailability/${clientId}`, { headers: this.getHeaders() });
   }
}
