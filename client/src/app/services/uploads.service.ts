import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import axios from "axios";

@Injectable({
    providedIn: 'root'
})
export class UploadsService {
    private options;

    constructor(private http: HttpClient) {
        this.options = {};
    }

    uploadHosts(data: any): any {

        return axios.post(`${environment.API}/upload/host`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
    }
}
