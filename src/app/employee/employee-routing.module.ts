import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './list/employee.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { AuthGuard } from '../core/auth.guard';

const routes: Routes = [
  { path: '', component: EmployeeComponent, canActivate: [AuthGuard] },
  { path: 'form', component: EmployeeFormComponent, canActivate: [AuthGuard] },
  { path: 'form/:id', component: EmployeeFormComponent, canActivate: [AuthGuard] },
  { path: 'detail/:id', component: EmployeeDetailComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
