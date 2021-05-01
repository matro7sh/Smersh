import { Component } from '@angular/core';
import { GenericCreateComponent } from 'src/app/components/generic';
import { ActivatedRoute, Router } from '@angular/router';
import { Input, Name } from 'src/app/form/Input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MissionRouter } from 'src/app/router/MissionRouter';
import { MissionsService } from 'src/app/services/missions.service';
import { MultipleUsersAutocompleteInput } from 'src/app/form/Queryable';

@Component({
  selector: 'app-missions-create',
  templateUrl: '../generic/form/generic-form.component.html',
  styleUrls: [],
})
export class MissionsCreateComponent extends GenericCreateComponent {
  public singularResource = 'mission';
  public routerHelper = MissionRouter;
  public inputs: Input[] = [];

  constructor(
    protected service: MissionsService,
    protected router: Router,
    protected route: ActivatedRoute,
    protected snackBar: MatSnackBar,
    usersSelectInput: MultipleUsersAutocompleteInput
  ) {
    super(service, router, route, snackBar);
    this.inputs = [new Name(), usersSelectInput];
  }
}
