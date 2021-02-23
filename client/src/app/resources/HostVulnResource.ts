import { AbstractResource } from 'src/app/resources/AbstractResource';
import { EditVulnWithStateComponent } from 'src/app/components/edit-vuln-with-state/edit-vuln-with-state.component';

export class HostVulnResource extends AbstractResource {
  protected basePath = 'host_vulns';
  protected edit = EditVulnWithStateComponent;
}
