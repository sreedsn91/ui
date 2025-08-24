import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ComponentService } from 'src/app/services/component/component.service';
import { Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';
import { GridComponent } from 'src/app/common/grid/grid/grid.component';

@Component({
  selector: 'app-component-list',
  imports: [GridComponent],
  templateUrl: './component-list.component.html',
  styleUrl: './component-list.component.scss'
})
export class ComponentListComponent {

  equipments: any[] = [];
      systemColumns: ColDef[] = [
        { field: 'componentID', headerName: 'Name', flex: 1 },
        { field: 'id', headerName: 'id', hide: true },
        { field: 'plant', headerName: 'Plant', flex: 1 },
        { field: 'area', headerName: 'Area', flex: 1 },
        { field: 'unit', headerName: 'Unit', flex: 1 },
        { field: 'system', headerName: 'System', flex: 1 },
        { field: 'Circuit', headerName: 'Circuit', flex: 1 },
        { field: 'Status', headerName: 'Status', flex: 1 }
      ];
      action: string;
      constructor(private service: ComponentService, private router: Router, private sharedDataService: SharedDataService)
      {
        this.loadEquipments();
      }
    
      importData() { }
      exportData() { }
      addNew() {
        this.router.navigate(['clientcomponent/add']);
      }
    
      loadEquipments() {
        this.service.getComponent().subscribe((data: any[]) => {
          this.equipments = data;
        });
      }
    
      onFirstColumnClicked(rowData: any) {
    
        // alert(`You clicked on ID: ${rowData.id}`);
        const myData = { name: 'clId', id: rowData.id };
        this.sharedDataService.setData(myData);
    
        this.router.navigate(['/clientcomponent/edit'], {
          state: { systemData: { id: rowData.id } }
        });
    
      }
}
