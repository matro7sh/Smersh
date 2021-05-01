import { Injectable } from '@angular/core';
import { AbstractService } from 'src/app/services/abstract';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MediaObjectsService extends AbstractService {
  protected endpoint = 'media_objects';

  constructor(protected http: HttpClient) {
    super(http);
  }
}
