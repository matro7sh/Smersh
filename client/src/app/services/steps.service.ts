import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from 'src/app/services/abstract';

@Injectable()
export class StepsService extends AbstractService {
  protected endpoint = 'steps';

  constructor(protected http: HttpClient) {
    super(http);
  }
}
