import { Component, OnInit } from '@angular/core';
import { HostVulnsService } from 'src/app/services/hostVulns.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { MissionRouter } from 'src/app/router/MissionRouter';
import { getTranslation } from 'src/app/helpers/translation';
import { VulnTranslationFromAPIInterface } from 'src/app/model/VulnTranslation';
import { HostVulnModelApplication } from 'src/app/model/HostVuln';
import { AbstractService } from 'src/app/services/abstract';

@Component({
  selector: 'app-edit-vuln-with-state',
  templateUrl: './edit-vuln-with-state.component.html',
  styleUrls: ['./edit-vuln-with-state.component.scss'],
})
export class EditVulnWithStateComponent implements OnInit {
  public panelOpenState = false;
  public id: any;
  public currentState: any;
  public pictureName: string;
  public durationInSeconds = 4;
  public host: any;
  public url = AbstractService.getBaseAPIEndpoint();
  public missionId: any;
  public vulnName: string;

  constructor(
    private hostvulnService: HostVulnsService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.id = id;
      this.loadVuln();
    });
  }

  loadVuln(): void {
    this.hostvulnService
      .getDataById(this.id)
      .then((hostVuln: HostVulnModelApplication) => {
        this.host = hostVuln.host;
        this.currentState = hostVuln.currentState;
        this.pictureName = hostVuln.image;
        this.vulnName = (
          getTranslation(
            hostVuln.vuln?.translations
          ) as VulnTranslationFromAPIInterface
        )?.name;
        this.missionId = hostVuln.host?.mission?.split('/').pop() ?? '';
      });
  }

  onSubmit(form: NgForm): void {
    this.hostvulnService.update(this.id, form.value).then(
      () => {
        this.openSnackBar('Host updated');
        this.router.navigateByUrl(MissionRouter.redirectToList());
        this.ngOnInit();
      },
      (err) => {
        if (err.status === '400') {
          this.openSnackBar('Error : ' + err.error['hydra:description']);
        }
      }
    );
  }

  openSnackBar(message): void {
    this._snackBar.open(message, '', {
      duration: this.durationInSeconds * 1000,
    });
  }

  delete(): void {
    if (
      confirm('Are you sure you want to save this thing into the database?')
    ) {
      this.hostvulnService.delete(this.id).subscribe(
        () => {
          this.openSnackBar('this vulnerability has been deleted');
          this.router.navigateByUrl('/');
          this.ngOnInit();
        },
        (err) => {
          if (err.status === '400') {
            this.openSnackBar('Error : ' + err.error['hydra:description']);
          }
        }
      );
    } else {
      alert('OK NOT DELETED');
    }
  }
}
