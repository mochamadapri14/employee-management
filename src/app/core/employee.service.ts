import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BASE_URL } from "./constant";
import { Employee } from "../models/employee.interface";

@Injectable()
export class EmployeeService {
    constructor(private _http: HttpClient) {}

    public getEmployees(): Observable<Employee[]> {
        return <Observable<Employee[]>> this._http.get(BASE_URL);
    }

    public getEmployee(id: string): Observable<Employee> {
        return <Observable<Employee>> this._http.get(`${BASE_URL}/${id}`);
    }

    public saveEmployee(payload: Employee): Observable<Employee> {
        const { id } = payload;
        if (id !== '') {
            return <Observable<Employee>> this._http.put(`${BASE_URL}/${id}`, payload);
        }
        return <Observable<Employee>> this._http.post(BASE_URL, payload);
    }

    public deleteEmployee(id: string): Observable<Employee> {
        return <Observable<Employee>> this._http.delete(`${BASE_URL}/${id}`);
    }
}