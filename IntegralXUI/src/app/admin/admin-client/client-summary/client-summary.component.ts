import { Component } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { NgApexchartsModule } from "ng-apexcharts";

@Component({
  selector: 'app-client-summary',
  imports: [NgApexchartsModule],
  templateUrl: './client-summary.component.html',
  styleUrl: './client-summary.component.scss'
})
export class ClientSummaryComponent {
expiryInfo:any;
chartOptions: any;

clients = [
  { id: 1, name: 'Client A', expiryDate: new Date(new Date().setMonth(new Date().getMonth() + 2)) }, // Within 3 months
  { id: 2, name: 'Client B', expiryDate: new Date(new Date().setMonth(new Date().getMonth() + 4)) }, // 3 to 6 months
  { id: 3, name: 'Client C', expiryDate: new Date(new Date().setMonth(new Date().getMonth() + 7)) }, // More than 6 months
  { id: 4, name: 'Client D', expiryDate: new Date(new Date().setMonth(new Date().getMonth() + 1)) }  // Within 3 months
];

constructor(private apiService:ClientService)
{}

ngOnInit()
{
this.loadExpiryInfo();
}
loadExpiryInfo() {
  const expiryCategories = [0, 0, 0];
  this.apiService.getClientExpiryInfo().subscribe((data: any) => {
  
    this.expiryInfo = data;
   
   this.createChart();   
  });
}

createChart() {
  const currentDate = new Date();
  const expiryCategories = [0, 0, 0]; // [Within 3 months, 3-6 months, More than 6 months]

  this.expiryInfo.forEach(client => {
    const monthsDiff = client.expiryStatus;
    if (monthsDiff <= 3) {
      expiryCategories[0]++; // Status 1
    } else if (monthsDiff <= 6) {
      expiryCategories[1]++; // Status 2
    } else {
      expiryCategories[2]++; // Status 3
    }
 
  });

  this.chartOptions = {
    series: expiryCategories,
    chart: {
      type: 'pie'
    },
    labels: ['Expiring within 3 months', 'Expiring in 3-6 months', 'Expiring after 6 months'],
    colors: ['#FF4560', '#FEB019', '#00E396']
  };
}

}
