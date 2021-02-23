import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientsService } from '../../services/clients.service';
import {
  GenericListComponent,
  SHOW,
} from 'src/app/components/generic/list/generic-list.component';
import { ClientRouter } from 'src/app/router/ClientRouter';

@Component({
  selector: 'app-clients-list',
  templateUrl: '../generic/list/generic-list.component.html',
  styleUrls: [],
})
export class ClientsListComponent extends GenericListComponent {
  resource = 'clients';
  singularResource = 'Client';
  routerHelper = ClientRouter;
  protected excludedFields = ['@id', '@type', SHOW.name];

  constructor(protected service: ClientsService, protected router: Router) {
    super(service, router);
  }
}
