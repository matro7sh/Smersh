import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GenericListComponent } from 'src/app/components/generic/list/generic-list.component';
import { MissionsService } from 'src/app/services/missions.service';
import { MissionRouter } from 'src/app/router/MissionRouter';

@Component({
  selector: 'app-missions-list',
  templateUrl: '../generic/list/generic-list.component.html',
  styleUrls: [],
})
export class MissionsListComponent extends GenericListComponent {
  resource = 'missions';
  singularResource = 'Mission';
  routerHelper = MissionRouter;

  constructor(protected service: MissionsService, protected router: Router) {
    super(service, router);
  }
}
