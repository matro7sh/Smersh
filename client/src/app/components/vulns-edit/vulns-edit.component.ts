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
  public currentLocal = localStorage.getItem('local');
  public local;

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
      const translation = vuln.translations[new Locale().get()];
      this.translationId = translation.id;
      this.name = translation.name;
      this.description = translation.description;
      this.remediation = translation.remediation;
    });
  }

  onSubmit(form: NgForm) {
    this.vulnsTranslationsService
      .update(this.translationId, {
        ...form.value,
        currentLocale: this.currentLocal,
        translations: ['fr'],
      })
      .subscribe(() => {
        this.router.navigateByUrl(VulnRouter.redirectToList());
      });
  }
}
