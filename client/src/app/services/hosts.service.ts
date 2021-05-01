import { Injectable } from '@angular/core';
import { AbstractService } from 'src/app/services/abstract';
import { HttpClient } from '@angular/common/http';
import {
  HostNormalizerApplication,
  HostSerializerApplication,
} from 'src/app/model/Host';

@Injectable()
export class HostsService extends AbstractService {
  protected endpoint = 'hosts';
  public serializer = new HostSerializerApplication();
  public normalizer = new HostNormalizerApplication();

  constructor(protected http: HttpClient) {
    super(http);
  }
}
