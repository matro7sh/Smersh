import { Injectable } from '@angular/core';
import { AbstractService } from 'src/app/services/abstract';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from 'src/app/storage/Token';

@Injectable()
export class MediaObjectsService extends AbstractService {
  protected endpoint = 'media_objects';

  constructor(protected http: HttpClient) {
    super(http);
  }

  insert(data: unknown): Observable<any> {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${new Token().get()}`,
    });

    return this.http.post(`${this.getUrl()}`, data, this.getOptions());
  }
}
