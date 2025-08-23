import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { System } from 'src/app/modules/system/system';
@Injectable({
  providedIn: 'root'
})
export class ComponentService {


  
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
     
       getComponent() {
      const clientId = Number(this.authService.getClientId());
      return this.http.get(`${this.apiUrl}Component/Components/${clientId}`, { headers: this.getHeaders() });
    }
    
      getPlants() {
    
        const clientId = Number(this.authService.getClientId());
        return this.http.get(`${this.apiUrl}Component/getPlants/${clientId}`, { headers: this.getHeaders() });
      }
      getArea(plantId: number) {
    
        const clientId = Number(this.authService.getClientId());
        return this.http.get(`${this.apiUrl}Component/getArea/${clientId}/${plantId}`, { headers: this.getHeaders() });
      }
    
      getUnits(plantId: number, areaId: number) {
        const clientId = Number(this.authService.getClientId());
        return this.http.get(`${this.apiUrl}Component/getUnits/${clientId}/${plantId}/${areaId}`, { headers: this.getHeaders() });
      }
      
      getSystems(plantId: number, areaId: number, unitId: number) {
        const clientId = Number(this.authService.getClientId());
        return this.http.get(`${this.apiUrl}Component/getSystems/${clientId}/${plantId}/${areaId}/${unitId}`, { headers: this.getHeaders() });
      }
  
       getComponentDetails(systemId: number): Observable<any> {
      const clientId = Number(this.authService.getClientId());
     debugger
      return this.http.get(`${this.apiUrl}Component/GetComponentDetails/${clientId}/${systemId}`, { headers: this.getHeaders() }
      );
    }
      deleteComponent(id: number) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      });
      return this.http.delete(`${this.apiUrl}Component/DeleteComponent/${id}`, { headers: this.getHeadersWithoutType() });
    }
      downloadDocument(documentId: number): Observable<Blob> {
      return this.http.get(`${this.apiUrl}Component/download/${documentId}`, { headers: this.getHeadersWithoutType(), responseType: 'blob' });
    }
  
      addComponent(circuit: FormData): Observable<System> {
      return this.http.post<System>(`${this.apiUrl}Component/CreateComponent`, circuit, { headers: this.getHeadersWithoutType() });
    }


    //ddl

    // Component related service calls
getComponentCategory(): Observable<any> {
  alert("2");
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentCategory/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentType(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentType/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentOperationalStatus(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentOperationalStatus/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentDesignCode(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentDesignCode/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentEditionAddendum(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentEditionAddendum/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentComplianceCertification(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentComplianceCertification/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentGeometry(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentGeometry/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentOrientation(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentOrientation/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentFluidPhase(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentFluidPhase/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentCorrosivity(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentCorrosivity/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentProcessEnvironment(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentProcessEnvironment/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentToxicMixture(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentToxicMixture/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentToxicFluid(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentToxicFluid/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentFlammability(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentFlammability/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentCriticality(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentCriticality/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentSeismicZoneClassification(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentSeismicZoneClassification/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentFireExplosionRisk(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentFireExplosionRisk/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentToxicRisk(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentToxicRisk/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentHeatTreatment(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentHeatTreatment/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentHeatTreatmentType(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentHeatTreatmentType/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentImpactTest(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentImpactTest/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentPressureTest(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentPressureTest/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentPressureTestType(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentPressureTestType/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentRadiography(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentRadiography/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentRadiographyCategory(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentRadiographyCategory/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentGeneralMaterial(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentGeneralMaterial/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentCladding(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentCladding/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentCladdingType(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentCladdingType/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentCladdingMaterial(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentCladdingMaterial/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentLining(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentLining/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentLiningType(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentLiningType/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentMaterialCertification(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentMaterialCertification/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentExternalCoating(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentExternalCoating/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentExternalCoatingType(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentExternalCoatingType/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentInsulation(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentInsulation/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentInsulationType(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentInsulationType/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentInsulationMaterial(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentInsulationMaterial/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentCUIPotential(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentCUIPotential/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentExternalEnvironment(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentExternalEnvironment/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentSupportType(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentSupportType/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentHeatTracing(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentHeatTracing/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentFireProofing(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentFireProofing/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentBuried(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentBuried/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentCathodicProtection(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentCathodicProtection/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentIsitaDeadleg(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentIsitaDeadleg/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentDeadlegCategory(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentDeadlegCategory/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentDeadlegCriticality(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentDeadlegCriticality/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentPressureReliefDevices(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentPressureReliefDevices/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentChemicalInjection(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentChemicalInjection/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentDetectionSystem(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentDetectionSystem/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentIsolationSystem(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentIsolationSystem/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentMitigationSystem(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentMitigationSystem/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentOnlineCorrosionMonitoring(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentOnlineCorrosionMonitoring/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentCorrosionMonitoringType(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentCorrosionMonitoringType/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentHazardClassification(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentHazardClassification/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentIncidentHistory(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentIncidentHistory/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentCurrentInspectionStrategy(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentCurrentInspectionStrategy/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentInspectionAccess(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentInspectionAccess/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentScheduledRepairReplacement(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentScheduledRepairReplacement/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentRepairReplacementDuringNextShutdown(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentRepairReplacementDuringNextShutdown/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentSyncStatus(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}Component/getComponentSyncStatus/${clientId}`, {
    headers: this.getHeaders(),
  });
}

}
