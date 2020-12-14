import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";


@Injectable()
export class UsersService {

  constructor(private http: HttpClient) { }


  getData(): Observable<any>  {
    return this.http.get(`${environment.API}/users`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
  }

  getDataById(id: string): Observable<any>  {
    return this.http.get(`${environment.API}/users/${id}`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
  }

  insert(data :any) : Observable<any> {
    return this.http.post(`${environment.API}/users`, data, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});

  }
  delete(id : string) : Observable<any> {
    return this.http.delete(`${environment.API}/users/${id}`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
  }

  update(id:string, data:any) : Observable<any>{
    return this.http.put(`${environment.API}/users/${id}`, data, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
  }


}
