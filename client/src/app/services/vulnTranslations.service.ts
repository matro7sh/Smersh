import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Locale } from '../storage/Locale';
import { AbstractService } from 'src/app/services/abstract';
import { VulnSerializerApplication } from 'src/app/model/Vuln';
import { AbstractModelApplication } from 'src/app/model/abstract';

@Injectable({
  providedIn: 'root',
})
export class VulnTranslationsService extends AbstractService {
  protected endpoint = 'vuln_translations';
  public serializer = new VulnSerializerApplication();

  constructor(protected http: HttpClient) {
    super(http);
  }

  getData(
    params: Record<string, string> = {}
  ): Promise<{ count: number; data: AbstractModelApplication[] }> {
    return super.getData({ locale: new Locale().get(), ...params });
  }
}
