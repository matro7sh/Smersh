import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from 'src/app/services/abstract';

@Injectable()
export class MissionsService extends AbstractService {
  protected endpoint = 'missions';

  constructor(protected http: HttpClient) {
    super(http);
  }
}
