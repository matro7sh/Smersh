import { Injectable } from '@angular/core';
import { AbstractService } from 'src/app/services/abstract';
import { HttpClient } from '@angular/common/http';
import { HostNormalizerApplication, HostSerializerApplication, } from 'src/app/model/Host';

@Injectable()
export class HostsService extends AbstractService {
  public serializer = new HostSerializerApplication();
  public normalizer = new HostNormalizerApplication();
  protected endpoint = 'hosts';

  constructor(protected http: HttpClient) {
    super(http);
  }
}
