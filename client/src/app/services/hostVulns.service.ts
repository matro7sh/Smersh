import { Injectable } from '@angular/core';
import { AbstractService } from 'src/app/services/abstract';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HostVulnsService extends AbstractService {
  protected endpoint = 'host_vulns';

  constructor(protected http: HttpClient) {
    super(http);
  }
}
