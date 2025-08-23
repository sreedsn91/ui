import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string;
  private canAdd: boolean;
  private canEdit: boolean;
  private isSuper: boolean;
  private canDelete: boolean;
  private hasAccess: boolean;
  private userName: string;
  private userEmail: string;
  private userRole: string;
  private logo: string;
  private userimage: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = configService.getConfig("apiUrl");
  }
  private userId: string | null = null;
  private clientId: string | null = null;
  private data: any;

  // Setter method to store data
  setData(value: any) {
    this.data = value;
  }

  // Getter method to retrieve data
  getData() {
    return this.data;
  }

  clearUserData(): void {
    this.userId = null;
    this.clientId = null;
  }
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.getToken()}`, // Get token from AuthService
    });
  }
  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: '*/*',
    });
    const body = { username, password };

    return this.http.post(`${this.apiUrl}Auth/login`, body, { headers }).pipe(
      tap((response: any) => {
        if (response.token) {
          
          this.setToken(response.token);
          this.setUserId(response.userId);
          this.setName(response.name);
          this.setEmail(response.email);
          this.setRole(response.role);
          this.setclientId(response.clientId);
          this.setLogo(response.logo);
          this.setUserImage(response.user);
          this.setSuper(response.super);
        }
      })
    );
  }
  private secretKey = 'Xlargetnirofyek';
  setEncryptedItem(key: string, value: any): void {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(value), this.secretKey).toString();
    localStorage.setItem(key, encrypted);
  }
  getDecryptedItem(key: string): any {
    const encrypted = localStorage.getItem(key);
    if (!encrypted) return null;
    try {
      const bytes = CryptoJS.AES.decrypt(encrypted, this.secretKey);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (e) {
      console.error('Decryption error:', e);
      return null;
    }
  }
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }
  setUserId(userId: number): void {
    this.setEncryptedItem('diu', userId.toString());
  }
  setclientId(clientId: number): void {
    this.setEncryptedItem('cid', clientId.toString());
  }
  setName(name: string): void {
    this.userName = name;
  }


  setEmail(email: string): void {
    this.userEmail = email;
  }
  setRole(role: string): void {
    this.userRole = role;
  }
  setLogo(logo: string): void {
    this.logo = logo;
  }
  setUserImage(image: string): void {
    this.userimage = image;
  }
  getUserImage(): string | null {
    return this.userimage;
  }
  getLogo(): string | null {
    return this.logo;
  }
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
  getUserId(): number | null {
    return Number(this.getDecryptedItem('diu'));
  }
  getClientId(): number | null {
    return Number(this.getDecryptedItem('cid'));
  }
  // getUserName(): string | null {
  // if(this.userName ==null || this.userName=='undefined')
  // {this.setClientUserDetails();}

  //   return this.userName;
  // }

  async getUserName(): Promise<string | null> {
    
    if (!this.userName || this.userName === 'undefined') {
      await this.setClientUserDetails(); // Wait for user details to be set
    }
    return this.userName;
  }
  getUserEmail(): string | null {
    return this.userEmail;
  }
  getUserRole(): string | null {
    return this.userRole;
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
  hasModuleAccess(moduleId: number): Promise<{ 
    canAccess: boolean; 
    canAdd: boolean; 
    canEdit: boolean; 
    canDelete: boolean; 
    isSuperAdmin: boolean 
  }> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
  
    const userId = this.getUserId();
    const clientId = this.getClientId();
    const requestBody = { ClientId: clientId, UserId: userId, ItemId: moduleId };
  
    return this.http.post<{ 
      canAccess: boolean; 
      canAdd: boolean; 
      canEdit: boolean; 
      canDelete: boolean; 
      isSuperAdmin: boolean 
    }>(`${this.apiUrl}Menu/HasModuleAccess`, requestBody, { headers })
      .toPromise()
      .then(response => {
        if (response) {
          this.setHasAccess(response.canAccess);
          this.setCanAdd(response.canAdd);
          this.setCanEdit(response.canEdit);
          this.setCanDelete(response.canDelete);
          this.setSuper(response.isSuperAdmin);
          return response; // Return full response
        }
        return { canAccess: false, canAdd: false, canEdit: false, canDelete: false, isSuperAdmin: false };
      })
      .catch(error => {
        console.error('Error checking access:', error);
        return { canAccess: false, canAdd: false, canEdit: false, canDelete: false, isSuperAdmin: false };
      });
  }
  

  async setClientUserDetails(): Promise<any> {
    const UserId = Number(this.getUserId());

    try {
      const response = await this.http.get<any>(`${this.apiUrl}Auth/UserInfo/${UserId}`, { headers: this.getHeaders() }).toPromise();

      if (response) {
        // Set required values
        this.setName(response.userName);
        this.setEmail(response.email);
        this.setRole(response.roleId);
        this.setclientId(response.clientId);
        this.setLogo(response.clientLogo);
        this.setUserImage(response.image);
      }

      return response;
    } catch (error) {
      console.error('Error fetching user details:', error);
      return null; // Handle errors gracefully
    }
  }

  setHasAccess(hasAccess: boolean): void {
    this.hasAccess = hasAccess;
  }
  getHasAccess(): boolean | null {
    return this.hasAccess;
  }

  setCanAdd(casAdd: boolean): void {
    this.canAdd = casAdd;
  }
  getCanAdd(): boolean | null {
    return this.canAdd;
  }
  setCanEdit(canEdit: boolean): void {
    this.canEdit = canEdit;
  }
  getCanEdit(): boolean | null {
    return this.canEdit;
  }
  setCanDelete(canDelete: boolean): void {
    this.canDelete = canDelete;
  }
  getCanDelete(): boolean | null {
    return this.canDelete;
  }
  setSuper(issuper: boolean): void {
    this.isSuper = issuper;
  }
  getSuper(): boolean | null {
    return this.isSuper;
  }
}
