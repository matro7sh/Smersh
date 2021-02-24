import { Injectable } from '@angular/core';
import { AbstractService } from 'src/app/services/abstract';
import { UserSerializerApplication } from 'src/app/model/User';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsersService extends AbstractService {
  protected endpoint = 'users';
  public serializer = new UserSerializerApplication();

  constructor(protected http: HttpClient) {
    super(http);
  }
}
