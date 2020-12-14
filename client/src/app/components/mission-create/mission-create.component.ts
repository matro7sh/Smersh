import { Component, OnInit } from '@angular/core';
import { MissionsService } from "../../services/missions.service";
import {Router} from "@angular/router";
import {UsersService} from "../../services/users.service";
import {FormControl, NgForm} from "@angular/forms";
import {TypesService} from "../../services/types.service";

@Component({
  selector: 'app-mission-create',
  templateUrl: './mission-create.component.html',
  styleUrls: ['./mission-create.component.css']
})
export class MissionCreateComponent implements OnInit {

  public users = [];
  public  AllUsers: any;
  userForm = new FormControl();
  public types = [];
  public mission = [];

  selectedType = [];
  selectedUsers: any;
  startDate:any;
  EndDate:any;


  constructor(private missionService: MissionsService, private router: Router, private usersService: UsersService, private typesServices: TypesService) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadTypes();
  }



  loadUsers(): void {
    this.users= [];
    this.usersService.getData()
        .subscribe(events => {
          this.AllUsers = events['hydra:member'].map(el => el);
          console.log("ALL USERS =>", this.AllUsers);
        });
  }



  loadTypes(): void {
    this.types= [];
    this.typesServices.getData()
        .subscribe(events => {
          this.types = events['hydra:member'].map(el => el);
          console.log("ALL TYPES =>", this.types);
        });
  }

  onSubmit(form: NgForm) {

    Object.assign(form.value, {nmap: false});
    Object.assign(form.value, {missionType: this.selectedType});
    Object.assign(form.value, {users: this.selectedUsers});
    Object.assign(form.value, {nessus: false});
    Object.assign(form.value, {nmapFiler: false});
    Object.assign(form.value, {nessusFiler: false});
    this.missionService.insert(form.value).subscribe(() => {
      this.router.navigateByUrl('/missions');
    });

  }

  getTypeValue(value): void {
    console.log(value);
    this.selectedType = value;
    console.log("you just selected : ", value);
  }

  toto(value): void {
    this.selectedUsers = value;
    console.log("u selected theses users : ", value);
  }





}
