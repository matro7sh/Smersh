import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { HostsService } from '../../services/hosts.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientsService } from '../../services/clients.service';
import { NgForm } from '@angular/forms';

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
      this.loadClient(id);
    });
  }

  loadClient(id) {
    this.clientService.getDataById(this.id).subscribe((response) => {
      console.log(response);
      this.client = response;
      this.name = response.name;
      this.firstName = response.firstName;
      this.mail = response.mail;
      this.lastName = response.lastName;
      this.phone = response.phone;
      this.id = response.id;
    });
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.clientService.update(this.id, form.value).subscribe(
      (el) => {
        this.openSnackBar(' Client updated');
        this.router.navigateByUrl('/clients');
        this.ngOnInit();
      },
      (err) => {
        if (err.status == '400') {
          this.openSnackBar('Error : ' + err.error['hydra:description']);
        }
      }
    );
  }

  openSnackBar(message) {
    this._snackBar.open(message, '', {
      duration: this.durationInSeconds * 1000,
    });
  }
}
