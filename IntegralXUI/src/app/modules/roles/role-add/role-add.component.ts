import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl, ValidationErrors } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientUserService } from 'src/app/services/client-User/client-user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../role';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadingService } from 'src/app/common/loadingPanel/loading.service';
import Swal from 'sweetalert2';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-role-add',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './role-add.component.html',
  styleUrl: './role-add.component.scss'
})
export class RoleAddComponent {
  roleForm: FormGroup;
  roleId: number | null = null;
  clientId = 0; // Assume clientId is retrieved from state or route
  accessControlss: any[];
  constructor(
    private fb: FormBuilder,
    private roleService: ClientUserService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private ls:LoadingService
  ) {
    this.clientId = auth.getClientId();
    this.roleForm = this.fb.group({
      id: [null],
      clientId: [this.clientId],
      name: ['', Validators.required,[this.roleNameValidator.bind(this)]],
      details: [''],
      accessControlls: this.fb.array([])
    });

  }
  get accessControls() {
    return this.roleForm.get('accessControlls') as FormArray;
  }
  ngOnInit(): void {
    this.ls.showLoading();
    this.roleService.getRoleWithModules(0).subscribe((data) => {
      data.accessControlls.forEach(module => {
        this.accessControls.push(
          this.fb.group({
            moduleId: [module.moduleId],
            moduleName: [module.moduleName],
            canAdd: [false],
            canEdit: [false],
            canDelete: [false]
          })
        );
      });
    });
    this.ls.hideLoading();
  }

  togglePermission(index: number, permissionType: string) {
    const accessArray = this.roleForm.get('accessControlls') as FormArray;
    const control = accessArray.at(index);
    control.patchValue({ [permissionType]: !control.value[permissionType] });
  }
 roleNameValidator(control: AbstractControl): Observable<ValidationErrors | null> {
    const roleName = control.value;
    if (!roleName) {
      return new Observable<null>();
    }
    return this.roleService.checkRoleExists(0, roleName).pipe(
      map((data: any) => {
        if (data) {
          return { roleNameExists: true };
        }
        return null;
      })
    );
  }

  saveRole() {
    const roleData: Role = this.roleForm.value;
    this.ls.showLoading();
    this.roleService.addRole(roleData).subscribe(
      (response) => {
        this.ls.hideLoading();
        Swal.fire({
          title: 'Success!',
          text: 'Role added successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.backToRoles();
      }
    );
    this.ls.hideLoading();
  }
  selectAll: boolean = false;
  onSelectAllChange(event: any) {
    const checked = event.target.checked;
    this.selectAll = checked;

    // Loop through FormArray and set all canAdd, canEdit, canDelete to true/false
    this.accessControls.controls.forEach(control => {
      control.get('canAdd').setValue(checked);
      control.get('canEdit').setValue(checked);
      control.get('canDelete').setValue(checked);
    });
  }

  // ✅ Handle Individual Checkbox Change
  onCheckboxChange() {
    const allChecked = this.accessControls.controls.every(control =>
      control.get('canAdd').value &&
      control.get('canEdit').value &&
      control.get('canDelete').value
    );

    // Automatically toggle Select All checkbox
    this.selectAll = allChecked;
  }



  backToRoles() {
    this.router.navigate(['clientroles'])
  }
}