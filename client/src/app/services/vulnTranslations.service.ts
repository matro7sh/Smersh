import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Locale } from '../storage/Locale';
import { AbstractService } from 'src/app/services/abstract';
import { AbstractModelApplication } from 'src/app/model/abstract';
import {
  VulnTranslationNormalizerApplication,
  VulnTranslationSerializerApplication,
} from 'src/app/model/VulnTranslation';

@Injectable({
  providedIn: 'root',
})
export class VulnTranslationsService extends AbstractService {
  public serializer = new VulnTranslationSerializerApplication();
  public normalizer = new VulnTranslationNormalizerApplication();
  protected endpoint = 'vuln_translations';

  constructor(protected http: HttpClient) {
    super(http);
  }

  getData(
    params: Record<string, string> = {}
  ): Promise<{ count: number; data: AbstractModelApplication[] }> {
    return super.getData({locale: new Locale().get(), ...params});
  }
}
