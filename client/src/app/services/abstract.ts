import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Token } from 'src/app/storage/Token';

export class AbstractService {
  protected endpoint = '';
  protected headers: HttpHeaders;
  protected http;

  public constructor(http: HttpClient) {
    this.http = http;
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${new Token().get()}`,
      'Content-Type': 'application/json; charset=utf-8',
    });
  }

  getUrl(params: Record<string, string> = {}): string {
    return `${environment.API}/${this.endpoint}?${new URLSearchParams(params)}`;
  }

  getOptions(): { headers: HttpHeaders } {
    return {
      headers: this.headers,
    };
  }

  getData(): Observable<any> {
    return this.http.get(`${this.getUrl()}`, this.getOptions());
  }

  getDataById(id: string): Observable<any> {
    return this.http.get(`${this.getUrl()}/${id}`, this.getOptions());
  }

  insert(data: any): Observable<any> {
    return this.http.post(`${this.getUrl()}`, data, this.getOptions());
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.getUrl()}/${id}`, this.getOptions());
  }

  update(id: string, data: any): Observable<any> {
    this.updateHeaders({
      'Content-Type': 'application/merge-patch+json; charset=utf-8',
    });
    return this.http.patch(`${this.getUrl()}/${id}`, data, this.getOptions());
  }

  updateHeaders(headers: Record<string, string>): void {
    Object.entries(headers).forEach(([k, v]) => {
      this.headers = this.headers.set(k.toLowerCase(), v);
    });
  }
}
