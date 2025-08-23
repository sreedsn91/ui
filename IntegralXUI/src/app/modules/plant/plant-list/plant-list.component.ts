import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { GridComponent } from 'src/app/common/grid/grid/grid.component';
import { PlantService } from 'src/app/services/plant/plant.service';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';

@Component({
  selector: 'app-plant-list',
  imports: [GridComponent],
  templateUrl: './plant-list.component.html',
  styleUrl: './plant-list.component.scss'
})
export class PlantListComponent {
  plants: any[] = [];
  plantColumns: ColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'id', headerName: 'id', hide: true },
    { field: 'plantType', headerName: 'Type' },
    { field: 'plantCategory', headerName: 'Category', flex: 1 },
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

  constructor(private service: PlantService, private router: Router, private sharedDataService: SharedDataService) {
  }
  ngOnInit(): void {
    this.loadPlants();
  }

  importData() { }
  exportData() { }
  addNew() {
    this.router.navigate(['clientplant/add']);
  }

  loadPlants() {
    this.service.getPlants().subscribe((data: any[]) => {
      this.plants = data;
    });
  }

  onFirstColumnClicked(rowData: any) {

    // alert(`You clicked on ID: ${rowData.id}`);
    const myData = { name: 'PlantId', id: rowData.id };
    this.sharedDataService.setData(myData);

    this.router.navigate(['/clientplant/edit'], {
      state: { plantData: { id: rowData.id } }
    });

  }

}
