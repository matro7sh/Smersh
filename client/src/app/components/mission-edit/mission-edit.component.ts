import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MissionsService } from '../../services/missions.service';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { TypesService } from '../../services/types.service';

@Component({
  selector: 'app-mission-edit',
  templateUrl: './mission-edit.component.html',
  styleUrls: ['./mission-edit.component.css'],
})
export class MissionEditComponent implements OnInit {
  public users = [];
  public allUsers: any;
  userForm = new FormControl();
  public types = [];
  selected = [];
  selected_type = [];
  selectedType: any;
  selectedUsers: any;
  startDate: any;
  EndDate: any;
  public mission: any;
  public hosts: any;
  public missionForm: FormGroup;

  nmapChecked: any;
  nessusChecked: any;

  constructor(
    private missionService: MissionsService,
    private router: Router,
    private usersService: UsersService,
    private typesServices: TypesService
  ) {
    this.missionForm = new FormGroup({
      nmap: new FormControl(false, Validators.required),
      type: new FormControl(false, Validators.required),
      nessus: new FormControl(false, Validators.required),
    });
  }

  ngOnInit(): void {
    const url = this.router.url;
    const id = url.split('/').pop();
    this.loadUsers();
    this.loadMissions(id);
    this.loadTypes();
  }

  loadUsers(): void {
    this.allUsers = [];
    this.usersService.getData().subscribe((res) => {
      this.allUsers = res['hydra:member'];
    });
  }

  loadMissions(id): void {
    this.mission = [];
    this.missionService.getDataById(id).subscribe((events) => {
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
      })
      .subscribe(() => {
        this.router.navigateByUrl(`/missions/details/${this.mission.id}`);
      });
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
