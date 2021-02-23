import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VulnsService } from 'src/app/services/vulns.service';
import {
  GenericListComponent,
  SHOW,
} from 'src/app/components/generic/list/generic-list.component';
import { VulnRouter } from 'src/app/router/VulnRouter';

@Component({
  selector: 'app-vulns-list',
  templateUrl: '../generic/list/generic-list.component.html',
  styleUrls: [],
})
export class VulnsListComponent extends GenericListComponent {
  resource = 'vulns';
  singularResource = 'Vulnerability';
  routerHelper = VulnRouter;
  protected excludedFields = ['@id', '@type', SHOW.name, 'vulnType', 'impact'];

  constructor(protected service: VulnsService, protected router: Router) {
    super(service, router);
  }
}
