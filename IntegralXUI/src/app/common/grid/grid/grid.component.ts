import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry, GridOptions, GridApi } from 'ag-grid-community';
import { ChangeDetectorRef } from '@angular/core';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-grid',
  imports: [AgGridAngular],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})
export class GridComponent {
  @Input() rowData: any[] = [];
  @Input() columnDefs: ColDef[] = [];
  @Output() firstColumnClicked = new EventEmitter<any>();

  constructor(private cdr: ChangeDetectorRef) {}

  gridOptions: GridOptions = {
    rowHeight: 30,
    headerHeight: 40
  };

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true
  };

  getUpdatedColumnDefs() {
    if (!this.columnDefs || this.columnDefs.length === 0) return [];

    return this.columnDefs.map((col, index) => {
      if (index === 0) {
        return {
          ...col,
          cellRenderer: (params: any) => {
            return `<span class="clickable-cell" style="width:200px; background-color: #abfe06 !important">${params.value}</span>`;
          }
        };
      }
      return col;
    });
  }

  onClick() {}

  getUpdatedColumnDefs2() {
    if (!this.columnDefs || this.columnDefs.length === 0) return [];

    return this.columnDefs.map((col, index) => {
      if (index === 0) {
        return {
          ...col,
          onCellClicked: (event: any) => this.firstColumnClicked.emit(event.data),
          cellClass: 'clickable-cell'
        };
      }
      return col;
    });
  }

  private gridApi!: GridApi;
}
