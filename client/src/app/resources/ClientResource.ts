import { AbstractResource } from 'src/app/resources/AbstractResource';
import {
  ClientsCreateComponent,
  ClientsEditComponent,
  ClientsListComponent,
} from 'src/app/components/clients';

export class ClientResource extends AbstractResource {
  protected basePath = 'clients';
  protected list = ClientsListComponent;
  protected edit = ClientsEditComponent;
  protected create = ClientsCreateComponent;
}
