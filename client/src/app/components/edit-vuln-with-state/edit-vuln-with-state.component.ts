import { Component, OnInit } from '@angular/core';
import { HostsVulnsService } from '../../services/hosts-vulns.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-vuln-with-state',
  templateUrl: './edit-vuln-with-state.component.html',
  styleUrls: ['./edit-vuln-with-state.component.css'],
})
export class EditVulnWithStateComponent implements OnInit {
  public id: any;
  public currentState: any;
  public durationInSeconds = 4;
  public host: any;
  public missionId: any;

  constructor(
    private hostvulnService: HostsVulnsService,
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
    this.hostvulnService.getDataById(this.id).subscribe((vuln) => {
      this.host = vuln.host;
      this.currentState = vuln.currentState;
      this.missionId = vuln.host.mission.split('/').pop();
    });
  }

  onSubmit(form: NgForm): void {
    this.hostvulnService.update(this.id, form.value).subscribe(
      () => {
        this.openSnackBar('Host updated');
        this.router.navigateByUrl(`/missions/${this.missionId}`);
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
