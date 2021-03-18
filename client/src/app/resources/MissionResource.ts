import { Route } from '@angular/router';
import { MissionMyComponent } from 'src/app/components/mission-my/mission-my.component';
import { MissionSingleComponent } from 'src/app/components/mission-single/mission-single.component';
import { MissionEditComponent } from 'src/app/components/mission-edit/mission-edit.component';
import { AbstractResource } from 'src/app/resources/AbstractResource';
import { MissionsListComponent } from 'src/app/components/missions/missionsList.component';
import { MissionCreateComponent } from 'src/app/components/mission-create/mission-create.component';
import { AddVulnsToHostExternalComponent } from 'src/app/components/add-vulns-to-host-external/add-vulns-to-host-external.component';
import { ADD_VULN_ROUTE } from 'src/app/router/MissionRouter';

export class MissionResource extends AbstractResource {
  protected basePath = 'missions';
  protected list = MissionMyComponent;
  protected show = MissionSingleComponent;
  protected edit = MissionEditComponent;
  protected create = MissionCreateComponent;

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
