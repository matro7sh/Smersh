import { Component, OnInit } from '@angular/core';
import {HostsVulnsService} from '../../services/hosts-vulns.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-edit-vuln-with-state',
  templateUrl: './edit-vuln-with-state.component.html',
  styleUrls: ['./edit-vuln-with-state.component.css']
})
export class EditVulnWithStateComponent implements OnInit {

  public id: any;
  public currentState: any;
  public durationInSeconds = 4;
  public host: any;

  constructor(
      private hostvulnService: HostsVulnsService,
      private router: Router,
      private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const url = this.router.url;
    const id = url.split('/').pop();
    this.id = id;
    this.loadVuln();
  }

  loadVuln(){
    this.hostvulnService.getDataById(this.id).subscribe( vuln => {
      this.host = vuln.host;
      this.currentState = vuln.currentState;
    });

  }


  onSubmit(form: NgForm) {
    this.hostvulnService.update(this.id, form.value).subscribe(
        (el) => {
          this.openSnackBar('Host updated');
          this.router.navigateByUrl('/');
          this.ngOnInit();
        },
        (err) => {
          if (err.status == '400') {
            this.openSnackBar('Error : ' + err.error['hydra:description']);
          }
        }
    )
  }

  openSnackBar(message) {
    this._snackBar.open(message, '', {
      duration: this.durationInSeconds * 1000,
    });
  }

  delete(){
    if (confirm('Are you sure you want to save this thing into the database?')) {
      this.hostvulnService.delete(this.id).subscribe(
          (el) => {
            this.openSnackBar('this vulnerability has been deleted');
            this.router.navigateByUrl('/');
            this.ngOnInit();
          },
          (err) => {
            if (err.status == '400') {
              this.openSnackBar('Error : ' + err.error['hydra:description']);
            }
          }
      )
    } else {
      alert("OK NOT DELETED");
    }
  }

}
