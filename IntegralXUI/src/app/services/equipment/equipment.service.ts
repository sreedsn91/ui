import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { System } from 'src/app/modules/system/system';
@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

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
 
   getEquipments() {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/Equipments/${clientId}`, { headers: this.getHeaders() });
  }

  getPlants() {

    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getPlants/${clientId}`, { headers: this.getHeaders() });
  }
  getArea(plantId: number) {

    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getArea/${clientId}/${plantId}`, { headers: this.getHeaders() });
  }

  getUnits(plantId: number, areaId: number) {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getUnits/${clientId}/${plantId}/${areaId}`, { headers: this.getHeaders() });
  }
  
  getSystems(plantId: number, areaId: number, unitId: number) {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getSystems/${clientId}/${plantId}/${areaId}/${unitId}`, { headers: this.getHeaders() });
  }
  getCircuits(plantId: number, areaId: number, unitId: number,systemId: number) {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getCircuits/${clientId}/${plantId}/${areaId}/${unitId}/${systemId}`, { headers: this.getHeaders() });
  }
  getYesNo(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getYesNo/${clientId}`);
  }

  getYesNoNa(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Circuit/getYesNoNa/${clientId}`);
  }
  getEquipmentCategory(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(
      `${this.apiUrl}Equipment/getEquipmentCategoryList/${clientId}`,
      { headers: this.getHeaders() }
    );
  }
  getEquipmentType(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(
      `${this.apiUrl}Equipment/getEquipmentTypeList/${clientId}`,
      { headers: this.getHeaders() }
    );
  }
  EquipmentSubCategory(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(
      `${this.apiUrl}Equipment/getEquipmentSubCategoryList/${clientId}`,
      { headers: this.getHeaders() }
    );
  }
  getEquipmentOperationalStatus(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(
      `${this.apiUrl}Equipment/getEquipmentOperationalStatusList/${clientId}`,
      { headers: this.getHeaders() }
    );
  }




   getEquipmentTankOperationalStatus(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(
      `${this.apiUrl}Equipment/getEquipmentTankOperationalStatus/${clientId}/${typeId}`,
      { headers: this.getHeaders() }
    );
  }

  getEquipmentToxicRisk(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(
      `${this.apiUrl}Equipment/getEquipmentToxicRisk/${clientId}/${typeId}`,
      { headers: this.getHeaders() }
    );
  }

  getEquipmentToxicFluid(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(
      `${this.apiUrl}Equipment/getEquipmentToxicFluid/${clientId}/${typeId}`,
      { headers: this.getHeaders() }
    );
  }

  getEquipmentSyncStatus(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(
      `${this.apiUrl}Equipment/getEquipmentSyncStatus/${clientId}/${typeId}`,
      { headers: this.getHeaders() }
    );
  }

  getEquipmentSupportType(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(
      `${this.apiUrl}Equipment/getEquipmentSupportType/${clientId}/${typeId}`,
      { headers: this.getHeaders() }
    );
  }

  getEquipmentSubCategory(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(
      `${this.apiUrl}Equipment/getEquipmentSubCategory/${clientId}/${typeId}`,
      { headers: this.getHeaders() }
    );
  }

  getEquipmentShellLiningType(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(
      `${this.apiUrl}Equipment/getEquipmentShellLiningType/${clientId}/${typeId}`,
      { headers: this.getHeaders() }
    );
  }

  getEquipmentShellJointCategory(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(
      `${this.apiUrl}Equipment/getEquipmentShellJointCategory/${clientId}/${typeId}`,
      { headers: this.getHeaders() }
    );
  }

  getEquipmentSeismicZoneClassification(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(
      `${this.apiUrl}Equipment/getEquipmentSeismicZoneClassification/${clientId}/${typeId}`,
      { headers: this.getHeaders() }
    );
  }
  getEquipmentSchedule(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(
      `${this.apiUrl}Equipment/getEquipmentSchedule/${clientId}/${typeId}`,
      { headers: this.getHeaders() }
    );
  }

  getEquipmentRPBType(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(
      `${this.apiUrl}Equipment/getEquipmentRPBType/${clientId}/${typeId}`,
      { headers: this.getHeaders() }
    );
  }

  getEquipmentRoofCategory(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(
      `${this.apiUrl}Equipment/getEquipmentRoofCategory/${clientId}/${typeId}`,
      { headers: this.getHeaders() }
    );
  }

  getEquipmentRadiographyCategory(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(
      `${this.apiUrl}Equipment/getEquipmentRadiographyCategory/${clientId}/${typeId}`,
      { headers: this.getHeaders() }
    );
  }

  getEquipmentProductSideCondition(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(
      `${this.apiUrl}Equipment/getEquipmentProductSideCondition/${clientId}/${typeId}`,
      { headers: this.getHeaders() }
    );
  }

  getEquipmentProcessEnvironment(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(
      `${this.apiUrl}Equipment/getEquipmentProcessEnvironment/${clientId}/${typeId}`,
      { headers: this.getHeaders() }
    );
  }

  getEquipmentPressureTestType(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(
      `${this.apiUrl}Equipment/getEquipmentPressureTestType/${clientId}/${typeId}`,
      { headers: this.getHeaders() }
    );
  }

  getEquipmentOrientation(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(
      `${this.apiUrl}Equipment/getEquipmentOrientation/${clientId}/${typeId}`,
      { headers: this.getHeaders() }
    );
  }

  getEquipmentOperationalStatusType(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(
      `${this.apiUrl}Equipment/getEquipmentOperationalStatusType/${clientId}/${typeId}`,
      { headers: this.getHeaders() }
    );
  }

  getEquipmentMitigationSystem(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(
      `${this.apiUrl}Equipment/getEquipmentMitigationSystem/${clientId}/${typeId}`,
      { headers: this.getHeaders() }
    );
  }

  getEquipmentMaterialCertification(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(
      `${this.apiUrl}Equipment/getEquipmentMaterialCertification/${clientId}/${typeId}`,
      { headers: this.getHeaders() }
    );
  }
  getEquipmentLiningType(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentLiningType/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentIsolationSystem(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentIsolationSystem/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentInsulationType(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentInsulationType/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentInsulationMaterial(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentInsulationMaterial/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentInspectionAccess(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentInspectionAccess/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentHeatTreatmentType(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentHeatTreatmentType/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentHeatTreatment(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentHeatTreatment/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentHead2Type(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentHead2Type/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentHead1Type(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentHead1Type/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentHazardClassification(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentHazardClassification/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentGeometry(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentGeometry/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentGeneralMaterialShell(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentGeneralMaterialShell/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentGeneralMaterialBottomPlate(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentGeneralMaterialBottomPlate/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentGeneralMaterialAnnularPlate(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentGeneralMaterialAnnularPlate/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }
  getEquipmentGeneralMaterial(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentGeneralMaterial/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentFoundationCategory(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentFoundationCategory/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentFluidPhase(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentFluidPhase/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentFloorCategory(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentFloorCategory/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentFireExplosionRisk(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentFireExplosionRisk/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentFabricationGeometry(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentFabricationGeometry/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentExternalEnvironment(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentExternalEnvironment/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentExternalCoatingType(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentExternalCoatingType/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentEquipmentType(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentEquipmentType/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentEquipmentCategory(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentEquipmentCategory/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentEditionAddendum(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentEditionAddendum/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentDetectionSystem(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentDetectionSystem/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }
  getEquipmentDesignCode(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentDesignCode/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentDeadLegType(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentDeadLegType/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentDeadLegCriticality(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentDeadLegCriticality/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentDeadLegCategory(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentDeadLegCategory/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentCurrentInspectionStrategy(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentCurrentInspectionStrategy/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentCUIPotential(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentCUIPotential/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentCriticality(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentCriticality/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentCorrosivity(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentCorrosivity/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentCorrosionMonitoringType(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentCorrosionMonitoringType/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }
  getEquipmentComplianceCertification(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentComplianceCertification/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentCladdingType(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentCladdingType/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentCladdingMaterial(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentCladdingMaterial/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentCathodicProtectionType(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentCathodicProtectionType/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentBottomType(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentBottomType/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentBottomLiningType(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentBottomLiningType/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentASTPadType(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentASTPadType/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }

  getEquipmentASTDrainageType(typeId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipmentASTDrainageType/${clientId}/${typeId}`, {
      headers: this.getHeaders(),
    });
  }
   addEquipment(circuit: FormData): Observable<System> {
    return this.http.post<System>(`${this.apiUrl}Equipment/CreateEquipment`, circuit, { headers: this.getHeadersWithoutType() });
  }

    getEquipmentDetails(systemId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
   debugger
    return this.http.get(`${this.apiUrl}Equipment/GetEquipmentDetails/${clientId}/${systemId}`, { headers: this.getHeaders() }
    );
  }
    deleteEquipment(id: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.delete(`${this.apiUrl}Equipment/DeleteEquipment/${id}`, { headers: this.getHeadersWithoutType() });
  }
    downloadDocument(documentId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}Equipment/download/${documentId}`, { headers: this.getHeadersWithoutType(), responseType: 'blob' });
  }

}
