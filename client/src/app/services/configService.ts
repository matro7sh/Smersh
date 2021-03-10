import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Locale} from "../storage/Locale";

@Injectable({
    providedIn: 'root'
})
export class configService {

    constructor(private http: HttpClient) { }

    public getJSON(): Observable<any> {
        return this.http.get('../../assets/burp.json');
    }
}



