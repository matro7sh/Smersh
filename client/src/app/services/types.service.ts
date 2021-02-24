import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from 'src/app/services/abstract';
import { AbstractTypeSerializerApplication } from 'src/app/model/AbstractType';

@Injectable()
export class TypesService extends AbstractService {
  protected endpoint = 'mission_types';
  serializer = new AbstractTypeSerializerApplication();

  constructor(protected http: HttpClient) {
    super(http);
  }
}
