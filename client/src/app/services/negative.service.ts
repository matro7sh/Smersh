import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from 'src/app/services/abstract';

@Injectable({
  providedIn: 'root',
})
export class NegativePointsService extends AbstractService {
  protected endpoint = 'negative_points';

  constructor(protected http: HttpClient) {
    super(http);
  }
}
