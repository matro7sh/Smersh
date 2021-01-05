import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from 'src/app/services/abstract';

@Injectable()
export class TypesService extends AbstractService {
    protected endpoint = 'mission_types';

    constructor(protected http: HttpClient) {
        super(http);
    }
}
