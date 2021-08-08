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
import { AuthGuard, RoleGuard } from 'src/app/guard';

export class MissionResource extends AbstractResource {
  protected basePath = 'missions';
  protected type = 'MISSION';
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
          canActivate: [AuthGuard, RoleGuard],
          component: MissionsListComponent,
          data: { role: `ROLE_${this.type}_GET_LIST` },
          path: 'all',
        },
        {
          canActivate: [AuthGuard, RoleGuard],
          component: AddVulnsToHostExternalComponent,
          data: { role: `ROLE_${this.type}_PATCH` },
          path: ADD_VULN_ROUTE,
        },
        ...resource.children,
      ],
    };
  }
}
