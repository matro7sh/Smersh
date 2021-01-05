import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Locale} from "../storage/Locale";

@Injectable({
  providedIn: 'root'
})
export class VulnsTranslationService {

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(`${environment.API}/vuln_translations?locale=${new Locale().get()}`,  {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
  }

  getDataById(id: string): Observable<any>  {
    return this.http.get(`${environment.API}/vuln_translations/${id}`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
  }

  insert(data :any) : Observable<any> {
    return this.http.post(`${environment.API}/vuln_translations`, data,  {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});

  }
  delete(id : string) : Observable<any> {
    return this.http.delete(`${environment.API}/vuln_translations/${id}`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
  }

  update(id:string, data:any) : Observable<any>{
    return this.http.put(`${environment.API}/vuln_translations/${id}`, data, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
  }
}
