import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { Plant } from 'src/app/modules/plant/plant';

@Injectable({
  providedIn: 'root'
})
export class ImportService {

 
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
   addExcel(unit: FormData): Observable<any> {
       return this.http.post<any>(`${this.apiUrl}Import/ImportPlantExcel`, unit, { headers: this.getHeadersWithoutType() });
     }

   addExcelCircuit(unit: FormData): Observable<any> {
       return this.http.post<any>(`${this.apiUrl}CircuitImport/ImportCircuitExcel`, unit, { headers: this.getHeadersWithoutType() });
     }
}
