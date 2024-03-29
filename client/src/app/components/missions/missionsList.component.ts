import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GenericListComponent } from 'src/app/components/generic';
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
  protected excludedFields = [
    '@id',
    '@type',
    'nessus',
    'nmap',
    'nessusFiler',
    'nmapFiler',
    'missionType',
    'startDate',
    'EndDate',
  ];

  constructor(protected service: MissionsService, protected router: Router) {
    super(service, router);
  }
}
