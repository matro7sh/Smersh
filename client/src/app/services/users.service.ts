import { Injectable } from '@angular/core';
import { AbstractService } from 'src/app/services/abstract';
import { UserSerializerApplication } from 'src/app/model/User';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsersService extends AbstractService {
  public serializer = new UserSerializerApplication();
  protected endpoint = 'users';

  constructor(protected http: HttpClient) {
    super(http);
  }
}
