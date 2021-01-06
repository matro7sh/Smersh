import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from 'src/app/services/abstract';

@Injectable({
  providedIn: 'root',
})
export class VulnsService extends AbstractService {
  protected endpoint = 'vulns';

  constructor(protected http: HttpClient) {
    super(http);
  }
}
