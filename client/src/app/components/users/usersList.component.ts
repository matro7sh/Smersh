import {
  DELETE,
  EDIT,
  GenericListComponent,
  SHOW,
} from 'src/app/components/generic/list/generic-list.component';
import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { UserRouter } from 'src/app/router/UserRouter';

@Component({
  selector: 'app-users-list',
  templateUrl: '../generic/list/generic-list.component.html',
  styleUrls: [],
})
export class UsersListComponent extends GenericListComponent {
  filters = ['username'];
  resource = 'users';
  singularResource = 'User';
  routerHelper = UserRouter;

  constructor(protected service: UsersService, protected router: Router) {
    super(service, router);
  }
}
