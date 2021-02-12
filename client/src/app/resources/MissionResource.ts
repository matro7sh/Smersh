import { Route } from '@angular/router';
import { MissionMyComponent } from 'src/app/components/mission-my/mission-my.component';
import { MissionSingleComponent } from 'src/app/components/mission-single/mission-single.component';
import { MissionEditComponent } from 'src/app/components/mission-edit/mission-edit.component';
import { AbstractResource } from 'src/app/resources/AbstractResource';
import { MissionChoiceComponent } from 'src/app/components/missions/mission-choice.component';
import { MissionCreateComponent } from 'src/app/components/mission-create/mission-create.component';
import { AddVulnsToHostExternalComponent } from 'src/app/components/add-vulns-to-host-external/add-vulns-to-host-external.component';

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
          component: MissionChoiceComponent,
        },
        {
          path: ':id/add-vuln/:missionid',
          component: AddVulnsToHostExternalComponent,
        },
        ...resource.children,
      ],
    };
  }
}
