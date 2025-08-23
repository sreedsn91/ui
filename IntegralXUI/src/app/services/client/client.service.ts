import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';
import { AuthService } from '../auth/auth.service'; 
import { Client } from 'src/app/admin/admin-client/client';
import { Role } from 'src/app/modules/roles/role';



@Injectable({
  providedIn: 'root',
})
export class ClientService {
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
  getClients() { 
    return this.http.get(`${this.apiUrl}Client/Clients`, { headers: this.getHeaders() });
  }

  getClientsDDL() { 
    return this.http.get(`${this.apiUrl}Client/getClientDDL`, { headers: this.getHeaders() });
  }

  getClient(id: number): Observable<any> {
    return this.http.get<Client>(`${this.apiUrl}Client/${id}`,{ headers: this.getHeaders() }
    );
  }
  getClientDetails(id: number): Observable<any> {
    return this.http.get<Client>(`${this.apiUrl}Client/GetClientDetails/${id}`,{ headers: this.getHeaders() }
    );
  }
  
  getModules(): Observable<any> {
    const clientId =Number( this.authService.getClientId());
    return this.http.get<Client>(`${this.apiUrl}Client/Modules`,{ headers: this.getHeaders() }
    );
  }
  

  getClientUserDetails(): Observable<any> {
    const clientId =Number( this.authService.getClientId());
      return this.http.get(`${this.apiUrl}ClientUser/GetAllClientUsers/${clientId}`,{ headers: this.getHeaders() }
      );
    }

    getLogs(): Observable<any> {
      const clientId =Number( this.authService.getClientId());
        return this.http.get(`${this.apiUrl}Audit/Logs/${clientId}`,{ headers: this.getHeaders() }
        );
      }

  getClientExpiryInfo   (): Observable<any> {
    return this.http.get<Client>(`${this.apiUrl}Client/getClientExpiryInfo`,{ headers: this.getHeaders() }      
    );
  }
    
  addClient(client: FormData): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}Client/CreateClientWithModules`, client, { headers: this.getHeadersWithoutType() });
  }

  addClientAdminUser(user: FormData): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}AdminUser/CreateClientAdminUser`, user, { headers: this.getHeaders() });
  }

  getClientAdminUserDetais(userId: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}AdminUser/AdminUserDetails/${userId}`, { headers: this.getHeaders() });
  }

  updateClient(client: Client): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${client.id}`, client);
  }


  deleteItem(id: number) {
   
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.delete(`${this.apiUrl}Client/deleteClient/${id}`, { headers: this.getHeadersWithoutType() });
  }
  deleteUser(id: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.delete(`${this.apiUrl}AdminUser/deleteAdminUser/${id}`, { headers: this.getHeadersWithoutType() });
  }
   checkEmailExists(userId: number,value:string): Observable<Role> {
      const clientId = Number(this.authService.getClientId());  
      return this.http.get<Role>(`${this.apiUrl}ClientUser/CheckEmailExists/${clientId}/${userId}/${value}`,{ headers: this.getHeaders() });
    }

    checkEmailExistsWithClient(clientId: number,userId: number,value:string): Observable<Role> {  
      return this.http.get<Role>(`${this.apiUrl}ClientUser/CheckEmailExists/${clientId}/${userId}/${value}`,{ headers: this.getHeaders() });
    }
   
    checkuserIdExistsWithClient(clientId: number,userId: number,value:string): Observable<Role> {
      return this.http.get<Role>(`${this.apiUrl}ClientUser/CheckUserIdExists/${clientId}/${userId}/${value}`,{ headers: this.getHeaders() });
    }
    
    checkContactExistsWithClient(clientId: number,userId: number,value:string): Observable<Role> {
      return this.http.get<Role>(`${this.apiUrl}ClientUser/CheckContactExists/${clientId}/${userId}/${value}`,{ headers: this.getHeaders() });
    }

    checkuserIdExists(userId: number,value:string): Observable<Role> {
      const clientId = Number(this.authService.getClientId());
      return this.http.get<Role>(`${this.apiUrl}ClientUser/CheckUserIdExists/${clientId}/${userId}/${value}`,{ headers: this.getHeaders() });
    }
  
    checkContactExists(userId: number,value:string): Observable<Role> {
      const clientId = Number(this.authService.getClientId());
      return this.http.get<Role>(`${this.apiUrl}ClientUser/CheckContactExists/${clientId}/${userId}/${value}`,{ headers: this.getHeaders() });
    }
    checkClientNameExists(clientId: number,value:string): Observable<Role> {
      return this.http.get<Role>(`${this.apiUrl}ClientUser/CheckClientExists/${clientId}/${value}`,{ headers: this.getHeaders() });
    }

    checkClientEmailExists(clientId: number,value:string): Observable<Role> {
      return this.http.get<Role>(`${this.apiUrl}ClientUser/CheckClientEamilExists/${clientId}/${value}`,{ headers: this.getHeaders() });
    }
  downloadDocument(documentId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}Client/download/${documentId}`, { headers: this.getHeadersWithoutType(), responseType: 'blob' });
  }
}