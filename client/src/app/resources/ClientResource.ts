import { AbstractResource } from 'src/app/resources/AbstractResource';
import { ClientsListComponent } from 'src/app/components/clients/clientsList.component';
import { ClientEditComponent } from 'src/app/components/client-edit/client-edit.component';
import { ClientCreateComponent } from 'src/app/components/client-create/client-create.component';

export class ClientResource extends AbstractResource {
  protected basePath = 'clients';
  protected list = ClientsListComponent;
  protected edit = ClientEditComponent;
  protected create = ClientCreateComponent;
}
