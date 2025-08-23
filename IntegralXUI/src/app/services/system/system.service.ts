import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { System } from 'src/app/modules/system/system';
@Injectable({
  providedIn: 'root'
})
export class SystemService {

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

  getSystems() {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}System/System/${clientId}`, { headers: this.getHeaders() });
  }
  getPlants() {

    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Unit/getPlants/${clientId}`, { headers: this.getHeaders() });
  }
  getArea(plantId: number) {

    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Unit/getArea/${clientId}/${plantId}`, { headers: this.getHeaders() });
  }

  getUnits(plantId: number, areaId: number) {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}System/getUnits/${clientId}/${plantId}/${areaId}`, { headers: this.getHeaders() });
  }
  getSystemTypes() {

    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}System/getSystemTypes/${clientId}`, { headers: this.getHeaders() });
  }
  getSystemStatus() {

    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}System/getSystemStatus/${clientId}`, { headers: this.getHeaders() });
  }
  getHazardClassification() {

    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}System/getHazardClassification/${clientId}`, { headers: this.getHeaders() });
  }
  GetDdlMaterialofConstruction() {

    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}System/GetDdlMaterialofConstruction/${clientId}`, { headers: this.getHeaders() });
  }
  getDesignCodesStandard() {

    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}System/getDesignCodesStandard/${clientId}`, { headers: this.getHeaders() });
  }
  getCorrosivity() {

    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}System/getCorrosivity/${clientId}`, { headers: this.getHeaders() });
  }
  GetDdlSeismicClassification() {

    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}System/GetDdlSeismicClassification/${clientId}`, { headers: this.getHeaders() });
  }
  GetDdlFireExplosionRisk() {

    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}System/GetDdlFireExplosionRisk/${clientId}`, { headers: this.getHeaders() });
  }
  GetDdlToxicRisks() {

    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}System/GetDdlToxicRisks/${clientId}`, { headers: this.getHeaders() });
  }
  GetDdlCurrentInspectionStrategy() {

    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}System/GetDdlCurrentInspectionStrategy/${clientId}`, { headers: this.getHeaders() });
  }
  checkSystemExists(id: number, areaId: number, unitId: number, plantId: number, value: string): Observable<System> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get<System>(`${this.apiUrl}System/CheckSystemExists/${clientId}/${id}/${unitId}/${areaId}/${plantId}/${value}`, { headers: this.getHeaders() });
  }
  addSystem(unit: FormData): Observable<System> {
    return this.http.post<System>(`${this.apiUrl}System/CreateSystem`, unit, { headers: this.getHeadersWithoutType() });
  }

  getSystemDetails(systemId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
   debugger
    return this.http.get(`${this.apiUrl}System/GetSystemDetails/${clientId}/${systemId}`, { headers: this.getHeaders() }
    );
  }
  downloadDocument(documentId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}System/download/${documentId}`, { headers: this.getHeadersWithoutType(), responseType: 'blob' });
  }
  deleteSystem(id: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.delete(`${this.apiUrl}System/DeleteSystem/${id}`, { headers: this.getHeadersWithoutType() });
  }

}
