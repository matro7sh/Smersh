import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Token } from 'src/app/storage/Token';
import {
  AbstractModelApplication,
  AbstractNormalizerApplication,
  AbstractSerializerApplication,
} from 'src/app/model/abstract';

export class AbstractService {
  public serializer = new AbstractSerializerApplication();
  public normalizer = new AbstractNormalizerApplication();
  protected endpoint = '';
  protected headers: HttpHeaders;
  protected http: HttpClient;

  public constructor(http: HttpClient) {
    this.http = http;
  }

  getUrl(): string {
    return `${environment.API}/${this.endpoint}`;
  }

  getOptions(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${new Token().get()}`,
        'Content-Type': 'application/json; charset=utf-8',
      }),
    };
  }

  getData(
    params: Record<string, string> = {}
  ): Promise<{ count: number; data: AbstractModelApplication[] }> {
    return this.http
      .get(`${this.getUrl()}?${new URLSearchParams(params)}`, this.getOptions())
      .toPromise()
      .then((result) => ({
        count: result['hydra:totalItems'],
        data: this.serializer.serializeMany(result['hydra:member'] ?? []),
      }));
  }

  getDataById(id: string): Promise<AbstractModelApplication> {
    return this.http
      .get(`${this.getUrl()}/${id}`, this.getOptions())
      .toPromise()
      .then((result: any) => this.serializer.serialize(result));
  }

  insert(data: any): Promise<AbstractModelApplication> {
    return this.http
      .post(
        `${this.getUrl()}`,
        this.normalizer.normalize(data),
        this.getOptions()
      )
      .toPromise()
      .then((result: any) => this.serializer.serialize(result));
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.getUrl()}/${id}`, this.getOptions());
  }

  update(id: string, data: any): Promise<AbstractModelApplication> {
    return this.http
      .patch(`${this.getUrl()}/${id}`, this.normalizer.normalize(data), {
        ...this.getOptions(),
        headers: this.getOptions().headers.set(
          'Content-Type',
          'application/merge-patch+json; charset=utf-8'
        ),
      })
      .toPromise()
      .then((result: any) => this.serializer.serialize(result));
  }
}
