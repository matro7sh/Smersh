import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Token } from 'src/app/storage/Token';
import {
  AbstractModelApplication,
  AbstractSerializerApplication,
} from 'src/app/model/abstract';

export class AbstractService {
  protected endpoint = '';

  protected headers: HttpHeaders;
  protected http: HttpClient;
  public serializer = new AbstractSerializerApplication();

  public constructor(http: HttpClient) {
    this.http = http;
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${new Token().get()}`,
      'Content-Type': 'application/json; charset=utf-8',
    });
  }

  getUrl(): string {
    return `${environment.API}/${this.endpoint}`;
  }

  getOptions(): { headers: HttpHeaders } {
    return {
      headers: this.headers,
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

  getDataById(id: string): Observable<any> {
    return this.http.get(`${this.getUrl()}/${id}`, this.getOptions());
  }

  insert(data: unknown): Observable<any> {
    return this.http.post(`${this.getUrl()}`, data, this.getOptions());
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.getUrl()}/${id}`, this.getOptions());
  }

  update(id: string, data: unknown): Observable<any> {
    return this.http.patch(`${this.getUrl()}/${id}`, data, {
      ...this.getOptions(),
      headers: this.getOptions().headers.set(
        'Content-Type',
        'application/merge-patch+json; charset=utf-8'
      ),
    });
  }
}
