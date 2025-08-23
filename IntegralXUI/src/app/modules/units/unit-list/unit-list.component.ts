import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { GridComponent } from 'src/app/common/grid/grid/grid.component';
import { UnitService } from 'src/app/services/unit/unit.service';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';

@Component({
  selector: 'app-unit-list',
  imports: [GridComponent],
  templateUrl: './unit-list.component.html',
  styleUrl: './unit-list.component.scss'
})
export class UnitListComponent {
  units: any[] = [];
  unitColumns: ColDef[] = [
    { field: 'name', headerName: 'Name', flex: 2 },
    { field: 'id', headerName: 'id', hide: true },
    { field: 'plant', headerName: 'Plant' },
    { field: 'area', headerName: 'Area' },
    { field: 'unitType', headerName: 'Type' },
    { field: 'unitCategory', headerName: 'Category', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'location', headerName: 'Location', flex: 1 },
    {
      field: 'builtDate', headerName: 'Built Date', valueFormatter: (params) => {
        if (params.value) {
          const date = new Date(params.value);
          return date.toISOString().split('T')[0];  // Only date part (YYYY-MM-DD)
        }
        return '';
      }, filter: 'agDateColumnFilter'
    },
    {
      field: 'commissioningDate', headerName: 'Commissioning Date', valueFormatter: (params) => {
        if (params.value) {
          const date = new Date(params.value);
          return date.toISOString().split('T')[0];  // Only date part (YYYY-MM-DD)
        }
        return '';
      }, filter: 'agDateColumnFilter'
    },
  ];
  action: string;

  constructor(private service: UnitService, private router: Router, private sharedDataService: SharedDataService) {
  }
  ngOnInit(): void {
    this.loadUnits();
  }

  importData() { }
  exportData() { }
  addNew() {
    this.router.navigate(['clientunit/add']);
  }

  loadUnits() {
    this.service.getUnits().subscribe((data: any[]) => {
      this.units = data;
    });
  }

  onFirstColumnClicked(rowData: any) {

    // alert(`You clicked on ID: ${rowData.id}`);
    const myData = { name: 'UnitId', id: rowData.id };
    this.sharedDataService.setData(myData);

    this.router.navigate(['/clientunit/edit'], {
      state: { unitData: { id: rowData.id } }
    });

  }

}
