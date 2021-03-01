import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ClientsService } from '../../services/clients.service';
import { ClientRouter } from 'src/app/router/ClientRouter';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.scss'],
})
export class ClientCreateComponent implements OnInit {
  durationInSeconds = 4;

  constructor(
    private _snackBar: MatSnackBar,
    private clientsService: ClientsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  openSnackBar(message) {
    this._snackBar.open(message, '', {
      duration: this.durationInSeconds * 1000,
    });
  }

  onSubmit(form: NgForm) {
    this.clientsService.insert(form.value).subscribe(
      (res) => {
        this.openSnackBar('Client created');
        this.router.navigateByUrl(ClientRouter.redirectToList());
      },
      (err) => {
        this.openSnackBar('Error : ' + err.error['hydra:description']);
      }
    );
  }
}
