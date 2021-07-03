import { Injectable } from '@angular/core';
import { AbstractService } from 'src/app/services/abstract';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractModelApplication } from 'src/app/model/abstract';
import { Token } from 'src/app/storage/Token';

@Injectable()
export class MediaObjectsService extends AbstractService {
  protected endpoint = 'media_objects';

  constructor(protected http: HttpClient) {
    super(http);
  }

  insert(data: FormData): Promise<AbstractModelApplication> {
    return this.http
      .post(`${this.getUrl()}`, data, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${new Token().get()}`,
        }),
      })
      .toPromise()
      .then((result: any) => this.serializer.serialize(result));
  }
}
