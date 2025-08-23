import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { GridComponent } from 'src/app/common/grid/grid/grid.component';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';

import { CorrossionLoopService } from 'src/app/services/corrossionLoop/corrossion-loop.service';

@Component({
  selector: 'app-corrossion-loop-list',
  imports: [GridComponent],
  templateUrl: './corrossion-loop-list.component.html',
  styleUrl: './corrossion-loop-list.component.scss'
})
export class CorrossionLoopListComponent {
 equipments: any[] = [];
    systemColumns: ColDef[] = [
      { field: 'name', headerName: 'Name', flex: 1 },
      { field: 'id', headerName: 'id', hide: true },
      { field: 'plant', headerName: 'Plant', flex: 1 },
      { field: 'area', headerName: 'Area', flex: 1 },
      { field: 'unit', headerName: 'Unit', flex: 1 },
      { field: 'system', headerName: 'System', flex: 1 },
      { field: 'rBICircuitId', headerName: 'RBI Circuit', flex: 1 },
      { field: 'corrosionLoopDrawing', headerName: 'CL Drawing', flex: 1 },
      { field: 'corrosionLoopFrom', headerName: 'CL From', flex: 1 },
      { field: 'corrosionLoopTo', headerName: 'CL To', flex: 1 }
    ];
    action: string;
    constructor(private service: CorrossionLoopService, private router: Router, private sharedDataService: SharedDataService)
    {
      this.loadEquipments();
    }
  
    importData() { }
    exportData() { }
    addNew() {
      this.router.navigate(['clientcorrosionloop/add']);
    }
  
    loadEquipments() {
      this.service.getCorrosionLoop().subscribe((data: any[]) => {
        this.equipments = data;
      });
    }
  
    onFirstColumnClicked(rowData: any) {
  
      // alert(`You clicked on ID: ${rowData.id}`);
      const myData = { name: 'clId', id: rowData.id };
      this.sharedDataService.setData(myData);
  
      this.router.navigate(['/clientcorrosionloop/edit'], {
        state: { systemData: { id: rowData.id } }
      });
  
    }
}
