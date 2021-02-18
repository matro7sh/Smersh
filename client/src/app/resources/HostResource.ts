import { AbstractResource } from 'src/app/resources/AbstractResource';
import { HostsListComponent } from 'src/app/components/hosts/hostsList.component';
import { HostEditComponent } from 'src/app/components/host-edit/host-edit.component';

export class HostResource extends AbstractResource {
  protected basePath = 'hosts';
  protected list = HostsListComponent;
  protected edit = HostEditComponent;
}
