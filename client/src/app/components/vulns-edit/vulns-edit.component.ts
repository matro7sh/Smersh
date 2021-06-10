import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VulnTranslationsService } from 'src/app/services/vulnTranslations.service';
import { VulnRouter } from 'src/app/router/VulnRouter';
import { VulnsService } from 'src/app/services/vulns.service';
import { Locale } from 'src/app/storage/Locale';

@Component({
  selector: 'app-vulns-edit',
  templateUrl: './vulns-edit.component.html',
  styleUrls: ['./vulns-edit.component.scss'],
})
export class VulnsEditComponent implements OnInit {
  public id: any;
  public name: any;
  public description: any;
  public remediation: any;
  public translationId: string;
  public currentLocale = new Locale().get();
  public local;
  public selectedTranslationLanguage: string;

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
    this.vulnsService.getDataById(this.id).subscribe((vuln) => {
      const translation =
        vuln.translations[new Locale().get()] ??
        vuln.translations.en ??
        vuln.translations[Object.keys(vuln.translations)[0]];
      this.translationId = translation.id;
      this.name = translation.name;
      this.description = translation.description;
      this.remediation = translation.remediation;
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
    if (this.currentLocale !== this.selectedTranslationLanguage) {
      apply = () => this.vulnsTranslationsService.insert(data);
    }

    apply().subscribe(() => {
      this.router.navigateByUrl(VulnRouter.redirectToList());
    });
  }
}
