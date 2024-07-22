import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './list/employee.component';
import { EmployeeService } from '../core/employee.service';
// prime ng
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { CalendarModule } from 'primeng/calendar'

import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeeDetailComponent,
    EmployeeFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeeRoutingModule,
    PaginatorModule,
    ButtonModule,
    DropdownModule,
    DividerModule,
    CalendarModule
  ],
  exports: [
    EmployeeComponent,  
    EmployeeDetailComponent,
    EmployeeFormComponent
  ],
  providers: [
    EmployeeService
  ]
})
export class EmployeeModule { }
