import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HostsService } from 'src/app/services/hosts.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  public durationInSeconds = 4;
  public missionId: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private hostsService: HostsService,
    private _snackBar: MatSnackBar,
    private route: Router,
  ) {
  }

  ngOnInit(): void {
    this.missionId = this.route.url.split('/')[2];
  }

  openSnackBar(message: string): void {
    this._snackBar.open(message, '', {
      duration: this.durationInSeconds * 1000,
    });
  }
}
