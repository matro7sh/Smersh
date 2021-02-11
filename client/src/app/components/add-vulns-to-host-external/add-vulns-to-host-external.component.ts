import { Component, OnInit } from '@angular/core';
import { VulnsService } from '../../services/vulns.service';
import { HostsService } from '../../services/hosts.service';
import { HostsVulnsService } from '../../services/hosts-vulns.service';
import { MissionsService } from '../../services/missions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {Locale} from '../../storage/Locale';
import {impactsService} from '../../services/impacts.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-vulns-to-host-external',
  templateUrl: './add-vulns-to-host-external.component.html',
  styleUrls: ['./add-vulns-to-host-external.component.css'],
})
export class AddVulnsToHostExternalComponent implements OnInit {
  public id: any;
  public hosts = [];
  public vulns = [];
  public impacts = [];
  public selectedHosts = [];
  public selectedVulns = [];
  public selectedImpact = [];
  public currentStateUser = "";
  public idFromUrl: any;
  public missionId: any;
  public host_id: any;
  selected_vulns: any[];
  selected_hosts: any[];
  selected_impacts: any[];
  public durationInSeconds = 4;

  constructor(
    private vulnsService: VulnsService,
    private activatedRoute: ActivatedRoute,
    private hostsService: HostsVulnsService,
    private impactService: impactsService,
    private _snackBar: MatSnackBar,
    private missionServices: MissionsService,
    private router: Router
  ) {}

  openSnackBar(message) {
    this._snackBar.open(message, '', {
      duration: this.durationInSeconds * 1000,
    });
  }

  ngOnInit(): void {
    const idFromUrl = this.activatedRoute.snapshot.params.id;
    this.host_id = idFromUrl;
    const url = this.router.url;
    const mission_id = url.split('/').pop();
    this.getHostsFromMission(mission_id);
    this.loadVulns();
    this.loadImpact();
  }

  // get all vulns
  loadVulns(): void {
    this.vulnsService.getData().subscribe((vulns) => {
     const locale =  new Locale().get();
     this.vulns = vulns['hydra:member'].map(e => {
       const elt = e.translations[locale];
       return {
         name:  elt.name,
         value:  e['@id']
       }
     });
    });
  }

  loadImpact(): void {
    this.impactService.getData().subscribe((impacts) => {
      this.impacts = impacts['hydra:member'].map(e => {
        return {
          name:  e.name,
          value:  e['@id']
        }
      });
    });
  }

  // get all hosts from mission id
  getHostsFromMission(mission_id): void {
    this.missionServices.getDataById(mission_id).subscribe((el) => {
      this.hosts = el['hosts'];
    });
  }

  onSubmit(form: NgForm) {
    Object.assign(form.value, { vuln: this.selectedVulns });
    Object.assign(form.value, { host: "/api/hosts/" + this.host_id });
    Object.assign(form.value, { impact: this.selectedImpact });
    Object.assign(form.value, { currentState: this.currentStateUser });
    this.hostsService.insert(form.value).subscribe(
        (res) => {
          this.openSnackBar('vulnerabilitie added');
          this.router.navigateByUrl('/missions');
        },
        (err) => {
          this.openSnackBar('Error : ' + err.error['hydra:description']);
        }
    )
  }

  Hosts(value) {
    this.selectedHosts = value;
  }

  Vulns(value) {
    this.selectedVulns = value;
  }

  Impacts(value) {
    this.selectedImpact = value;
  }
  createVuln() {
    this.router.navigateByUrl('/vulnerabilities/create');
  }
}
