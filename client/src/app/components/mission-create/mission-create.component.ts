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
import { MissionRouter } from 'src/app/router/MissionRouter';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserModelApplication } from 'src/app/model/User';
import { ClientModelApplication } from 'src/app/model/Client';
import { AbstractTypeModelApplication } from 'src/app/model/AbstractType';

@Component({
  selector: 'app-mission-create',
  templateUrl: './mission-create.component.html',
  styleUrls: ['./mission-create.component.scss'],
})
export class MissionCreateComponent implements OnInit {
  public users = [];
  durationInSeconds = 4;
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
    private _snackBar: MatSnackBar,
    private usersService: UsersService,
    private typesServices: TypesService,
    private _adapter: DateAdapter<any>
  ) {
    this._adapter.setLocale('fr');
    this._adapter.getFirstDayOfWeek = () => {
      return 1;
    };
  }

  openSnackBar(message): void {
    this._snackBar.open(message, '', {
      duration: this.durationInSeconds * 1000,
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadTypes();
    this.loadClients();
  }

  loadUsers(): void {
    this.users = [];
    this.usersService
      .getData()
      .then(({ data }: { count: number; data: UserModelApplication[] }) => {
        this.AllUsers = data;
      });
  }

  loadTypes(): void {
    this.types = [];
    this.typesServices
      .getData()
      .then(
        ({ data }: { count: number; data: AbstractTypeModelApplication[] }) =>
          (this.types = data)
      );
  }

  loadClients(): void {
    this.clients = [];
    this.clientServices
      .getData()
      .then(({ data }: { count: number; data: ClientModelApplication[] }) => {
        this.clients = data;
      });
  }

  onSubmit(form: NgForm): void {
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
      .subscribe(
        () => {
          this.openSnackBar('Vuln added');
          this.router.navigateByUrl(MissionRouter.redirectToList());
        },
        (err) => {
          if (err.status === 400) {
            this.openSnackBar('Error : ' + err.error['hydra:description']);
          }
        }
      );
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
  }
}
