import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/core/employee.service';
import { Employee } from 'src/app/models/employee.interface';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  employeeCollection!: Employee;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.onFetchEmployee();
  }

  protected onFetchEmployee(): void {
    const _id: string = this.route.snapshot.paramMap.get('id') || '';
    this.employeeService.getEmployee(_id).subscribe((res: Employee) => {
      this.employeeCollection = res;
    })
  }

  protected onBack(): void {
    this.router.navigate(['employee'])
  }
}
