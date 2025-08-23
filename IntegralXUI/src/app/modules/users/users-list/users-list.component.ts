import { Component } from '@angular/core';
import { ClientService } from 'src/app/services/client/client.service'; 
import { ColDef } from 'ag-grid-community';
import { GridComponent } from "../../../common/grid/grid/grid.component";
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-client-list',
  imports: [GridComponent,CommonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
 users: any[] = []; 
 userColumns: ColDef[] = [
    { field: 'firstName', headerName: 'First name', flex: 1 },
    { field: 'lastName', headerName: 'Last name', flex: 1 },
    { field: 'id',headerName: 'id',  hide:true }, 
    { field: 'email', headerName: 'Email' },
    { field: 'contactNumber', headerName: 'Contact Number' , flex: 1 },
    { field: 'role', headerName: 'Role' , flex: 1 },
 {field:'isActive',headerName: 'Status' , flex: 1, valueGetter: params => params.data.isActive? 'Active' : 'Disabled'}
  ];
  userId: number=0;
  action: string;
  canAdd:boolean=false;

  constructor(  private service: ClientService, private router:Router,private sharedDataService: SharedDataService, private auth : AuthService) { 
  }
  ngOnInit(): void {
    this.loadUserdetails();
    this.canAdd = ( this.auth.getCanAdd());
   
  }

  importData(){}
  exportData(){}
  addNew(){
    this.router.navigate(['clientuser/add']);
  }
  

  loadUserdetails() {
      this.service.getClientUserDetails().subscribe((data: any) => {
        
      this.users = data;
      });
  }
  gotoRole(){
    this.router.navigate(['/clientroles/list'])
  }

  onFirstColumnClicked(rowData: any) {
   const myData = { name: 'UserId', id: rowData.id };
   this.auth.setData(myData); 
   
      this.router.navigate(['/clientuser/edit']);
    
  }

}
