import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from 'src/app/services/abstract';

@Injectable()
export class UsersService extends AbstractService {
  protected endpoint = 'users';

  constructor(protected http: HttpClient) {
    super(http);
  }
}
