import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private data: any;

  constructor() {}

  // Setter method to store data
  setData(value: any) {
    this.data = value;
  }

  // Getter method to retrieve data
  getData() {
    return this.data;
  }

  // Optional: Clear data after retrieving
  clearData() {
    this.data = null;
  }
}
