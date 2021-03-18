import { Component, OnInit } from '@angular/core';
import { VulnsService } from '../../services/vulns.service';
import { HostsVulnsService } from '../../services/hosts-vulns.service';
import { MissionsService } from '../../services/missions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Locale } from '../../storage/Locale';
import { ImpactsService } from '../../services/impacts.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MissionRouter } from 'src/app/router/MissionRouter';
import { ImpactModelApplication } from 'src/app/model/Impact';
import { VulnModelApplication } from 'src/app/model/Vuln';
import { HostsService } from 'src/app/services/hosts.service';
import { HostModelApplication } from 'src/app/model/Host';
import { VulnRouter } from 'src/app/router/VulnRouter';

@Component({
  selector: 'app-add-vulns-to-host-external',
  templateUrl: './add-vulns-to-host-external.component.html',
  styleUrls: ['./add-vulns-to-host-external.component.scss'],
})
export class AddVulnsToHostExternalComponent implements OnInit {
  public id: any;
  public hosts = [];
  public vulns = [];
  public impacts = [];
  public selectedHosts = [];
  public selectedVulns = [];
  public selectedImpact = [];
  public currentStateUser = '';
  public idFromUrl: any;
  public host: HostModelApplication;
  public selected_vulns: any[];
  public selected_hosts: any[];
  public selected_impacts: any[];
  public durationInSeconds = 4;
  public missionId: any;

  constructor(
    private vulnsService: VulnsService,
    private hostsService: HostsService,
    private activatedRoute: ActivatedRoute,
    private hostsVulnService: HostsVulnsService,
    private impactService: ImpactsService,
    private _snackBar: MatSnackBar,
    private missionServices: MissionsService,
    private router: Router
  ) {}

  openSnackBar(message): void {
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

  // get all hosts from mission id
  getHostsFromMission(id: string): void {
    this.missionServices.getDataById(id).subscribe(({ hosts }) => {
      this.hosts = hosts;
    });
  }

  onSubmit(form: NgForm): void {
    this.hostsService
      .insert({
        ...form.value,
        vuln: this.selectedVulns,
        host: `/api/hosts/${this.host.id}`,
        impact: this.selectedImpact,
        currentState: this.currentStateUser,
      })
      .subscribe(
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
  }

  Hosts(value): void {
    this.selectedHosts = value;
  }

  Vulns(value): void {
    this.selectedVulns = value;
  }

  Impacts(value): void {
    this.selectedImpact = value;
  }
  createVuln(): void {
    this.router.navigateByUrl(VulnRouter.redirectToCreate());
  }
}
