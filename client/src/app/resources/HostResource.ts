import { AbstractResource } from 'src/app/resources/AbstractResource';
import {
  HostsEditComponent,
  HostsListComponent,
} from 'src/app/components/hosts';

export class HostResource extends AbstractResource {
  protected basePath = 'hosts';
  protected edit = HostsEditComponent;
  protected list = HostsListComponent;
}
