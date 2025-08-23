import { Component } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service'; 
import { ColDef } from 'ag-grid-community';
import { GridComponent } from 'src/app/common/grid/grid/grid.component';
import { CommonModule } from '@angular/common';
import { LoadingService } from 'src/app/common/loadingPanel/loading.service';

@Component({
  selector: 'app-logs',
  imports: [GridComponent,CommonModule],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.scss'
})
export class LogsComponent {
users: any[] = []; 
 userColumns: ColDef[] = [
    { field: 'userName', headerName: 'User', flex: 1 },
    { field: 'action', headerName: 'Action', flex: 1 },
     { field: 'tableName', headerName: 'Entity', flex: 1 },
    { field: 'id',headerName: 'id',  hide:true }, 
    { field: 'oldValues', headerName: 'Modified from' },
    { field: 'newValues', headerName: 'Modified to' , flex: 1 },
    { field: 'timestamp', headerName: 'Modified on' , flex: 1 }
  ];
constructor( 
  private service: ClientService,
   private ls:LoadingService,
) {
}

ngOnInit() {
  this.ls.showLoading();
  this.loadLogs();
  this.ls.hideLoading();
}

loadLogs() {
  this.service.getLogs().subscribe((data: any) => {
   
  this.users = data;
  });
}
}
