import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: any;

  constructor(private http: HttpClient) { }

  loadConfig(): Promise<void> {

    return this.http
      .get('../../../assets/configs/config.json')
      .toPromise()
      .then((config) => {
        this.config = config;
      })
      .catch((error) => {
        console.error('Could not load config:', error);
        return Promise.reject(error);
      });
  }

  getConfig(key: string): any {
    return this.config ? this.config[key] : null;
  }
  
  getBaseLocation(): any {
    var location = this.config ? this.config['AttachmentBaseLocation'] : null;
    return location+'/Uploads/Clients';
  }


}
