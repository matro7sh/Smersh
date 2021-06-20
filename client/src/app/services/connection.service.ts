import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AbstractService } from 'src/app/services/abstract';
import { Token } from 'src/app/storage/Token';
import { environment } from 'src/environments/environment';
import { AbstractModelApplication } from 'src/app/model/abstract';
import {
  AuthenticationModelApplication,
  AuthenticationNormalizerApplication,
  AuthenticationSerializerApplication,
} from 'src/app/model/Authentication';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService extends AbstractService {
  protected endpoint = 'authentication_token';
  normalizer = new AuthenticationNormalizerApplication();
  serializer = new AuthenticationSerializerApplication();

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

  insert(data: any): Promise<AuthenticationModelApplication> {
    return super.insert(data);
  }

  login(data: unknown): Promise<{ token: string }> {
    return this.insert(data).then(({ token }) => ({ token }));
  }

  logout(): void {
    new Token().reset();
    this.router.navigateByUrl('/login');
  }
}
