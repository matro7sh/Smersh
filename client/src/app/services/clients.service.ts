import { Injectable } from '@angular/core';
import { AbstractService } from 'src/app/services/abstract';
import { HttpClient } from '@angular/common/http';
import { ClientNormalizerApplication, ClientSerializerApplication, } from 'src/app/model/Client';

@Injectable()
export class ClientsService extends AbstractService {
  public serializer = new ClientSerializerApplication();
  public normalizer = new ClientNormalizerApplication();
  protected endpoint = 'clients';

  constructor(protected http: HttpClient) {
    super(http);
  }
}
