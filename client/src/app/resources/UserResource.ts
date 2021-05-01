import { AbstractResource } from 'src/app/resources/AbstractResource';
import {
  UsersCreateComponent,
  UsersEditComponent,
  UsersListComponent,
} from 'src/app/components/users';

export class UserResource extends AbstractResource {
  protected basePath = 'users';
  protected create = UsersCreateComponent;
  protected edit = UsersEditComponent;
  protected list = UsersListComponent;
}
