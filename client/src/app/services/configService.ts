import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class configService {

    constructor(private http: HttpClient) { }

    public getBurpConfiguration(): Observable<any> {
        return this.http.get('src/assets/burp.json');
    }
}
