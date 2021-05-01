import { Component } from '@angular/core';
import { GenericCreateComponent } from 'src/app/components/generic';
import { ActivatedRoute, Router } from '@angular/router';
import { Input, Name } from 'src/app/form/Input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImpactRouter } from 'src/app/router/ImpactRouter';
import { ImpactsService } from 'src/app/services/impacts.service';

@Component({
  selector: 'app-impacts-create',
  templateUrl: '../generic/form/generic-form.component.html',
  styleUrls: [],
})
export class ImpactsCreateComponent extends GenericCreateComponent {
  public singularResource = 'impact';
  public routerHelper = ImpactRouter;
  public inputs: Input[] = [new Name()];

  constructor(
    protected service: ImpactsService,
    protected router: Router,
    protected route: ActivatedRoute,
    protected snackBar: MatSnackBar
  ) {
    super(service, router, route, snackBar);
  }
}
