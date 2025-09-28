import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/common/loadingPanel/loading.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ImportService } from 'src/app/services/import/import.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './import.component.html',
  styleUrl: './import.component.scss'
})
export class ImportComponent {
  excelForm: FormGroup;
  selectedFile: File | null = null;

  typeOptions = [
    { label: 'Plant', value: 'plant' },
    { label: 'Equipment', value: 'equipment' },
    { label: 'System', value: 'system' },
  ];

  constructor(private fb: FormBuilder, private au: AuthService, private service: ImportService, private ls: LoadingService,) {
    this.excelForm = this.fb.group({
      typeId: [''],
      clientId: [this.au.getClientId()], // set this dynamically as needed
      equipmentSubCategory: [''],
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
  onSubmit3() {
    debugger;
    if (this.excelForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('typeId', this.excelForm.get('typeId')?.value);
      formData.append('clientId', this.excelForm.get('clientId')?.value);
      formData.append('fileExcel', this.selectedFile);

      this.ls.showLoading();

      this.service.addExcel(formData).subscribe({
        next: (response) => {
          this.ls.hideLoading();

          Swal.fire({
            title: 'Success!',
            text: response.Message || 'Upload completed successfully.',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
        },
        error: (error) => {
          this.ls.hideLoading();
          debugger;
          const errorList = error.error?.errors;

          let errorHtml = '';

          if (errorList && Array.isArray(errorList)) {
            errorHtml += '<ul style="text-align:left">';
            errorList.forEach((err: any) => {
              debugger;
              errorHtml += `<li><strong>Row ${err.row}:</strong><ul>`;
              err.errors.forEach((e: string) => {
                errorHtml += `<li>${e}</li>`;
              });
              errorHtml += '</ul></li>';
            });
            errorHtml += '</ul>';
          } else {
            errorHtml = error.error?.Message || 'An unexpected error occurred during upload.';
          }

          Swal.fire({
            title: 'Upload Failed',
            html: `
    <div style="max-height: 400px; overflow-y: auto; text-align: left;">
      ${errorHtml}
    </div>
  `,
            icon: 'error',
            confirmButtonText: 'Ok',
            width: '60em', // or '80em' for larger width
            customClass: {
              popup: 'text-start'
            }
          });
        }
      });
    }
  }


  onSubmit2() {
    debugger;
    if (this.excelForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('typeId', this.excelForm.get('typeId')?.value);
      formData.append('clientId', this.excelForm.get('clientId')?.value);
      formData.append('fileExcel', this.selectedFile);

      this.service.addExcel(formData).subscribe(
        (response) => {
          debugger;
          this.ls.hideLoading();

          Swal.fire({
            title: 'Success!',
            text: response,
            icon: 'success',
            confirmButtonText: 'Ok'
          });

          this.ls.hideLoading();
        }
      );
    }
  }

  formSubmitted = false;
  submitLoading = false;
  downloadLoading = false;

  private sampleFiles = {
    'plant': { name: 'plant_sample.xlsx', url: '/api/samples/plant' },
    'equipment': { name: 'equipment_sample.xlsx', url: '/api/samples/equipment' },
    'system': { name: 'system_sample.xlsx', url: '/api/samples/system' }
  };

  private equipmentSubSamples = {
    'plant': { name: 'plant_equipment_sample.xlsx', url: '/api/samples/plant-equipment' },
    'area': { name: 'area_equipment_sample.xlsx', url: '/api/samples/area-equipment' },
    'unit': { name: 'unit_equipment_sample.xlsx', url: '/api/samples/unit-equipment' }
  };

  // Add these methods to your existing ImportComponent:

  getTypeIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'plant': '🏭',
      'equipment': '⚡',
      'system': '💻'
    };
    return icons[type] || '📄';
  }

  onTypeChange(): void {
    // Clear equipment sub-category when type changes
    if (this.excelForm.get('typeId')?.value !== '6') {
      this.excelForm.get('equipmentSubCategory')?.setValue('1');
    }
  }

  onSubCategoryChange(): void {
    // Handle sub-category change if needed
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
      const fileInput = document.getElementById('fileExcel') as HTMLInputElement;
      if (fileInput) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(files[0]);
        fileInput.files = dataTransfer.files;
      }
    }
  }

  canDownloadSample(): boolean {
    const typeId = this.excelForm.get('typeId')?.value;
    if (!typeId) return false;
    if (typeId === '6') {
      return !!this.excelForm.get('equipmentSubCategory')?.value;
    }
    return true;
  }

  getDownloadButtonText(): string {
    const typeId = this.excelForm.get('typeId')?.value;
    const equipmentSub = this.excelForm.get('equipmentSubCategory')?.value;

    if (!typeId) return 'Download Sample';

    if (typeId === 'equipment') {
      if (equipmentSub) {
        return `Download ${this.equipmentSubSamples[equipmentSub]?.name || 'Equipment Sample'}`;
      } else {
        return 'Select Sub-Category First';
      }
    }

    // For other types (plant, system)
    const sample = this.sampleFiles[typeId];
    return sample ? `Download ${sample.name}` : 'Download Sample';
  }

  downloadSample(): void {
    if (!this.canDownloadSample()) return;

    this.downloadLoading = true;
    const clientId = this.excelForm.get('clientId')?.value;
    const typeId = this.excelForm.get('typeId')?.value;

    const equipmentSub = this.excelForm.get('equipmentSubCategory')?.value;
    let fileName = '';
    switch (typeId) {
      case "1":
        fileName = 'Sample_Plant.xlsx';
        break;
      case "2":
        fileName = 'Sample_Area.xlsx';
        break;
      case "3":
        fileName = 'Sample_Unit.xlsx';
        break;
      case "4":
        fileName = 'Sample_System.xlsx';
        break;
      case "5":
        fileName = 'Sample_Circuit.xlsx';
        break;
      case "6":
        fileName = 'Sample_Equipment_PV.xlsx';
        break;
      default:
        fileName = `client_${clientId}_file.xlsx`; // fallback
    }
    if (typeId === '6' && equipmentSub) {
      if (equipmentSub === '1') { fileName = 'Sample_Equipment_PV.xlsx'; }
      if (equipmentSub === '2') { fileName = 'Sample_Equipment_Pipe.xlsx'; }
      if (equipmentSub === '3') { fileName = 'Sample_Equipment_Tank.xlsx'; }
    }
debugger;
    const link = document.createElement('a');
    link.href = `assets/files/import/${clientId}/${fileName}`;
    link.download = fileName; // The filename for saving
    link.click();

    setTimeout(() => {
      this.downloadLoading = false;
    }, 1000);
  }

  private generateSampleData(typeId: string, equipmentSub?: string): any[][] {
    const baseData: { [key: string]: any[][] } = {
      'plant': [
        ['Plant Name', 'Location', 'Type', 'Capacity', 'Status'],
        ['Plant A', 'Location 1', 'Manufacturing', '1000', 'Active'],
        ['Plant B', 'Location 2', 'Processing', '2000', 'Active']
      ],
      'system': [
        ['System Name', 'Plant ID', 'Type', 'Version', 'Status'],
        ['System A', '1', 'Control', 'v1.0', 'Active'],
        ['System B', '1', 'Monitoring', 'v2.0', 'Active']
      ],
      'equipment': [
        ['Equipment Name', 'Plant ID', 'Model', 'Serial Number', 'Status'],
        ['Equipment A', '1', 'Model X', 'SN001', 'Active'],
        ['Equipment B', '1', 'Model Y', 'SN002', 'Active']
      ]
    };

    if (typeId === 'equipment' && equipmentSub) {
      const subData: { [key: string]: any[][] } = {
        'plant': [
          ['Plant Equipment Name', 'Plant ID', 'Model', 'Serial Number', 'Installation Date'],
          ['Main Boiler', '1', 'B-100', 'SN001', '2024-01-01'],
          ['Backup Generator', '1', 'G-200', 'SN002', '2024-02-01']
        ],
        'area': [
          ['Area Equipment Name', 'Area ID', 'Model', 'Serial Number', 'Installation Date'],
          ['Conveyor Belt', '1', 'C-200', 'SN003', '2024-01-15'],
          ['Sorting Machine', '1', 'S-300', 'SN004', '2024-02-15']
        ],
        'unit': [
          ['Unit Equipment Name', 'Unit ID', 'Model', 'Serial Number', 'Installation Date'],
          ['Processing Unit Pump', '1', 'P-300', 'SN005', '2024-01-20'],
          ['Control Panel', '1', 'CP-400', 'SN006', '2024-02-20']
        ]
      };
      return subData[equipmentSub] || baseData['equipment'];
    }

    return baseData[typeId] || [['Sample Column 1', 'Sample Column 2'], ['Sample Data 1', 'Sample Data 2']];
  }

  private generateExcelFile(data: any[][], filename: string): void {
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sample Data');
    XLSX.writeFile(workbook, filename);
  }

  // Update your existing onSubmit method:
  onSubmit() {
    this.formSubmitted = true;

    if (this.excelForm.valid && this.selectedFile) {
      this.submitLoading = true;
      const formData = new FormData();

      const typeId = this.excelForm.get('typeId')?.value;
      const equipmentSub = this.excelForm.get('equipmentSubCategory')?.value;
      formData.append('typeId', this.excelForm.get('typeId')?.value);
      if (typeId === '6' && equipmentSub) {
        if (equipmentSub === '1') { formData.append('typeId', '66'); }
        if (equipmentSub === '2') { formData.append('typeId', '77'); }
        if (equipmentSub === '3') { formData.append('typeId', '88'); }
      }

      formData.append('clientId', this.excelForm.get('clientId')?.value);

      // Add equipment sub-category if equipment is selected


      formData.append('fileExcel', this.selectedFile);

      this.ls.showLoading();

      this.service.addExcel(formData).subscribe({
        next: (response) => {
          this.submitLoading = false;
          this.ls.hideLoading();

          Swal.fire({
            title: 'Success!',
            text: response.Message || 'Upload completed successfully.',
            icon: 'success',
            confirmButtonText: 'Ok'
          });

          // Reset form after success
          this.resetForm();
        },
        error: (error) => {
          this.submitLoading = false;
          this.ls.hideLoading();

          const errorList = error.error?.errors;
          let errorHtml = '';

          if (errorList && Array.isArray(errorList)) {
            errorHtml += '<ul style="text-align:left">';
            errorList.forEach((err: any) => {
              errorHtml += `<li><strong>Row ${err.row}:</strong><ul>`;
              err.errors.forEach((e: string) => {
                errorHtml += `<li>${e}</li>`;
              });
              errorHtml += '</ul></li>';
            });
            errorHtml += '</ul>';
          } else {
            errorHtml = error.error?.Message || 'An unexpected error occurred during upload.';
          }

          Swal.fire({
            title: 'Upload Failed',
            html: `
            <div style="max-height: 400px; overflow-y: auto; text-align: left;">
              ${errorHtml}
            </div>
          `,
            icon: 'error',
            confirmButtonText: 'Ok',
            width: '60em',
            customClass: {
              popup: 'text-start'
            }
          });
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.excelForm.controls).forEach(key => {
        const control = this.excelForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  private resetForm(): void {
    this.excelForm.reset();
    this.excelForm.patchValue({
      typeId: '',
      clientId: this.au.getClientId(),
      equipmentSubCategory: ''
    });
    this.selectedFile = null;
    this.formSubmitted = false;

    // Reset file input
    const fileInput = document.getElementById('fileExcel') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}
