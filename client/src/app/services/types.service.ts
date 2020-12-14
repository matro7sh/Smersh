import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";


@Injectable()
export class TypesService {

  constructor(private http: HttpClient) { }


  getData(): Observable<any>  {
    return this.http.get(`${environment.API}/mission_types`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
  }

  getDataById(id: string): Observable<any>  {
    return this.http.get(`${environment.API}/mission_types/${id}`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
  }

  insert(data :any) : Observable<any> {
    return this.http.post(`${environment.API}/mission_types`, data, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});

  }
  delete(id : string) : Observable<any> {
    return this.http.delete(`${environment.API}/mission_types/${id}`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
  }

  update(id:string, data:any) : Observable<any>{
    return this.http.put(`${environment.API}/mission_types/${id}`, data, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
  }


}
