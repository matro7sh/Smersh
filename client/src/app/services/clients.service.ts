import { Injectable } from '@angular/core';
import { AbstractService } from 'src/app/services/abstract';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ClientsService extends AbstractService {
  protected endpoint = 'clients';

  constructor(protected http: HttpClient) {
    super(http);
  }
}
