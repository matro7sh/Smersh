import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MissionsService } from 'src/app/services/missions.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { UploadsService } from 'src/app/services/uploads.service';
import { HostsService } from 'src/app/services/hosts.service';
import { FileInformation } from 'src/app/file-information';
import { MatSnackBar } from '@angular/material/snack-bar';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils/index.js';
import { saveAs } from 'file-saver';
import { Locale } from 'src/app/storage/Locale';
import { StepsService } from 'src/app/services/steps.service';
import { HostVulnRouter } from 'src/app/router/HostVulnRouter';
import { HostRouter } from 'src/app/router/HostRouter';
import { MissionRouter } from 'src/app/router/MissionRouter';
import { CRITICAL, HIGH, LOW, MEDIUM } from 'src/app/model/Impact';
import { configService } from 'src/app/services/configService';

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}

@Component({
  selector: 'app-mission',
  templateUrl: './mission-single.component.html',
  styleUrls: ['./mission-single.component.scss'],
})
export class MissionSingleComponent implements OnInit {
  @ViewChild('fileInput')
  fileInput: ElementRef;
  color: ThemePalette = 'primary';
  durationInSeconds = 4;
  public mission: any;
  public nmap: boolean;
  public nessus: boolean;
  hosts: any;
  missionName: any;
  users: any;
  creds: any;
  clients: any;
  steps: any;
  file: any;
  id: any;
  public missionId: string;
  public currentLocal = new Locale().get();

  uploadForm: FormGroup;

  fileInformation: FileInformation;

  constructor(
    private route: ActivatedRoute,
    private burp: configService,
    private _snackBar: MatSnackBar,
    private hostsService: HostsService,
    private stepsService: StepsService,
    private router: Router,
    private missionsService: MissionsService,
    private uploadServices: UploadsService,
    private fb: FormBuilder
  ) {
    this.missionId = this.router.url.split('/').pop();
  }

  done(host): void {
    const idHost = host['@id'].split('/').pop();
    if (host.checked === false) {
      this.hostsService.update(idHost, { checked: true }).subscribe(() => {
        this.openSnackBar(host.name + ' updated To True ');
        this.ngOnInit();
      });
    } else {
      this.hostsService.update(idHost, { checked: false }).subscribe(() => {
        this.openSnackBar(host.name + ' updated To False ');
        this.ngOnInit();
      });
    }
  }

  deleteStep(id: string): void {
    this.stepsService.delete(id).subscribe(
      () => {
        this.openSnackBar('step has been successfully deleted'),
          this.ngOnInit();
      },
      (err) => {
        if (err.status === '400') {
          this.openSnackBar('Error : ' + err.error['hydra:description']);
        }
      }
    );
  }

  editStep(id: string, form: NgForm): void {
    this.stepsService.update(id, form.value).subscribe(
      () => {
        this.openSnackBar('step has been successfully updated'),
          this.ngOnInit();
      },
      (err) => {
        if (err.status === '400') {
          this.openSnackBar('Error : ' + err.error['hydra:description']);
        }
      }
    );
  }

  nmapUpdate(isChecked: boolean): void {
    this.missionsService
      .update(this.missionId, { nmap: isChecked })
      .subscribe();
  }

  nessusUpdate(isChecked: boolean): void {
    this.missionsService
      .update(this.missionId, { nessus: isChecked })
      .subscribe();
  }

  openSnackBar(message: string): void {
    this._snackBar.open(message, '', {
      duration: this.durationInSeconds * 1000,
    });
  }

  ngOnInit(): void {
    this.loadData(this.missionId);
    this.uploadForm = this.fb.group({
      filename: '',
      userFile: null,
    });
  }

  exportDocument(name: string, data: any): void {
    const a = document.createElement('a');
    const file = new Blob([JSON.stringify(data)], {
      type: 'application/json',
    });
    a.href = URL.createObjectURL(file);
    a.download = `${name}-${this.missionName}.json`;
    a.click();
  }

  exportBurp(): void {
    this.loadData(this.missionId);
    this.burp.getBurpConfiguration().subscribe((e) => {
      const override = {
        ...e,
        target: {
          ...e.target,
          scope: {
            ...e.target.scope,
            include: [
              ...e.target.scope.include,
              ...this.hosts.map((h) => ({ enabled: true, prefix: h.name })),
            ],
          },
        },
      };
      this.exportDocument('burp', override);
    });
  }

  getImpactColor(name: string): string {
    switch (name) {
      case LOW: {
        return 'lowimpact';
      }
      case MEDIUM: {
        return 'mediumimpact';
      }
      case HIGH: {
        return 'highimpact';
      }
      case CRITICAL: {
        return 'criticalimpact';
      }
      default: {
        return '';
      }
    }
  }

  loadData(id: string): void {
    this.missionsService.getDataById(id).subscribe((response) => {
      this.mission = response;
      this.missionName = response.name;
      this.hosts = response['hosts'].map((host) => ({
        ...host,
        vulns: host.hostVulns.map((hostVuln) => ({
          ...hostVuln.vuln,
          impact: {
            ...hostVuln.impact,
            color: this.getImpactColor(hostVuln.impact.name),
          },
          linked: hostVuln.id,
          ...(hostVuln.vuln.translations[this.currentLocal] ?? {}),
          translate: hostVuln.vuln.translations[this.currentLocal] ?? {},
        })),
        name: `${host.name.match(/^((https?|ftp):\/\/)/) ? '' : 'http://'}${
          host.name
        }`,
      }));

      this.users = response['users'];
      this.creds = response['credentials'];
      this.clients = response['clients'];
      this.steps = response['steps'];
      this.nmap = response.nmap;
      this.nessus = response.nessus;
      this.id = response.id;
    });
  }

  addCodiMd(form: NgForm): void {
    this.missionsService.update(this.id, form.value).subscribe(
      (el) => {
        this.openSnackBar('codiMD updated');
        this.ngOnInit();
      },
      (err) => {
        if (err.status === '400') {
          this.openSnackBar('Error : ' + err.error['hydra:description']);
        }
      }
    );
  }

  addHost(form: NgForm): void {
    this.hostsService
      .insert({
        ...form.value,
        checked: false,
        mission: this.mission['@id'],
      })
      .subscribe(
        () => {
          this.ngOnInit();
        },
        (err) => {
          if (err.status === '400') {
            this.openSnackBar('Error : ' + err.error['hydra:description']);
          }
        }
      );
  }

  addStep(form: NgForm): void {
    const date = new Date(Date.now());

    this.stepsService
      .insert({
        ...form.value,
        mission: this.mission['@id'],
        createdAt: date,
      })
      .subscribe(
        () => {
          this.ngOnInit();
        },
        (err) => {
          if (err.status === '400') {
            this.openSnackBar('Error : ' + err.error['hydra:description']);
          }
        }
      );
  }

  deleteHost(host): void {
    this.hostsService.delete(host['@id'].split('/')[3]).subscribe(
      () => {
        this.openSnackBar('host has been successfully deleted'),
          this.ngOnInit();
      },
      (err) => {
        if (err.status === '400') {
          this.openSnackBar('Error : ' + err.error['hydra:description']);
        }
      }
    );
  }

  updateHost(host): void {
    this.router.navigateByUrl(HostRouter.redirectToEditFromIRI(host['@id']));
  }

  editMission(): void {
    this.router.navigateByUrl(`/missions/details/${this.id}`);
  }

  sendFile(): void {
    const fd = new FormData();
    fd.append('filename', this.file);
    fd.append('missionName', this.mission.name);
    this.uploadServices.uploadHosts(fd).then(
      () => this.router.navigateByUrl(MissionRouter.redirectToShow(this.id)),
      () =>
        this.openSnackBar(
          'one or many host in ure file already exist in database and probably used by other mission'
        )
    );
  }

  onSelectFile(event): void {
    this.file = event.target.files[0];
  }

  selectFile(): void {
    this.fileInput.nativeElement.click();
  }

  goToAddVulns(uri, mission_id: string): void {
    const id = uri.split('/').pop();
    this.router.navigateByUrl(`/missions/${id}/add-vuln/${mission_id}`);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
  }

  exportData(): void {
    this.missionsService.getDataById(this.id).subscribe((data) => {
      this.exportDocument('mission', data);
    });
  }

  generate(): void {
    loadFile(`/assets/Smersh.docx`, (error, content) => {
      if (error) {
        throw error;
      }

      const zip = new PizZip(content);
      const doc = new Docxtemplater().loadZip(zip);

      doc.setData({
        startDate: this.mission.startDate,
        CLIENT_NAME: this.missionName,
        creds: this.mission.credentials
          ? this.mission.credentials
          : 'No Account used',
        classification: 'Confidentiel client - C3 ',
        phone: '00-00-00-00',
        version: '1.0',
        by: 'jenaye@protonmail.com',
        to: 'myclient@localhost.com',
        authors: this.users,
        state: 'draft',
        scope: this.hosts.map((host) => ({
          ...host,
          hostVulns: host.hostVulns.map((hostVuln) => ({
            ...hostVuln,
            ...hostVuln.vuln.translations[this.currentLocal],
          })),
        })),
      });
      // think to update report with new hostVuln ( 1 box by vulnerability with current state )
      try {
        // render the document (replace all occurences of key by your data)
        doc.render();
      } catch (error) {
        if (error.properties && error.properties.errors instanceof Array) {
          console.log(
            'errorMessages',
            error.properties.errors
              .map((e) => e.properties.explanation)
              .join('\n')
          );
        }
        throw error;
      }
      const out = doc.getZip().generate({
        type: 'blob',
        mimeType:
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      }); // Output the document using Data-URI
      saveAs(out, 'rapport.docx');
    });
  }

  share(): void {
    window.alert('The product has been shared!');
  }

  editThisVuln(id: string): void {
    this.router.navigateByUrl(HostVulnRouter.redirectToEdit(id));
  }
}
