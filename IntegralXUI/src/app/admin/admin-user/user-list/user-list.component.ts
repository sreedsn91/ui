import { Component } from '@angular/core';
import { GridComponent } from "../../../common/grid/grid/grid.component";
import { ColDef } from 'ag-grid-community';
import { Router } from '@angular/router';

import { AdminUserService } from 'src/app/services/admin-User/admin-user.service';
import { ClientService } from 'src/app/services/client/client.service';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';
@Component({
  selector: 'app-user-list',
  imports: [GridComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  users: any[] = [];
  clients: any[];
  userColumns: ColDef[] = [
    { field: 'firstName', headerName: 'FirstName', flex: 1 },
    { field: 'lastName', headerName: 'LastName', flex: 1 },
    { field: 'Id', headerName: 'id', hide: true },
    { field: 'email', headerName: 'Email' },
    { field: 'clientName', headerName: 'Client', flex: 1 },
    { field: 'role', headerName: 'Role', flex: 1 },
  ];
 

  /**
   *
   */
  constructor(private service: AdminUserService, private clientService: ClientService, private router:Router, private sharedDataService:SharedDataService) {

  }
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.service.getAllAdminUsers(0).subscribe((data: any[]) => {
      this.users = data;
    });
  }

  onFirstColumnClicked(rowData: any) {
   const myData = { name: 'UserId', id: rowData.id };
   this.sharedDataService.setData(myData); 
   
      this.router.navigate(['/user/edit']);
  }

  addNew(){
    const myData = { name: 'ClientId', ClientId: 0  };
    this.sharedDataService.setData(myData); 
    
    this.router.navigate(['user/add']);
  }

  exportData() {
    throw new Error('Method not implemented.');
  }

  importData() {
    throw new Error('Method not implemented.');
  }
}
