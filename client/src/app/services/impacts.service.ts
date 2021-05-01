import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from 'src/app/services/abstract';
import {
  ImpactNormalizerApplication,
  ImpactSerializerApplication,
} from 'src/app/model/Impact';

@Injectable({
  providedIn: 'root',
})
export class ImpactsService extends AbstractService {
  protected endpoint = 'impacts';
  public serializer = new ImpactSerializerApplication();
  public normalizer = new ImpactNormalizerApplication();

  constructor(protected http: HttpClient) {
    super(http);
  }
}
