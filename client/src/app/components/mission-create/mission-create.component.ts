import { Component, OnInit } from '@angular/core';
import { MissionsService } from '../../services/missions.service';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { FormControl, NgForm } from '@angular/forms';
import { TypesService } from '../../services/types.service';
import { ClientsService } from '../../services/clients.service';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

@Component({
  selector: 'app-mission-create',
  templateUrl: './mission-create.component.html',
  styleUrls: ['./mission-create.component.css'],
})
export class MissionCreateComponent implements OnInit {
  public users = [];
  public AllUsers: any;
  userForm = new FormControl();
  public types = [];
  public mission = [];
  public clients = [];

  selectedType = [];
  selectedUsers: any;
  selectedClients: [];
  startDate: any;
  EndDate: any;

  constructor(
    private missionService: MissionsService,
    private clientServices: ClientsService,
    private router: Router,
    private usersService: UsersService,
    private typesServices: TypesService,
    private _adapter: DateAdapter<any>
  ) {
    this._adapter.setLocale('fr');
    this._adapter.getFirstDayOfWeek = () => {
      return 1;
    };
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadTypes();
    this.loadClients();
  }

  loadUsers(): void {
    this.users = [];
    this.usersService.getData().subscribe((events) => {
      this.AllUsers = events['hydra:member'].map((el) => el);
    });
  }

  loadTypes(): void {
    this.types = [];
    this.typesServices.getData().subscribe((events) => {
      this.types = events['hydra:member'].map((el) => el);
    });
  }

  loadClients(): void {
    this.clients = [];
    this.clientServices.getData().subscribe((events) => {
      this.clients = events['hydra:member'].map((el) => el);
    });
  }

  onSubmit(form: NgForm) {
    this.missionService
      .insert({
        ...form.value,
        nmap: false,
        missionType: this.selectedType,
        users: this.selectedUsers,
        clients: this.selectedClients,
        nessus: false,
        nmapFiler: false,
        nessusFiler: false,
      })
      .subscribe(() => {
        this.router.navigateByUrl('/missions');
      });
  }

  getTypeValue(value): void {
    this.selectedType = value;
  }

  toto(value): void {
    this.selectedUsers = value;
  }

  myClient(value): void {
    const toto = (this.selectedClients = value);
    const strCopy = toto.split();
    this.selectedClients = strCopy;
    console.log('u selected this client : ', strCopy);
  }
}
