import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MissionsService } from '../../services/missions.service';
import {ActivatedRoute, Router} from '@angular/router';
import { UsersService } from '../../services/users.service';
import { TypesService } from '../../services/types.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {MissionRouter} from "src/app/router/MissionRouter";

@Component({
  selector: 'app-mission-edit',
  templateUrl: './mission-edit.component.html',
  styleUrls: ['./mission-edit.component.css'],
})
export class MissionEditComponent implements OnInit {
  public users = [];
  public allUsers: any;
  durationInSeconds = 4;
  userForm = new FormControl();
  public types = [];
  selected = [];
  selected_type = [];
  selectedType: any;
  public path_to_codi: any;
  selectedUsers: any;
  startDate: any;
  EndDate: any;
  public mission: any;
  public hosts: any;
  public missionForm: FormGroup;
  public id: any;

  nmapChecked: any;
  nessusChecked: any;

  constructor(
    private missionService: MissionsService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private typesServices: TypesService
  ) {
    this.missionForm = new FormGroup({
      nmap: new FormControl(false, Validators.required),
      type: new FormControl(false, Validators.required),
      nessus: new FormControl(false, Validators.required),
    });
  }

  openSnackBar(message) {
    this._snackBar.open(message, '', {
      duration: this.durationInSeconds * 1000,
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.id = id;
      this.loadUsers();
      this.loadMissions(id);
      this.loadTypes();
    });
  }

  loadUsers(): void {
    this.allUsers = [];
    this.usersService.getData().subscribe((res) => {
      this.allUsers = res['hydra:member'];
    });
  }

  loadMissions(id): void {
    this.mission = [];
    this.missionService.getDataById(this.id).subscribe((events) => {
      this.mission = events;
      this.users = events['users'];
      this.hosts = events['hosts'];
      this.selected_type = events.missionType;
      this.nmapChecked = events.nmap;
      this.selected_type = this.mission.missionType['@id'];

      const id_users = [];
      for (const i in this.users) {
        if (this.users.hasOwnProperty(i)) {
          id_users.push(this.users[i]['@id']);
        }
      }
      this.selected = id_users;
    });
  }

  loadTypes() {
    this.typesServices.getData().subscribe((el) => {
      this.types = el['hydra:member'];
    });
  }

  onSubmit(form: NgForm) {
    this.missionService
      .update(this.mission.id, {
        ...form.value,
        missionType: this.selectedType,
        users: this.selectedUsers,
        nmap: this.nmapChecked,
        nessus: this.nessusChecked,
      }).subscribe(
        () => {
          this.openSnackBar('Mission edited');
          this.router.navigateByUrl(MissionRouter.redirectToShow(this.mission.id));
        },
        (err) => {
          if (err.status === 400) {
            this.openSnackBar('Error : ' + err.error['hydra:description']);
          }
        }
    );
  }

  toto(value) {
    this.selectedUsers = value;
  }

  getTypeValue(value) {
    this.selectedType = value;
  }

  public onSaveUsernameChanged(value: boolean) {
    this.nmapChecked = value;
  }

  public onSaveChanged(value: boolean) {
    this.nessusChecked = value;
  }
}
