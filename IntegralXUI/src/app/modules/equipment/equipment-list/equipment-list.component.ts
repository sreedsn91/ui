import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { GridComponent } from 'src/app/common/grid/grid/grid.component';
import { EquipmentService } from 'src/app/services/equipment/equipment.service';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';

@Component({
  selector: 'app-equipment-list',
  imports: [GridComponent],
  templateUrl: './equipment-list.component.html',
  styleUrl: './equipment-list.component.scss'
})
export class EquipmentListComponent {
  equipments: any[] = [];
    systemColumns: ColDef[] = [
      { field: 'name', headerName: 'Name', flex: 1 },
      { field: 'id', headerName: 'id', hide: true },
      { field: 'type', headerName: 'Type' },
      { field: 'plant', headerName: 'Plant', flex: 1 },
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
    constructor(private service: EquipmentService, private router: Router, private sharedDataService: SharedDataService)
    {
      this.loadEquipments();
    }
  
    importData() { }
    exportData() { }
    addNew() {
      this.router.navigate(['clientequipment/add']);
    }
  
    loadEquipments() {
      this.service.getEquipments().subscribe((data: any[]) => {
        this.equipments = data;
      });
    }
  
    onFirstColumnClicked(rowData: any) {
  
      // alert(`You clicked on ID: ${rowData.id}`);
      const myData = { name: 'equipmentId', id: rowData.id };
      this.sharedDataService.setData(myData);
  
      this.router.navigate(['/clientequipment/edit'], {
        state: { systemData: { id: rowData.id } }
      });
  
    }
  }
  
