import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CREATE, DELETE, EDIT, GenericListComponent, SHOW, } from 'src/app/components/generic';
import { HostRouter } from 'src/app/router/HostRouter';
import { HostsService } from 'src/app/services/hosts.service';

@Component({
  selector: 'app-hosts-list',
  templateUrl: '../generic/list/generic-list.component.html',
  styleUrls: [],
})
export class HostsListComponent extends GenericListComponent {
  public filters = ['name', 'technology'];
  public buttonActions = [SHOW, EDIT, DELETE];
  public actions = [...this.buttonActions];
  resource = 'hosts';
  singularResource = 'Host';
  routerHelper = HostRouter;
  fields = ['id', 'name', 'technology', 'edit', 'delete'];
  protected excludedFields = [CREATE.name];

  constructor(protected service: HostsService, protected router: Router) {
    super(service, router);
  }
}
