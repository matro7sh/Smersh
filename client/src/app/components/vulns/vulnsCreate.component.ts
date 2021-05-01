import { Component } from '@angular/core';
import { GenericCreateComponent } from 'src/app/components/generic';
import { ActivatedRoute, Router } from '@angular/router';
import { Input, Name, TextAreaInput } from 'src/app/form/Input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VulnsService } from 'src/app/services/vulns.service';
import {
  ImpactAutocompleteInput,
  VulnTypeAutocompleteInput,
} from 'src/app/form/Queryable';
import { VulnRouter } from 'src/app/router/VulnRouter';

@Component({
  selector: 'app-vulns-create',
  templateUrl: '../generic/form/generic-form.component.html',
  styleUrls: [],
})
export class VulnsCreateComponent extends GenericCreateComponent {
  public singularResource = 'vuln';
  public routerHelper = VulnRouter;
  public inputs: Input[] = [];

  constructor(
    protected service: VulnsService,
    protected router: Router,
    protected route: ActivatedRoute,
    protected snackBar: MatSnackBar,
    impactSelectInput: ImpactAutocompleteInput,
    vulnTypeSelectInput: VulnTypeAutocompleteInput
  ) {
    super(service, router, route, snackBar);
    this.inputs = [
      new Name(),
      new TextAreaInput({
        name: 'description',
        label: 'Description',
        placeholder: 'I found a vulnerability during...',
      }),
      new TextAreaInput({
        name: 'remediation',
        label: 'Remediation',
        placeholder: 'You can correct this with...',
      }),
      impactSelectInput,
      vulnTypeSelectInput,
    ];
  }
}
