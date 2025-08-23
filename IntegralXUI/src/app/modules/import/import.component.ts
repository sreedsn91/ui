import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/common/loadingPanel/loading.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ImportService } from 'src/app/services/import/import.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import',
 imports: [ReactiveFormsModule],
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

  constructor(private fb: FormBuilder, private au: AuthService,private service:ImportService, private ls: LoadingService,) {
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
onSubmit() {
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

}
