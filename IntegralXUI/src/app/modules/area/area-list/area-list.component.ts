import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { GridComponent } from 'src/app/common/grid/grid/grid.component';
import { AreaService } from 'src/app/services/area/area.service';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';

@Component({
  selector: 'app-area-list',
  imports: [GridComponent],
  templateUrl: './area-list.component.html',
  styleUrl: './area-list.component.scss'
})
export class AreaListComponent {
  areas: any[] = [];
  areaColumns: ColDef[] = [
    { field: 'name', headerName: 'Name', flex: 2 },
    { field: 'id', headerName: 'id', hide: true },
    { field: 'plant', headerName: 'Plant' },
    { field: 'areaType', headerName: 'Type' },
    { field: 'areaCategory', headerName: 'Category', flex: 1 },
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

  constructor(private service: AreaService, private router: Router, private sharedDataService: SharedDataService) {
  }
  ngOnInit(): void {
    this.loadAreas();
  }

  importData() { }
  exportData() { }
  addNew() {
    this.router.navigate(['clientarea/add']);
  }

  loadAreas() {
    this.service.getAreas().subscribe((data: any[]) => {
      this.areas = data;
    });
  }

  onFirstColumnClicked(rowData: any) {

    // alert(`You clicked on ID: ${rowData.id}`);
    const myData = { name: 'AreaId', id: rowData.id };
    this.sharedDataService.setData(myData);

    this.router.navigate(['/clientarea/edit'], {
      state: { areaData: { id: rowData.id } }
    });

  }

}
