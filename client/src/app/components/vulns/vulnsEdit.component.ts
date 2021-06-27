import { Component } from '@angular/core';
import { GenericEditComponent } from 'src/app/components/generic';
import { ActivatedRoute, Router } from '@angular/router';
import { Input, Name, TextAreaInput } from 'src/app/form/Input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VulnsService } from 'src/app/services/vulns.service';
import { ImpactAutocompleteInput, VulnTypeAutocompleteInput, } from 'src/app/form/Queryable';
import { VulnRouter } from 'src/app/router/VulnRouter';
import { NgForm } from '@angular/forms';
import { VulnTranslationsService } from 'src/app/services/vulnTranslations.service';
import { Locale } from 'src/app/storage/Locale';
import { VulnModelApplication } from 'src/app/model/Vuln';
import { AbstractModelApplication } from 'src/app/model/abstract';

@Component({
  selector: 'app-vulns-edit',
  templateUrl: '../generic/form/generic-form.component.html',
  styleUrls: [],
})
export class VulnsEditComponent extends GenericEditComponent {
  public singularResource = 'vuln';
  public routerHelper = VulnRouter;
  public currentLocale = new Locale().get();
  public inputs: Input[] = [];

  constructor(
    protected service: VulnsService,
    protected router: Router,
    protected route: ActivatedRoute,
    protected snackBar: MatSnackBar,
    private vulnsTranslationsService: VulnTranslationsService,
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

  onSubmit({value}: NgForm): void {
    const vulnData = {...this.itemTransformer(), ...value};
    const data = {
      ...vulnData,
      translatable: `${this.service.getUrl()}/${this.id}`,
      currentLocale: this.currentLocale,
      locale: this.currentLocale,
    };

    this.service.update(this.id, vulnData);

    let apply: () => Promise<AbstractModelApplication>;
    const currentTranslation = (this.item as VulnModelApplication).translations[
      this.currentLocale
      ];
    if (!currentTranslation) {
      apply = () => this.vulnsTranslationsService.insert(data);
    } else {
      apply = () =>
        this.vulnsTranslationsService.update(currentTranslation.id, data);
    }

    apply()
      .then(() => {
        this.notifyActionSuccessAndRedirect('updated');
      })
      .catch(({
                error: {['hydra:description']: error},
                status
              }) => {
        if (status === '400') {
          this.openSnackBar(`Error : ${error}`);
        }
      });
  }
}
