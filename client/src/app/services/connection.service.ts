import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { AbstractService } from 'src/app/services/abstract';
import { Token } from 'src/app/storage/Token';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService extends AbstractService {
  protected endpoint = 'authentication_token';

  constructor(protected http: HttpClient, private router: Router) {
    super(http);
  }

  getUrl(): string {
    return `${environment.HOST}/${this.endpoint}`;
  }

  logout() {
    new Token().reset();
    this.router.navigateByUrl('/login');
  }
}
