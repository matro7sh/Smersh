import { Component, OnInit } from '@angular/core';
import { VulnsService } from 'src/app/services/vulns.service';
import { HostVulnsService } from 'src/app/services/hostVulns.service';
import { MissionsService } from 'src/app/services/missions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Locale } from 'src/app/storage/Locale';
import { ImpactsService } from 'src/app/services/impacts.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MissionRouter } from 'src/app/router/MissionRouter';
import { ImpactModelApplication } from 'src/app/model/Impact';
import { VulnModelApplication } from 'src/app/model/Vuln';
import { HostsService } from 'src/app/services/hosts.service';
import { HostModelApplication } from 'src/app/model/Host';
import { VulnRouter } from 'src/app/router/VulnRouter';
import { Observable } from 'rxjs';
import { MediaObjectsService } from 'src/app/services/mediaObjects.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Language, LocaleService } from 'src/app/services/locale.service';

@Component({
  selector: 'app-add-vulns-to-host-external',
  templateUrl: './add-vulns-to-host-external.component.html',
  styleUrls: ['./add-vulns-to-host-external.component.scss'],
})
export class AddVulnsToHostExternalComponent implements OnInit {
  public languages = Object.keys(Language).map((lang) => Language[lang]);
  public currentLang: Language = new Locale().get() as Language;
  public vulns = [];
  public impacts = [];
  public selectedVuln: string | null = null;
  public selectedImpact: string | null = null;
  public currentStateUser = '';
  public host: HostModelApplication;
  public durationInSeconds = 4;
  public missionId: string;
  public fichierAEnvoyer: File = null;
  public onsaitpascomment = null;

  constructor(
    private vulnsService: VulnsService,
    private mediaObjectsService: MediaObjectsService,
    private hostsService: HostsService,
    private hostVulnsService: HostVulnsService,
    private activatedRoute: ActivatedRoute,
    private impactService: ImpactsService,
    private _snackBar: MatSnackBar,
    private missionServices: MissionsService,
    private router: Router,
    public localeService: LocaleService,
    private translate: TranslateService
  ) {}

  openSnackBar(message: string): void {
    this._snackBar.open(message, '', {
      duration: this.durationInSeconds * 1000,
    });
  }

  ngOnInit(): void {
    this.missionId = this.activatedRoute.snapshot.params.id;
    this.hostsService
      .getDataById(this.activatedRoute.snapshot.params.targetHost)
      .subscribe((host) => (this.host = host));
    this.loadVulns();
    this.loadImpact();
    this.translate.onLangChange.subscribe(
        (event: LangChangeEvent) => (this.currentLang = event.lang as Language)
    );
  }

  // get all vulns
  loadVulns(): void {
    this.vulnsService
      .getData()
      .then(({ data }: { count: number; data: VulnModelApplication[] }) => {
        const locale = new Locale().get();
        this.vulns = data.map((e) => ({
          name: e.translations[locale.toString()].name,
          value: e['@id'],
        }));
      });
  }

  loadImpact(): void {
    this.impactService
      .getData()
      .then(({ data }: { count: number; data: ImpactModelApplication[] }) => {
        this.impacts = data.map((e) => {
          return {
            name: e.name,
            value: e['@id'],
          };
        });
      });
  }

  onSubmit(form: NgForm): void {
    const data = {
      ...form.value,
      vuln: this.selectedVuln,
      host: this.host['@id'],
      impact: this.selectedImpact,
      currentState: this.currentStateUser,
    };
    const callback = (body) =>
      this.hostVulnsService.insert(body).subscribe(
        () => {
          this.openSnackBar('vulnerabilitie added');
          this.router.navigateByUrl(
            MissionRouter.redirectToShow(this.missionId)
          );
        },
        (err) => {
          this.openSnackBar('Error : ' + err.error['hydra:description']);
        }
      );

    if (this.onsaitpascomment) {
      this.mediaObjectsService
        .insert(this.onsaitpascomment)
        .subscribe(({ ['@id']: id }) => {
          data.image = id;
          callback(data);
        });
    } else {
      callback(data);
    }
  }

  Vulns(value: string): void {
    this.selectedVuln = value;
  }

  Impacts(value: string): void {
    this.selectedImpact = value;
  }
  createVuln(): void {
    this.router.navigateByUrl(VulnRouter.redirectToCreate());
  }

  storeImage(inputElement: HTMLInputElement): void {
    const formdata = new FormData();
    formdata.append('file', inputElement.files[0]);
    this.onsaitpascomment = formdata;
  }
}
