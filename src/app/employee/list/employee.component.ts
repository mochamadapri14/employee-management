import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, debounceTime } from 'rxjs';
import { EmployeeService } from '../../core/employee.service';
import { Employee } from '../../models/employee.interface';
import { LovGroup } from '../../models/lov.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  
  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  protected columnHeaders: string[] = [];
  protected employeeList: Employee[] = [];
  protected employeeFiltered: Employee[] = [];
  protected lovGroup: LovGroup[] = [];

  protected selectedGroup!: LovGroup;
  protected first: number = 0;
  protected rows: number = 10;

  ngOnInit(): void {
   this.onLoadData();
  }

  protected onLoadData(): void {
    this.employeeService.getEmployees().subscribe((res: Employee[]) => {
      this.employeeList = res;
      if (this.employeeList.length > 0) {
        this.columnHeaders = this.onSettingHeaders(this.employeeList[0]);
        this.lovGroup = this.employeeList.map((employee: Employee) => {
          return { name: employee.group.toUpperCase(), code: employee.group } as LovGroup
        });
        this.onFetchData();
      }
    });
  }

  protected onPageChange(event: any) {
      this.first = event.first;
      this.rows = event.rows;
      this.onFetchData();
  }

  protected search = new BehaviorSubject<string>('');
  protected search$ = this.search.asObservable();
  protected searchValue = '';
  protected onSearch(val: any) {
    this.search.next(val.target.value);
    this.search$.pipe(
     debounceTime(500)
    ).subscribe(v => {
      this.searchValue = v;
      this.onFetchData();
    })
  }

  protected onAction(action: 'view' | 'add' | 'edit' | 'delete', id: string): void {
    switch(action) {
      case 'add' :
        this.router.navigate(['employee/form']);
        break;
      case 'view': 
        this.router.navigate(['employee/detail/' + id]);
        break;
      case 'edit':
        this.router.navigate(['employee/form/' + id]);
        break;
      case 'delete':
        this.employeeService.deleteEmployee(id).subscribe((res: Employee) => {
          if (res) {
            this.onLoadData();
          }
        });
        break;
      default:
        alert('No Action');
        break;
    }
  }

  protected onChangeGroup(event: any) {
    this.selectedGroup = event.value;
    this.onFetchData();
  }

  private onFetchData(): void {
    let filtered = this.employeeList;
    const group = this.selectedGroup?.code || '';
    if (this.searchValue !== '' && group !== '') {
      this.first = 0;
      filtered = this.employeeList
      .filter((employee: Employee) =>
        employee.group === group && 
        employee.username.toLowerCase().includes(this.searchValue.toLowerCase()));
    }
  
    this.employeeFiltered = filtered.slice(this.first, this.limit);
  }

  private splitCamelCase(input: string): string[] {
    return input.split(/(?=[A-Z])/).map(part => part.trim());
  }

  private onSettingHeaders(column: Employee): string[] {
    const keys: string[] = Object.keys(column).filter((val: string) => val.toLowerCase() !== 'id' &&
     val !== 'createDate');
    return keys.map((key: string) => this.splitCamelCase(key).join(' ').toUpperCase());
  }

  get limit(): number {
    return this.first + this.rows;
  }
}
