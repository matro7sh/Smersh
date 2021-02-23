import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  GenericListComponent,
  SHOW,
} from 'src/app/components/generic/list/generic-list.component';
import { ImpactsService } from 'src/app/services/impacts.service';
import { ImpactRouter } from 'src/app/router/ImpactRouter';

@Component({
  selector: 'app-impacts-list',
  templateUrl: '../generic/list/generic-list.component.html',
  styleUrls: [],
})
export class ImpactsListComponent extends GenericListComponent {
  resource = 'impacts';
  singularResource = 'Impact';
  routerHelper = ImpactRouter;
  protected excludedFields = ['@id', '@type', SHOW.name];

  constructor(protected service: ImpactsService, protected router: Router) {
    super(service, router);
  }
}
