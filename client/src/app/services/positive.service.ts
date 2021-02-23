import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from 'src/app/services/abstract';
import { PointSerializerApplication } from 'src/app/model/Point';

@Injectable({
  providedIn: 'root',
})
export class PositivePointsService extends AbstractService {
  protected endpoint = 'positive_points';
  public serializer = new PointSerializerApplication();

  constructor(protected http: HttpClient) {
    super(http);
  }
}
