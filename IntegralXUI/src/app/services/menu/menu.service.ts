import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { AuthService } from '../auth/auth.service'; 
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl: string;
  private userId:number;
  private clientId:number;

  constructor(private http: HttpClient,private configService: ConfigService ,private authService: AuthService) {
    this.apiUrl = configService.getConfig("apiUrl");
  }
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`, // Get token from AuthService
    });
  }
  getMenu() { 
    this.userId =this.authService.getUserId();
    return this.http.get(`${this.apiUrl}Menu/${this.userId }`, { headers: this.getHeaders() });
  }

   getHierarchy() { 
    const clientId =Number( this.authService.getClientId());
     return this.http.get(`${this.apiUrl}Plant/getHierarchy/${clientId}`, { headers: this.getHeaders() });
   }
 
}
