import { Route } from '@angular/router';
import { MissionMyComponent } from 'src/app/components/mission-my/mission-my.component';
import { MissionSingleComponent } from 'src/app/components/mission-single/mission-single.component';
import { AbstractResource } from 'src/app/resources/AbstractResource';
import {
  MissionsCreateComponent,
  MissionsEditComponent,
  MissionsListComponent,
} from 'src/app/components/missions';
import { AddVulnsToHostExternalComponent } from 'src/app/components/add-vulns-to-host-external/add-vulns-to-host-external.component';
import { ADD_VULN_ROUTE } from 'src/app/router/MissionRouter';

export class MissionResource extends AbstractResource {
  protected basePath = 'missions';
  protected list = MissionMyComponent;
  protected show = MissionSingleComponent;
  protected edit = MissionsEditComponent;
  protected create = MissionsCreateComponent;

  generateResource(): Route {
    const resource = super.generateResource();
    return {
      ...resource,
      children: [
        {
          path: 'all',
          component: MissionsListComponent,
        },
        {
          path: ADD_VULN_ROUTE,
          component: AddVulnsToHostExternalComponent,
        },
        ...resource.children,
      ],
    };
  }
}
