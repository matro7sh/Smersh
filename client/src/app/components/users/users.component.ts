import { GenericListComponent } from 'src/app/components/generic/list/generic-list.component';
import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: '../generic/list/generic-list.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent extends GenericListComponent {
  filters = ['username'];
  resource = 'users';

  constructor(protected service: UsersService, protected router: Router) {
    super(service, router);
  }
}
