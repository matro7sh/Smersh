import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from 'src/app/services/abstract';

@Injectable({
    providedIn: 'root',
})
export class PositivePointsService extends AbstractService {
    protected endpoint = 'positive_points';

    constructor(protected http: HttpClient) {
        super(http);
    }
}
