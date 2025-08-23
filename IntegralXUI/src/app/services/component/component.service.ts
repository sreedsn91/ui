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
      return this.http.get(`${this.apiUrl}CorrossionLoop/Components/${clientId}`, { headers: this.getHeaders() });
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
  
       getComponentDetails(systemId: number): Observable<any> {
      const clientId = Number(this.authService.getClientId());
     debugger
      return this.http.get(`${this.apiUrl}CorrossionLoop/GetComponentDetails/${clientId}/${systemId}`, { headers: this.getHeaders() }
      );
    }
      deleteComponent(id: number) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      });
      return this.http.delete(`${this.apiUrl}CorrossionLoop/DeleteCorrossionLoop/${id}`, { headers: this.getHeadersWithoutType() });
    }
      downloadDocument(documentId: number): Observable<Blob> {
      return this.http.get(`${this.apiUrl}CorrossionLoop/download/${documentId}`, { headers: this.getHeadersWithoutType(), responseType: 'blob' });
    }
  
      addComponent(circuit: FormData): Observable<System> {
      return this.http.post<System>(`${this.apiUrl}CorrossionLoop/CreateComponent`, circuit, { headers: this.getHeadersWithoutType() });
    }


    //ddl

    // Component related service calls
getComponentCategory2(): Observable<any> {
  alert("2");
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentCategory/${clientId}`, {
    headers: this.getHeaders(),
  });
}

  getComponentCategory(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(
      `${this.apiUrl}CorrossionLoop/getComponentCategory/${clientId}`,
      { headers: this.getHeaders() }
    );
  }


getComponentType(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentType/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentOperationalStatus(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentOperationalStatus/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentDesignCode(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentDesignCode/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentEditionAddendum(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentEditionAddendum/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentComplianceCertification(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentComplianceCertification/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentGeometry(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentGeometry/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentOrientation(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentOrientation/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentFluidPhase(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentFluidPhase/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentCorrosivity(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentCorrosivity/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentProcessEnvironment(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentProcessEnvironment/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentToxicMixture(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentToxicMixture/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentToxicFluid(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentToxicFluid/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentFlammability(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentFlammability/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentCriticality(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentCriticality/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentSeismicZoneClassification(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentSeismicZoneClassification/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentFireExplosionRisk(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentFireExplosionRisk/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentToxicRisk(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentToxicRisk/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentHeatTreatment(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentHeatTreatment/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentHeatTreatmentType(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentHeatTreatmentType/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentImpactTest(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentImpactTest/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentPressureTest(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentPressureTest/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentPressureTestType(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentPressureTestType/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentRadiography(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentRadiography/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentRadiographyCategory(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentRadiographyCategory/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentGeneralMaterial(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentGeneralMaterial/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentCladding(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentCladding/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentCladdingType(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentCladdingType/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentCladdingMaterial(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentCladdingMaterial/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentLining(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentLining/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentLiningType(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentLiningType/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentMaterialCertification(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentMaterialCertification/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentExternalCoating(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentExternalCoating/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentExternalCoatingType(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentExternalCoatingType/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentInsulation(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentInsulation/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentInsulationType(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentInsulationType/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentInsulationMaterial(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentInsulationMaterial/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentCUIPotential(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentCUIPotential/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentExternalEnvironment(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentExternalEnvironment/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentSupportType(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentSupportType/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentHeatTracing(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentHeatTracing/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentFireProofing(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentFireProofing/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentBuried(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentBuried/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentCathodicProtection(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentCathodicProtection/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentIsitaDeadleg(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentIsitaDeadleg/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentDeadlegCategory(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentDeadlegCategory/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentDeadlegCriticality(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentDeadlegCriticality/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentPressureReliefDevices(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentPressureReliefDevices/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentChemicalInjection(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentChemicalInjection/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentDetectionSystem(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentDetectionSystem/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentIsolationSystem(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentIsolationSystem/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentMitigationSystem(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentMitigationSystem/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentOnlineCorrosionMonitoring(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentOnlineCorrosionMonitoring/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentCorrosionMonitoringType(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentCorrosionMonitoringType/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentHazardClassification(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentHazardClassification/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentIncidentHistory(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentIncidentHistory/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentCurrentInspectionStrategy(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentCurrentInspectionStrategy/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentInspectionAccess(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentInspectionAccess/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentScheduledRepairReplacement(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentScheduledRepairReplacement/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentRepairReplacementDuringNextShutdown(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentRepairReplacementDuringNextShutdown/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getComponentSyncStatus(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CorrossionLoop/getComponentSyncStatus/${clientId}`, {
    headers: this.getHeaders(),
  });
}

}
