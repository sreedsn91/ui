import { Component } from '@angular/core';
import { ClientUserService } from 'src/app/services/client-User/client-user.service';
import { GridComponent } from "../../../common/grid/grid/grid.component";
import { ColDef } from 'ag-grid-community';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-role-list',
  imports: [GridComponent,CommonModule],
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.scss'
})
export class RoleListComponent {
  roles: any[] = []; 
  canAdd:boolean=false;
  roleColumns: ColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'id',headerName: 'id',  hide:true },
    { field: 'description',headerName: 'Details', flex: 2}
  ];
  
  constructor(
    private service: ClientUserService,
    private sharedDataService: SharedDataService,
    private router:Router,
    private auth : AuthService
  ) {}
  
  ngOnInit()
  {
    this.canAdd = ( this.auth.getCanAdd());
    this.loadRoles();
  }
  
  loadRoles()
  {
    this.service.getRoles().subscribe((data: any) => {
     this.roles = data;
    });
  }
  
  onFirstColumnClicked(rowData: any) {
   const myData = { name: 'RoleId', id: rowData.id };
   this.sharedDataService.setData(myData); 
   
      this.router.navigate(['/clientroles/edit'])
  }
  
  addRole() {
    this.router.navigate(['/clientroles/add']);
  }
  
  }
  