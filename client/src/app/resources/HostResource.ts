import { AbstractResource } from 'src/app/resources/AbstractResource';
import { HostsComponent } from 'src/app/components/hosts/hosts.component';
import { HostEditComponent } from 'src/app/components/host-edit/host-edit.component';

export class HostResource extends AbstractResource {
  protected basePath = 'hosts';
  protected list = HostsComponent;
  protected edit = HostEditComponent;
}
