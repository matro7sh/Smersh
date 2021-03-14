import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AbstractService } from 'src/app/services/abstract';
import { Token } from 'src/app/storage/Token';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService extends AbstractService {
  protected endpoint = 'authentication_token';

  constructor(protected http: HttpClient, private router: Router) {
    super(http);
  }

  getOptions(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
      }),
    };
  }

  getUrl(): string {
    return `${environment.HOST}/${this.endpoint}`;
  }

  login(data: unknown): Observable<unknown> {
    return this.insert(data);
  }

  logout(): void {
    new Token().reset();
    this.router.navigateByUrl('/login');
  }
}
