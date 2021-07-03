import { Component } from '@angular/core';
import { GenericCreateComponent } from 'src/app/components/generic';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Email,
  Input,
  Password,
  Phone,
  TextInput,
  Username,
} from 'src/app/form/Input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRouter } from 'src/app/router/UserRouter';
import { UsersService } from 'src/app/services/users.service';
import { RoleAutocompleteInput } from 'src/app/form/Queryable';

@Component({
  selector: 'app-users-create',
  templateUrl: '../generic/form/generic-form.component.html',
  styleUrls: [],
})
export class UsersCreateComponent extends GenericCreateComponent {
  public singularResource = 'user';
  public routerHelper = UserRouter;
  public inputs: Input[] = [
    new Username(),
    new Password(),
    new Email(),
    new Phone(),
    new RoleAutocompleteInput(),
    new TextInput({
      label: 'Trigram',
      name: 'trigram',
      placeholder: 'JZN',
    }),
    new TextInput({
      label: 'City',
      name: 'city',
      placeholder: 'Bikini bottom',
    }),
  ];

  constructor(
    protected service: UsersService,
    protected router: Router,
    protected route: ActivatedRoute,
    protected snackBar: MatSnackBar
  ) {
    super(service, router, route, snackBar);
  }
}
