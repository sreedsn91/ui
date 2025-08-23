import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { GridComponent } from 'src/app/common/grid/grid/grid.component';
import { SystemService } from 'src/app/services/system/system.service'; 
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';

@Component({
  selector: 'app-system-list',
  imports: [GridComponent],
  templateUrl: './system-list.component.html',
  styleUrl: './system-list.component.scss'
})
export class SystemListComponent {

  systems: any[] = [];
  systemColumns: ColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'id', headerName: 'id', hide: true },
    { field: 'type', headerName: 'Type' },
    { field: 'category', headerName: 'Category', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'location', headerName: 'Location', flex: 1 }
  ];
  action: string;

  constructor(private service: SystemService, private router: Router, private sharedDataService: SharedDataService) {
  }
  ngOnInit(): void {
    this.loadsystems();
  }

  importData() { }
  exportData() { }
  addNew() {
    this.router.navigate(['clientsystem/add']);
  }

  loadsystems() {
    this.service.getSystems().subscribe((data: any[]) => {
      this.systems = data;
    });
  }

  onFirstColumnClicked(rowData: any) {

    // alert(`You clicked on ID: ${rowData.id}`);
    const myData = { name: 'systemId', id: rowData.id };
    this.sharedDataService.setData(myData);

    this.router.navigate(['/clientsystem/edit'], {
      state: { systemData: { id: rowData.id } }
    });

  }

}
