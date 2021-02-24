import { Injectable } from '@angular/core';
import { AbstractService } from 'src/app/services/abstract';
import { HttpClient } from '@angular/common/http';
import { ClientSerializerApplication } from 'src/app/model/Client';

@Injectable()
export class ClientsService extends AbstractService {
  protected endpoint = 'clients';
  public serializer = new ClientSerializerApplication();

  constructor(protected http: HttpClient) {
    super(http);
  }
}
