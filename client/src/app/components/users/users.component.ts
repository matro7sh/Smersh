import { GenericListComponent } from 'src/app/components/generic/list/generic-list.component';
import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { UserRouter } from 'src/app/router/UserRouter';

@Component({
  selector: 'app-user-list',
  templateUrl: '../generic/list/generic-list.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent extends GenericListComponent {
  filters = ['username'];
  resource = 'users';
  singularResource = 'User';
  routerHelper = UserRouter;

  constructor(protected service: UsersService, protected router: Router) {
    super(service, router);
  }
}
