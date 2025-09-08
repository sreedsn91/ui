import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { GridComponent } from 'src/app/common/grid/grid/grid.component';
import { CimlService } from 'src/app/services/ciml/ciml.service';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';

@Component({
  selector: 'app-ciml-list',
  imports: [GridComponent],
  templateUrl: './ciml-list.component.html',
  styleUrl: './ciml-list.component.scss'
})
export class CimlListComponent {
CIMLs: any[] = [];
  systemColumns: ColDef[] = [
    { field: 'cML_ID', headerName: 'Name', flex: 1 },
    { field: 'id', headerName: 'id', hide: true },
    { field: 'type', headerName: 'Type' },
    { field: 'plant', headerName: 'Status', flex: 1 },
    { field: 'area', headerName: 'Area', flex: 1 },
    { field: 'unit', headerName: 'Unit', flex: 1 },
    { field: 'system', headerName: 'System', flex: 1 },
    { field: 'component', headerName: 'Component', flex: 1 },
    { field: 'equipment', headerName: 'Equipment', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
  ];
  action: string;
  constructor(private service: CimlService, private router: Router, private sharedDataService: SharedDataService)
  {
    this.loadCiml();
  }

  importData() { }
  exportData() { }
  addNew() {
    this.router.navigate(['clientciml/add']);
  }

  loadCiml() {
    this.service.getCIML().subscribe((data: any[]) => {
      this.CIMLs = data;
    });
  }

  onFirstColumnClicked(rowData: any) {

    // alert(`You clicked on ID: ${rowData.id}`);
    const myData = { name: 'cimlId', id: rowData.id };
    this.sharedDataService.setData(myData);

    this.router.navigate(['/clientciml/edit'], {
      state: { systemData: { id: rowData.id } }
    });

  }
}