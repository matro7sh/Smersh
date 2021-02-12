import { AbstractResource } from 'src/app/resources/AbstractResource';
import { UsersComponent } from 'src/app/components/users/users.component';
import { UserCreateComponent } from 'src/app/components/user-create/user-create.component';
import { UserEditComponent } from 'src/app/components/user-edit/user-edit.component';

export class UserResource extends AbstractResource {
  protected basePath = 'users';
  protected list = UsersComponent;
  protected edit = UserEditComponent;
  protected create = UserCreateComponent;
}
