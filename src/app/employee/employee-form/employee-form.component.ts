import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LOV_GROUP } from 'src/app/core/constant';
import { EmployeeService } from 'src/app/core/employee.service';
import { Employee } from 'src/app/models/employee.interface';
import { LovGroup } from 'src/app/models/lov.interface';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  protected formGroup!: FormGroup;
  protected maxDate = new Date();
  protected lovGroup: LovGroup[] = LOV_GROUP;

  protected isEdit: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {
    this.formGroup = this.formBuilder.group({
      id: [''],
      username: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: [new Date(), Validators.required],
      basicSalary: [0, [Validators.required, Validators.min(1)]],
      status: ['', [Validators.required]],
      groupObj: [null, Validators.required],
      description: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.onCheckLoader();
  }

  private onCheckLoader(): void {
    const _id: string = this.route.snapshot.paramMap.get('id') || '';
    this.isEdit = _id !== '';

    if (this.isEdit) {
      this.employeeService.getEmployee(_id).subscribe((res: Employee) => {
        if (res) {
         res.birthDate = new Date(res.birthDate);
         const selectedLov = this.lovGroup.find((p) => p.code === res.group);
         this.formGroup.patchValue({
          ...res, 
          groupObj: selectedLov
         });
        }
      });
    }
  }

  onSave(): void {
    const value = this.formGroup.value;
    const payload = {
      ...value,
      group: value.groupObj.code,
      createDate: new Date()
    }
    this.employeeService.saveEmployee(payload).subscribe((res: Employee) => {
      if (res) {
        this.onNavigateToList();
      } 
    })
  }

  onCancel(): void {
    this.onNavigateToList();
  }

  private onNavigateToList(): void {
    this.router.navigate(['employee']);
  }
}
