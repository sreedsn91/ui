import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';
import { AuthService } from '../auth/auth.service';
import { User } from 'src/app/modules/users/user';
import { Role } from 'src/app/modules/roles/role';


@Injectable({
  providedIn: 'root'
})
export class ClientUserService {
  private apiUrl: string;
  constructor(private http: HttpClient, private configService: ConfigService, private authService: AuthService) {
    this.apiUrl = configService.getConfig("apiUrl");
  }
  private getHeadersAccept(): HttpHeaders {
    return new HttpHeaders({
      'accept': '*/*',
      'Authorization': `Bearer ${this.authService.getToken()}`, // Get token from AuthService
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

  getClientDetails(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}ClientUser/GetAllClientUsers/${clientId}`, { headers: this.getHeaders() }
    );
  }

  addClientUser(user: FormData): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}ClientUser/CreateClientUser`, user, { headers: this.getHeadersWithoutType() });
  }

  getClientUserDetails(userId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get<any>(`${this.apiUrl}ClientUser/GetClientUsersDetails/${userId}/${clientId}`, { headers: this.getHeaders() }
    );
  }
  changePassword(password: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}ClientUser/ChangePassword`, password, { headers: this.getHeadersWithoutType() });
  }

  //roles

  getRoleWithModules(roleId: number): Observable<Role> {

    const clientId = Number(this.authService.getClientId());
    return this.http.get<Role>(`${this.apiUrl}ClientUser/GetRoleWithModules/${roleId}/${clientId}`,{ headers: this.getHeaders() });
  }

  checkEmailExists(userId: number,value:string): Observable<Role> {
    const clientId = Number(this.authService.getClientId());  
    return this.http.get<Role>(`${this.apiUrl}ClientUser/CheckEmailExists/${clientId}/${userId}/${value}`,{ headers: this.getHeaders() });
  }

  checkuserIdExists(userId: number,value:string): Observable<Role> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get<Role>(`${this.apiUrl}ClientUser/CheckUserIdExists/${clientId}/${userId}/${value}`,{ headers: this.getHeaders() });
  }

  checkContactExists(userId: number,value:string): Observable<Role> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get<Role>(`${this.apiUrl}ClientUser/CheckContactExists/${clientId}/${userId}/${value}`,{ headers: this.getHeaders() });
  }
  checkRoleExists(roleId: number,value:string): Observable<Role> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get<Role>(`${this.apiUrl}ClientUser/CheckRoleExists/${clientId}/${roleId}/${value}`,{ headers: this.getHeaders() });
  }

  getRoles(): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}ClientUser/GetUserRoles/${clientId}`, { headers: this.getHeaders() }
    );
  }

  getRolesDetails(roleId: number): Observable<any> {
    const clientId = Number(this.authService.getClientId());
    return this.http.get(`${this.apiUrl}ClientUser/GetUserRolesDetails/${roleId}/${clientId}`, { headers: this.getHeaders() }
    );
  }

  addRole(role: Role): Observable<any> {
    return this.http.post(`${this.apiUrl}ClientUser/CreatUserRoles`, role,{ headers: this.getHeadersWithoutType() });
  }

  updateRole(role: Role): Observable<any> {
    return this.http.put(`${this.apiUrl}ClientUser/updateRole`, role ,{ headers: this.getHeaders() });
  }


  deleteItem(id: number) {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.delete(`${this.apiUrl}ClientUser/DeleteUser/${id}`, { headers: this.getHeadersWithoutType() });
  }

}
