import { Component } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service';
import { ColDef } from 'ag-grid-community';
import { GridComponent } from "../../../common/grid/grid/grid.component";
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';
@Component({
  selector: 'app-client-list',
  imports: [GridComponent],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent {
 clients: any[] = []; 
 clientColumns: ColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'id',headerName: 'id',  hide:true }, 
    { field: 'email', headerName: 'Email' },
    { field: 'website', headerName: 'Website', flex: 1  },
    { field: 'totalUsers', headerName: 'No:Users' , flex: 1 },
    { field: 'expiryDate', headerName: 'Expiry', valueFormatter: (params) => {
      if (params.value) {
          const date = new Date(params.value);
          return date.toISOString().split('T')[0];  // Only date part (YYYY-MM-DD)
      }
      return '';
  }, filter:'agDateColumnFilter' },
  ];

  clientId: number=0;
  action: string;

  constructor(  private service: ClientService, private router:Router,private sharedDataService: SharedDataService) { 
  }
  ngOnInit(): void {
    this.loadClients();
  }

  importData(){}
  exportData(){}
  addNew(){
    this.router.navigate(['clients/add']);
  }
  
  loadClients() {
    this.service.getClients().subscribe((data: any[]) => {
      this.clients = data;
    });
  }

  onFirstColumnClicked(rowData: any) {
    
   // alert(`You clicked on ID: ${rowData.id}`);
   const myData = { name: 'ClientId', id: rowData.id };
   this.sharedDataService.setData(myData); 
   
      this.router.navigate(['/clients/edit'], { 
        state: { clientData: { id: rowData.id } } 
      });
    
  }

}
