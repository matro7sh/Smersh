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
import { ConfigService } from 'src/app/services/configService';
import ImgModule from 'docxtemplater-image-module-free';
import axios from 'axios';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from 'src/app/components/popup/popup.component';
import { MissionModelApplication } from 'src/app/model/Mission';
import { HostModelApplication } from 'src/app/model/Host';
import { AbstractService } from 'src/app/services/abstract';

function loadFile(url, callback): void {
  PizZipUtils.getBinaryContent(url, callback);
}

const base64MimeRetriever = (b64: string) => {
  const mime = b64.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

  if (mime && mime.length) {
    return mime[1] ?? '';
  }

  return '';
};

const bufferToB64 = (arrayBuffer) => {
  return btoa(
    new Uint8Array(arrayBuffer).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ''
    )
  );
};

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
    private burp: ConfigService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private hostsService: HostsService,
    private stepsService: StepsService,
    private router: Router,
    private missionsService: MissionsService,
    private uploadServices: UploadsService,
    private fb: FormBuilder
  ) {
    this.missionId = this.router.url.split('/').pop();
  }

  openDeleteDialog(host): void {
    const diag = this.dialog.open(PopupComponent, {
      width: '30%',
      disableClose: true,
      data: host,
    });
    diag.afterClosed().subscribe((result) => {
      if (result === true) {
        this.deleteHost(host);
      }
    });
  }

  done(host): void {
    const idHost = host['@id'].split('/').pop();
    if (host.checked === false) {
      this.hostsService.update(idHost, { checked: true }).then(() => {
        this.openSnackBar(host.name + ' updated To True ');
        this.ngOnInit();
      });
    } else {
      this.hostsService.update(idHost, { checked: false }).then(() => {
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
    this.stepsService.update(id, form.value).then(
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
    this.missionsService.update(this.missionId, { nmap: isChecked }).then();
  }

  nessusUpdate(isChecked: boolean): void {
    this.missionsService.update(this.missionId, { nessus: isChecked }).then();
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

  exportDocument(name: string, data: unknown): void {
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
    const burpConfig = this.burp.getBurpConfiguration();
    const override = {
      ...burpConfig,
      target: {
        ...burpConfig.target,
        scope: {
          ...burpConfig.target.scope,
          include: [
            ...burpConfig.target.scope.include,
            ...this.hosts.map((h) => ({
              enabled: true,
              prefix: h.name,
            })),
          ],
        },
      },
    };
    this.exportDocument('burp', override);
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
    this.missionsService
      .getDataById(id)
      .then((mission: MissionModelApplication) => {
        this.mission = mission;
        this.missionName = mission.name;
        this.hosts = (mission.hosts as HostModelApplication[]).map((host) => ({
          ...host,
          vulns: host.hostVulns
            .filter((hostVuln) => hostVuln.vuln?.translations)
            .map((hostVuln) => {
              const translations = hostVuln.vuln.translations;
              const translate =
                translations[this.currentLocal] ??
                translations.en ??
                translations[Object.keys(translations)[0]];
              return {
                ...hostVuln.vuln,
                impact: {
                  ...hostVuln.impact,
                  color: this.getImpactColor(hostVuln.impact.name),
                },
                linked: hostVuln.id,
                ...translate,
                translate,
              };
            }),
        }));

        this.users = mission.users;
        this.creds = mission.credentials;
        this.clients = mission.clients;
        this.steps = mission.steps;
        this.nmap = mission.nmap;
        this.nessus = mission.nessus;
        this.id = mission.id;
      });
  }

  addCodiMd(form: NgForm): void {
    this.missionsService.update(this.id, form.value).then(
      () => {
        this.openSnackBar('codiMD updated');
        this.ngOnInit();
        form.reset();
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
      .then(
        () => {
          this.ngOnInit();
          form.reset();
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
      .then(
        () => {
          this.ngOnInit();
          form.reset();
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
      () => this.ngOnInit(),
      () => this.router.navigateByUrl(MissionRouter.redirectToShow(this.id)),
      () =>
        this.openSnackBar(
          'one or many host in ure file already exist in database and probably used by other mission'
        )
    );
    this.file = '';
    document.getElementById('file-importName').innerHTML =
      'No file selected...';
  }

  clickFakeFileInput(): void {
    document.getElementById('file-import').click();
  }

  onSelectFile(event): void {
    this.file = event.target.files[0];
    document.getElementById('file-importName').innerHTML = this.file.name;
  }

  selectFile(): void {
    this.fileInput.nativeElement.click();
  }

  goToAddVulns(targetHostIRI: string): void {
    this.router.navigateByUrl(
      MissionRouter.redirectToAddVuln(this.mission.id, targetHostIRI)
    );
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
  }

  exportData(): void {
    this.missionsService.getDataById(this.id).then((data) => {
      this.exportDocument('mission', data);
    });
  }

  generate(): void {
    const imageModule = new ImgModule({
      centered: true,
      fileType: 'docx',
      getImage: (tagValue, tagName) => {
        if (!tagValue.startsWith('https://picsum.photos/200/300')) {
          tagValue = `${AbstractService.getBaseAPIEndpoint()}${tagValue}`;
        }
        return axios
          .get(tagValue, { responseType: 'arraybuffer' })
          .then(({ data }) => data);
      },
      getSize: async (img, tagValue, tagName) => {
        const i = new Image();
        const b64Img = bufferToB64(img);
        await new Promise((resolve) => {
          i.onload = (e) => resolve(e);
          i.src = `data:${base64MimeRetriever(b64Img)};base64,${b64Img}`;
        });
        const maxWidth = 1200;
        const maxHeight = 400;

        if (i.naturalWidth < i.naturalHeight) {
          return [
            Math.round(i.naturalWidth * (maxHeight / i.naturalHeight)),
            maxHeight,
          ];
        }
        return [
          maxWidth,
          Math.round(i.naturalHeight * (maxWidth / i.naturalWidth)),
        ];
      },
    });

    loadFile(`/assets/Smersh.docx`, (error, content) => {
      if (error) {
        throw error;
      }

      const zip = new PizZip(content);
      const data = {
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
          hostVulns: host.hostVulns
            .filter((hostVuln) => hostVuln.vuln?.translations)
            .map((hostVuln) => {
              const translations = hostVuln.vuln.translations;
              const translation =
                translations[this.currentLocal] ??
                translations.en ??
                translations[Object.keys(translations)[0]];
              return {
                ...hostVuln,
                image:
                  hostVuln.image?.contentUrl ?? 'https://picsum.photos/200/300',
                ...translation,
              };
            }),
        })),
      };
      const doc = new Docxtemplater()
        .loadZip(zip)
        .attachModule(imageModule)
        .setData(data)
        .compile();
      try {
        doc.resolveData(data).then(() => {
          const out = doc.render().getZip().generate({
            type: 'blob',
          }); // Output the document using Data-URI
          saveAs(out, 'rapport.docx');
        });
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
    });
  }

  share(): void {
    window.alert('The product has been shared!');
  }

  editThisVuln(id: string): void {
    this.router.navigateByUrl(HostVulnRouter.redirectToEdit(id));
  }
}
