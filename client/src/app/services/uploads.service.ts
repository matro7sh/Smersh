import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import { AbstractService } from 'src/app/services/abstract';

@Injectable({
  providedIn: 'root',
})
export class UploadsService {
  private options;

  constructor(private http: HttpClient) {
    this.options = {};
  }

  uploadHosts(data: any): any {
    return axios.post(
      `${AbstractService.getBaseAPIEndpoint()}/upload/host`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  }
}
