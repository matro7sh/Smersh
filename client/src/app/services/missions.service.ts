import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from 'src/app/services/abstract';
import { MissionSerializerApplication } from 'src/app/model/Mission';

@Injectable()
export class MissionsService extends AbstractService {
  protected endpoint = 'missions';
  public serializer = new MissionSerializerApplication();

  constructor(protected http: HttpClient) {
    super(http);
  }
}
