import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { AuthService } from '../auth/auth.service'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

 private apiUrl: string;
 
 
   constructor(private http: HttpClient,private configService: ConfigService ,private authService: AuthService) {
     this.apiUrl = configService.getConfig("apiUrl");
   }
  
   private getHeaders(): HttpHeaders {
     return new HttpHeaders({
       'Content-Type': 'application/json',
       Authorization: `Bearer ${this.authService.getToken()}`, // Get token from AuthService
     });
   }
  
   getAllAdminUsers(clientId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}AdminUser/GetAllAdminUsers/${clientId}`,{ headers: this.getHeaders() }
    );

    
  }
 
 
}
