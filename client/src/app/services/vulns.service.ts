import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from 'src/app/services/abstract';
import { Locale } from 'src/app/storage/Locale';
import { VulnSerializerApplication } from 'src/app/model/Vuln';
import { AbstractModelApplication } from 'src/app/model/abstract';

@Injectable({
  providedIn: 'root',
})
export class VulnsService extends AbstractService {
  protected endpoint = 'vulns';
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
