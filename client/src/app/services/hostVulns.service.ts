import { Injectable } from '@angular/core';
import { AbstractService } from 'src/app/services/abstract';
import { HttpClient } from '@angular/common/http';
import {
  HostVulnNormalizerApplication,
  HostVulnSerializerApplication,
} from 'src/app/model/HostVuln';

@Injectable()
export class HostVulnsService extends AbstractService {
  protected endpoint = 'host_vulns';
  public serializer = new HostVulnSerializerApplication();
  public normalizer = new HostVulnNormalizerApplication();

  constructor(protected http: HttpClient) {
    super(http);
  }
}
