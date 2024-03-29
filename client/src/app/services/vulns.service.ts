import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from 'src/app/services/abstract';
import { Locale } from 'src/app/storage/Locale';
import {
  VulnNormalizerApplication,
  VulnSerializerApplication,
} from 'src/app/model/Vuln';
import { AbstractModelApplication } from 'src/app/model/abstract';

@Injectable({
  providedIn: 'root',
})
export class VulnsService extends AbstractService {
  public serializer = new VulnSerializerApplication();
  public normalizer = new VulnNormalizerApplication();
  protected endpoint = 'vulns';

  constructor(protected http: HttpClient) {
    super(http);
  }

  insert(data: any): Promise<AbstractModelApplication> {
    const locale = new Locale().get();
    return super.insert({
      translations: {
        [locale]: {
          ...data,
          locale,
        },
      },
      ...data,
    });
  }

  getData(
    params: Record<string, string> = {}
  ): Promise<{ count: number; data: AbstractModelApplication[] }> {
    return super.getData({ locale: new Locale().get(), ...params });
  }
}
