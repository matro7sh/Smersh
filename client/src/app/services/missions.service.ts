import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from 'src/app/services/abstract';
import {
  MissionNormalizerApplication,
  MissionSerializerApplication,
} from 'src/app/model/Mission';

@Injectable()
export class MissionsService extends AbstractService {
  public serializer = new MissionSerializerApplication();
  public normalizer = new MissionNormalizerApplication();
  protected endpoint = 'missions';

  constructor(protected http: HttpClient) {
    super(http);
  }
}
