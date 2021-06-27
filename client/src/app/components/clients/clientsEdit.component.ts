import { Component } from '@angular/core';
import { GenericEditComponent } from 'src/app/components/generic';
import { ClientsService } from 'src/app/services/clients.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Email, FirstName, Input, LastName, Name, Phone, } from 'src/app/form/Input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientRouter } from 'src/app/router/ClientRouter';

@Component({
  selector: 'app-clients-edit',
  templateUrl: '../generic/form/generic-form.component.html',
  styleUrls: [],
})
export class ClientsEditComponent extends GenericEditComponent {
  public singularResource = 'client';
  public routerHelper = ClientRouter;
  public inputs: Input[] = [
    new Name(),
    new Email(),
    new FirstName(),
    new LastName(),
    new Phone(),
  ];

  constructor(
    protected service: ClientsService,
    protected router: Router,
    protected route: ActivatedRoute,
    protected snackBar: MatSnackBar
  ) {
    super(service, router, route, snackBar);
  }
}
