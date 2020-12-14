import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VulnsService {

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(`${environment.API}/vulns`,  {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
  }

  getDataById(id: string): Observable<any>  {
    return this.http.get(`${environment.API}/vulns/${id}`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
  }

  insert(data :any) : Observable<any> {
    return this.http.post(`${environment.API}/vulns`, data,  {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});

  }
  delete(id : string) : Observable<any> {
    return this.http.delete(`${environment.API}/vulns/${id}`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
  }

  update(id:string, data:any) : Observable<any>{
    return this.http.put(`${environment.API}/vulns/${id}`, data, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
  }
}
