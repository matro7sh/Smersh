import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Token } from 'src/app/storage/Token';

export class AbstractService {
    protected endpoint = '';
    protected options;
    protected http;

    public constructor(http: HttpClient) {
        this.http = http;
        this.options = {};
        this.options.headers = new HttpHeaders({
            Authorization: `Bearer ${new Token().get()}`,
            'Content-Type': 'application/json; charset=utf-8',
        });
    }

    getUrl(): string {
        return `${environment.API}/${this.endpoint}`;
    }

    getData(): Observable<any> {
        return this.http.get(`${this.getUrl()}`, this.options);
    }

    getDataById(id: string): Observable<any>  {
        return this.http.get(`${this.getUrl()}/${id}`, this.options);
    }

    insert(data: any): Observable<any> {
        return this.http.post(
            `${this.getUrl()}`,
            data,
            this.options
        );
    }

    delete(id: string): Observable<any> {
        return this.http.delete(`${this.endpoint}/${id}`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
    }

    update(id: string, data: any): Observable<any>{
        this.updateHeaders(new HttpHeaders({'Content-type': 'application/merge-patch+json'}));
        return this.http.patch(`${this.getUrl()}/${id}`, data, this.options);
    }

    updateHeaders(headers: HttpHeaders): void {
        this.options.headers = {
            ...this.options.headers,
            ...headers,
        };
    }
}
