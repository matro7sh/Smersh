import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from 'src/app/services/abstract';
import {
  StepNormalizerApplication,
  StepSerializerApplication,
} from 'src/app/model/Step';

@Injectable()
export class StepsService extends AbstractService {
  protected endpoint = 'steps';
  public serializer = new StepSerializerApplication();
  public normalizer = new StepNormalizerApplication();

  constructor(protected http: HttpClient) {
    super(http);
  }
}
