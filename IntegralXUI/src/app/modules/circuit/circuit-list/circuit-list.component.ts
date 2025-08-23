import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { GridComponent } from 'src/app/common/grid/grid/grid.component';
import { CircuitService } from 'src/app/services/circuit/circuit.service';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';

@Component({
  selector: 'app-circuit-list',
  imports: [GridComponent],
  templateUrl: './circuit-list.component.html',
  styleUrl: './circuit-list.component.scss'
})
export class CircuitListComponent {
circuits: any[] = [];
  systemColumns: ColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'id', headerName: 'id', hide: true },
    { field: 'type', headerName: 'Type' },
    { field: 'plant', headerName: 'Status', flex: 1 },
    { field: 'area', headerName: 'Area', flex: 1 },
    { field: 'unit', headerName: 'Unit', flex: 1 },
    { field: 'system', headerName: 'System', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    {
      field: 'commissioningDate', headerName: 'CommissioningDate', valueFormatter: (params) => {
        if (params.value) {
          const date = new Date(params.value);
          return date.toISOString().split('T')[0];  // Only date part (YYYY-MM-DD)
        }
        return '';
      }, filter: 'agDateColumnFilter'
    },
  ];
  action: string;
  constructor(private service: CircuitService, private router: Router, private sharedDataService: SharedDataService)
  {
    this.loadCircuits();
  }

  importData() { }
  exportData() { }
  addNew() {
    this.router.navigate(['clientcircuit/add']);
  }

  loadCircuits() {
    this.service.getCircuits().subscribe((data: any[]) => {
      this.circuits = data;
    });
  }

  onFirstColumnClicked(rowData: any) {

    // alert(`You clicked on ID: ${rowData.id}`);
    const myData = { name: 'circuitId', id: rowData.id };
    this.sharedDataService.setData(myData);

    this.router.navigate(['/clientcircuit/edit'], {
      state: { systemData: { id: rowData.id } }
    });

  }
}
