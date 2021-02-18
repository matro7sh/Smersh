import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from 'src/app/services/abstract';
import { Observable } from 'rxjs';
import { Locale } from 'src/app/storage/Locale';

@Injectable({
  providedIn: 'root',
})
export class VulnsService extends AbstractService {
  protected endpoint = 'vulns';

  constructor(protected http: HttpClient) {
    super(http);
  }

  getData(params: Record<string, string> = {}): Observable<any> {
    return super.getData({ locale: new Locale().get(), ...params });
  }
}
