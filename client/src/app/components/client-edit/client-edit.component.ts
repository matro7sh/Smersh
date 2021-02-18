import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientsService } from '../../services/clients.service';
import { NgForm } from '@angular/forms';
import { ClientRouter } from 'src/app/router/ClientRouter';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css'],
})
export class ClientEditComponent implements OnInit {
  public id: any;
  public client = [];
  durationInSeconds = 4;
  public name: any;
  public firstName: any;
  public lastName: any;
  public mail: any;
  public phone: any;

  constructor(
    private router: Router,
    private clientService: ClientsService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.id = id;
      this.loadClient();
    });
  }

  loadClient(): void {
    this.clientService.getDataById(this.id).subscribe((response) => {
      this.client = response;
      this.name = response.name;
      this.firstName = response.firstName;
      this.mail = response.mail;
      this.lastName = response.lastName;
      this.phone = response.phone;
      this.id = response.id;
    });
  }

  onSubmit(form: NgForm): void {
    this.clientService.update(this.id, form.value).subscribe(
      () => {
        this.openSnackBar(' Client updated');
        this.router.navigateByUrl(ClientRouter.redirectToList());
        this.ngOnInit();
      },
      (err) => {
        if (err.status === '400') {
          this.openSnackBar('Error : ' + err.error['hydra:description']);
        }
      }
    );
  }

  openSnackBar(message: string): void {
    this._snackBar.open(message, '', {
      duration: this.durationInSeconds * 1000,
    });
  }
}
