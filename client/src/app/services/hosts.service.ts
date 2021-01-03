import { Injectable } from '@angular/core';
import { AbstractService } from 'src/app/services/abstract';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class HostsService extends AbstractService {
  protected endpoint = 'hosts';

  constructor(protected http: HttpClient) {
    super(http);
  }
}
