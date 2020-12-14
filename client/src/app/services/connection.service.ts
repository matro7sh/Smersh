import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private http: HttpClient, private router: Router) { }

  getjwt(data) {
    return this.http.post(`${environment.HOST}/authentication_token`, data) ;
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
