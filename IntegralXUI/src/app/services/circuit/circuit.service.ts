import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { System } from 'src/app/modules/system/system';

@Injectable({
  providedIn: 'root'
})
export class CircuitService {

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
 

  getCircuitTypes(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getCircuitTypes/${clientId}`);
  }
  getOperationalStatus(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getOperationalStatus/${clientId}`);
  }

  getDesignCode(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getDesignCode/${clientId}`);
  }

  getEditionAndAddendum(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getEditionAndAddendum/${clientId}`);
  }

  getComplianceCertification(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getComplianceCertification/${clientId}`);
  }

  getGeometry(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getGeometry/${clientId}`);
  }

  getOrientation(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getOrientation/${clientId}`);
  }

  getFluidPhase(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getFluidPhase/${clientId}`);
  }

  getCorrosivity(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getCorrosivity/${clientId}`);
  }

  getProcessEnvironment(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getProcessEnvironment/${clientId}`);
  }

  getToxicMixture(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getToxicMixture/${clientId}`);
  }

  getToxicFluid(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getToxicFluid/${clientId}`);
  }

  getFlammability(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getFlammability/${clientId}`);
  }

  getCriticality(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getCriticality/${clientId}`);
  }

  getSeismicZoneClassification(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getSeismicZoneClassification/${clientId}`);
  }

  getFireExplosionRisk(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getFireExplosionRisk/${clientId}`);
  }

  getToxicRisk(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getToxicRisk/${clientId}`);
  }

  getHeatTreatment(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getHeatTreatment/${clientId}`);
  }

  getHeatTreatmentType(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getHeatTreatmentType/${clientId}`);
  }

  getImpactTest(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getImpactTest/${clientId}`);
  }

  getPressureTest(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getPressureTest/${clientId}`);
  }

  getPressureTestType(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getPressureTestType/${clientId}`);
  }

  getRadiography(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getRadiography/${clientId}`);
  }

  getRadiographyCategory(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getRadiographyCategory/${clientId}`);
  }

  getGeneralMaterial(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getGeneralMaterial/${clientId}`);
  }

  getSchedule(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getSchedule/${clientId}`);
  }

  getCladding(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getCladding/${clientId}`);
  }

  getYesNo(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getYesNo/${clientId}`);
  }

  getYesNoNa(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getYesNoNa/${clientId}`);
  }

  getCladdingType(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getCladdingType/${clientId}`);
  }

  getCladdingMaterial(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getCladdingMaterial/${clientId}`);
  }

  getLining(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getLining/${clientId}`);
  }

  getLiningType(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getLiningType/${clientId}`);
  }

  getMaterialCertification(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getMaterialCertification/${clientId}`);
  }

  getExternalCoating(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getExternalCoating/${clientId}`);
  }

  getExternalCoatingType(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getExternalCoatingType/${clientId}`);
  }

  getInsulation(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getInsulation/${clientId}`);
  }

  getInsulationType(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getInsulationType/${clientId}`);
  }

  getInsulationMaterial(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getInsulationMaterial/${clientId}`);
  }

  getCuiPotential(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getCuiPotential/${clientId}`);
  }

  getExternalEnvironment(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getExternalEnvironment/${clientId}`);
  }

  getSupportType(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getSupportType/${clientId}`);
  }

  getHeatTracing(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getHeatTracing/${clientId}`);
  }

  getFireProofing(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getFireProofing/${clientId}`);
  }

  getBuried(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getBuried/${clientId}`);
  }

  getCathodicProtection(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getCathodicProtection/${clientId}`);
  }

  getPressureReliefDevices(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getPressureReliefDevices/${clientId}`);
  }

  getChemicalInjection(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getChemicalInjection/${clientId}`);
  }

  getDetectionSystem(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getDetectionSystem/${clientId}`);
  }

  getIsolationSystem(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getIsolationSystem/${clientId}`);
  }

  getMitigationSystem(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getMitigationSystem/${clientId}`);
  }

  getOnlineCorrosionMonitoring(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getOnlineCorrosionMonitoring/${clientId}`);
  }

  getCorrosionMonitoringType(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getCorrosionMonitoringType/${clientId}`);
  }

  getHazardClassification(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getHazardClassification/${clientId}`);
  }

  getCurrentInspectionStrategy(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getCurrentInspectionStrategy/${clientId}`);
  }

  getInspectionAccess(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getInspectionAccess/${clientId}`);
  }

  getScheduledRepairReplacement(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getScheduledRepairReplacement/${clientId}`);
  }

  getSystems(plantId: number, areaId: number, unitId: number) {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getSystems/${clientId}/${plantId}/${areaId}/${unitId}`, { headers: this.getHeaders() });
  }
  getPlants() {

    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getPlants/${clientId}`, { headers: this.getHeaders() });
  }
  getArea(plantId: number) {

    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getArea/${clientId}/${plantId}`, { headers: this.getHeaders() });
  }

  getUnits(plantId: number, areaId: number) {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getUnits/${clientId}/${plantId}/${areaId}`, { headers: this.getHeaders() });
  }
  getCircuits() {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/Circuits/${clientId}`, { headers: this.getHeaders() });
  }
  addCircuit(circuit: FormData): Observable<System> {
    return this.http.post<System>(`${this.apiUrl}Circuit/CreateCircuit`, circuit, { headers: this.getHeadersWithoutType() });
  }
  deleteCircuit(id: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.delete(`${this.apiUrl}Circuit/DeleteCircuit/${id}`, { headers: this.getHeadersWithoutType() });
  }
  downloadDocument(documentId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}Circuit/download/${documentId}`, { headers: this.getHeadersWithoutType(), responseType: 'blob' });
  }
  getCircuitDetails(systemId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
   debugger
    return this.http.get(`${this.apiUrl}Circuit/GetCircuitDetails/${clientId}/${systemId}`, { headers: this.getHeaders() }
    );
  }
}
