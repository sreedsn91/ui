import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { System } from 'src/app/modules/system/system';

@Injectable({
  providedIn: 'root'
})
export class CimlService {


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

       getCIML() {
      const clientId = Number(this.authService.getClientId());
      return this.http.get(`${this.apiUrl}CIML/CIMLs/${clientId}`, { headers: this.getHeaders() });
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

     getCorrosionLoop(plantId: number, areaId: number, unitId: number,systemId: number,corrosionLoopId: number) {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getCorrosionLoop/${clientId}/${plantId}/${areaId}/${unitId}/${systemId}/${corrosionLoopId}`, { headers: this.getHeaders() });
  }

     getEquipment(plantId: number, areaId: number, unitId: number,systemId: number,corrosionLoopId: number,circuitId: number,equipmentId: number) {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getEquipment/${clientId}/${plantId}/${areaId}/${unitId}/${systemId}/${corrosionLoopId}/${circuitId}/${equipmentId}`, { headers: this.getHeaders() });
  }
  
     getComponent(plantId: number, areaId: number, unitId: number,systemId: number,corrosionLoopId: number,circuitId: number,equipmentId: number) {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}Equipment/getComponent/${clientId}/${plantId}/${areaId}/${unitId}/${systemId}/${corrosionLoopId}/${circuitId}/${equipmentId}`, { headers: this.getHeaders() });
  }


       getCIMLDetails(systemId: number): Observable<any> {
      const clientId = Number(this.authService.getClientId());
     debugger
      return this.http.get(`${this.apiUrl}CIML/getCIMLDetails/${clientId}/${systemId}`, { headers: this.getHeaders() }
      );
    }
      deleteCIML(id: number) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      });
      return this.http.delete(`${this.apiUrl}CIML/DeleteCIML/${id}`, { headers: this.getHeadersWithoutType() });
    }
      downloadDocument(documentId: number): Observable<Blob> {
      return this.http.get(`${this.apiUrl}CIML/download/${documentId}`, { headers: this.getHeadersWithoutType(), responseType: 'blob' });
    }
  
      addCIML(circuit: FormData): Observable<System> {
      return this.http.post<System>(`${this.apiUrl}CIML/CreateCIML`, circuit, { headers: this.getHeadersWithoutType() });
    }


    //ddl

    // Component related service calls
getCIMLCategory2(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLCategory/${clientId}`, {
    headers: this.getHeaders(),
  });
}

  getCIMLCategory(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(
      `${this.apiUrl}CIML/getCIMLCategory/${clientId}`,
      { headers: this.getHeaders() }
    );
  }


getCIMLType(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLType/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLOperationalStatus(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLOperationalStatus/${clientId}`, {
    headers: this.getHeaders(),
  });
}
GetDdlCIMLInternalEntry(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/GetDdlCIMLInternalEntry/${clientId}`, {
    headers: this.getHeaders(),
  });
}
GetDdlCIMLAccessType(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/GetDdlCIMLAccessType/${clientId}`, {
    headers: this.getHeaders(),
  });
}
GetDdlCIMLAccessible(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/GetDdlCIMLAccessible/${clientId}`, {
    headers: this.getHeaders(),
  });
}
getCIMLDesignCode(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLDesignCode/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLEditionAddendum(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLEditionAddendum/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLComplianceCertification(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLComplianceCertification/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLGeometry(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLGeometry/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLOrientation(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLOrientation/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLFluidPhase(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLFluidPhase/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLCorrosivity(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLCorrosivity/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLProcessEnvironment(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLProcessEnvironment/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLToxicMixture(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLToxicMixture/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLToxicFluid(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLToxicFluid/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLFlammability(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLFlammability/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLCriticality(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLCriticality/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLSeismicZoneClassification(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLSeismicZoneClassification/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLFireExplosionRisk(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLFireExplosionRisk/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLToxicRisk(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLToxicRisk/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLHeatTreatment(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLHeatTreatment/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLHeatTreatmentType(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLHeatTreatmentType/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLImpactTest(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLImpactTest/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLPressureTest(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLPressureTest/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLPressureTestType(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLPressureTestType/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLRadiography(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLRadiography/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLRadiographyCategory(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLRadiographyCategory/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLGeneralMaterial(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLGeneralMaterial/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLCladding(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLCladding/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLCladdingType(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLCladdingType/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLCladdingMaterial(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLCladdingMaterial/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLLining(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLLining/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLLiningType(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLLiningType/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLMaterialCertification(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLMaterialCertification/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLExternalCoating(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLExternalCoating/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLExternalCoatingType(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLExternalCoatingType/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLInsulation(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLInsulation/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLInsulationType(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLInsulationType/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLInsulationMaterial(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLInsulationMaterial/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLCUIPotential(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLCUIPotential/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLExternalEnvironment(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLExternalEnvironment/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLSupportType(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLSupportType/${clientId}`, {
    headers: this.getHeaders(),
  });
}
GetDdlCIMLSoilToAirInterface(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/GetDdlCIMLSoilToAirInterface/${clientId}`, {
    headers: this.getHeaders(),
  });
}
GetDdlCIMLCIMLInjectionPoint(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/GetDdlCIMLCIMLInjectionPoint/${clientId}`, {
    headers: this.getHeaders(),
  });
}
getCIMLHeatTracing(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLHeatTracing/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLFireProofing(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLFireProofing/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLBuried(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLBuried/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLCathodicProtection(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLCathodicProtection/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLIsitaDeadleg(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLIsitaDeadleg/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLDeadlegCategory(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLDeadlegCategory/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLDeadlegCriticality(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLDeadlegCriticality/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLPressureReliefDevices(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLPressureReliefDevices/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLChemicalInjection(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLChemicalInjection/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLDetectionSystem(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLDetectionSystem/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLIsolationSystem(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLIsolationSystem/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLMitigationSystem(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLMitigationSystem/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLOnlineCorrosionMonitoring(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLOnlineCorrosionMonitoring/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLCorrosionMonitoringType(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLCorrosionMonitoringType/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLHazardClassification(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLHazardClassification/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLIncidentHistory(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLIncidentHistory/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLCurrentInspectionStrategy(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLCurrentInspectionStrategy/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLInspectionAccess(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/GetDdlCIMLAccessible/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLScheduledRepairReplacement(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLScheduledRepairReplacement/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLRepairReplacementDuringNextShutdown(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLRepairReplacementDuringNextShutdown/${clientId}`, {
    headers: this.getHeaders(),
  });
}

getCIMLSyncStatus(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLSyncStatus/${clientId}`, {
    headers: this.getHeaders(),
  });
}
getCIMLInsulationRemovalRequired(): Observable<any> {
  const clientId = Number(this.authService.getClientId());
  return this.http.get(`${this.apiUrl}CIML/getCIMLInsulationRemoval/${clientId}`, {
    headers: this.getHeaders(),
  });
}

}
