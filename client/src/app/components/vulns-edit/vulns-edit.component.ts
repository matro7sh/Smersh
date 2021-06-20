import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VulnTranslationsService } from 'src/app/services/vulnTranslations.service';
import { VulnRouter } from 'src/app/router/VulnRouter';
import { VulnsService } from 'src/app/services/vulns.service';
import { Locale } from 'src/app/storage/Locale';
import { VulnModelApplication } from 'src/app/model/Vuln';
import { getTranslation } from 'src/app/helpers/translation';
import { VulnTranslationModelApplication } from 'src/app/model/VulnTranslation';

@Component({
  selector: 'app-vulns-edit-2',
  templateUrl: './vulns-edit.component.html',
  styleUrls: ['./vulns-edit.component.scss'],
})
export class VulnsEditComponent2 implements OnInit {
  public id: any;
  public name: any;
  public description: any;
  public remediation: any;
  public translationId: string;
  public currentLocale = new Locale().get();
  public locale: string;

  constructor(
    private vulnsService: VulnsService,
    private vulnsTranslationsService: VulnTranslationsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.loadVuln(this.id);
  }

  loadVuln(id): void {
    this.vulnsService
      .getDataById(this.id)
      .then((vuln: VulnModelApplication) => {
        const translation = getTranslation(
          vuln.translations
        ) as VulnTranslationModelApplication;
        this.translationId = translation.id;
        this.name = translation.name;
        this.description = translation.description;
        this.remediation = translation.remediation;
        this.locale = translation.locale;
      });
  }

  onSubmit(form: NgForm): void {
    const data = {
      ...form.value,
      translatable: `/api/vulns/${this.id}`,
      currentLocale: this.currentLocale,
      locale: this.currentLocale,
      translations: [this.currentLocale],
    };
    let apply = () =>
      this.vulnsTranslationsService.update(this.translationId, data);
    if (this.currentLocale !== this.locale) {
      apply = () => this.vulnsTranslationsService.insert(data);
    }

    apply().then(() => {
      this.router.navigateByUrl(VulnRouter.redirectToList());
    });
  }
}
