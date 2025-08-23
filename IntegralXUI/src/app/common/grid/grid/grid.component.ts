import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import type { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import { AllCommunityModule, ModuleRegistry ,GridOptions, GridApi} from 'ag-grid-community'; 
import { ChangeDetectorRef } from '@angular/core';

// Register all Community features
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
  @Output() firstColumnClicked = new EventEmitter<any>(); // ✅ Emit event when first column is clicked

  constructor(private cdr: ChangeDetectorRef) {}

  gridOptions: GridOptions={
    rowHeight:30,
    headerHeight:20
  }; 
  // gridOptions: GridOptions = {
  //   defaultColDef: {
  //     flex: 1, // Auto-size columns
  //     filter: true,
  //     sortable: true,
  //     resizable: true
  //   },
  //   rowGroupPanelShow: 'always',
  //    rowHeight:30,
  //   headerHeight:20
  // };
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
            const span =`<span class="clickable-cell" style="width:200px; background-color: #abfe06 !important" (click)="onClick()">${params.value}</span>`;
           // ✅ Apply class immediately
  
            return span;
          }
        };
      }
      return col;
    });
  }

  onClick() {
  
  }


  getUpdatedColumnDefs2() {
    if (!this.columnDefs || this.columnDefs.length === 0) return [];

    return this.columnDefs.map((col, index) => {
      if (index === 0) {
        return {
          ...col,
          
        // cellRenderer: (params: any) => `<span class="clickable-cell"></span>`, // ✅ Make cell look clickable
          onCellClicked: (event: any) => this.firstColumnClicked.emit(event.data) // ✅ Emit data on click
        , cellClass: 'clickable-cell'
        };
      }
       cellClass: index === 0 ? 'clickable-cell' : ''
      return col;
    });
  }

  private gridApi!: GridApi; 

  // onGridReady(params: any) {
  //   this.gridApi = params.api; 
  //   const updatedColumns = [...this.columnDefs, {
  //     headerName: 'Actions',
  //     width: 100,
     
  //     cellRenderer: (params: any) => {
  //       return `
  //       <button class="btn btn-warning btn-sm btn-edit" data-action="edit">
  //           <i class="feather icons-grid icon-edit" data-action="edit"></i>
  //         </button>
  //         <button class="btn btn-danger btn-sm btn-delete" data-action="delete">
  //           <i class="feather icons-grid icon-trash"  data-action="delete"></i>
  //         </button>
  //       `;
  //     }
  //   }];
  //   this.gridApi.setGridOption('columnDefs', updatedColumns); 
  // }

  // onCellClicked(event: any) {
  //   const actionType = event.event.target.dataset.action;
  //   if (!actionType) return;

  //   const rowData = event.data;

  //   // if (actionType === 'edit') {
  //   //   this.editRow(rowData);
  //   // } else if (actionType === 'delete') {
  //   //   this.deleteRow(rowData);
  //   // }
  // }

  // editRow(rowData: any) {
  //   this.updateValue.emit(`${rowData.id}-edit`); 
  // }

  // deleteRow(rowData: any) {
  //   this.updateValue.emit(`${rowData.id}-delete`); 
  // }
}