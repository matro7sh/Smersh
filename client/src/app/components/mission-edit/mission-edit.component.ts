import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {MissionsService} from "../../services/missions.service";
import {Router} from "@angular/router";
import {UsersService} from "../../services/users.service";
import {TypesService} from "../../services/types.service";

@Component({
  selector: 'app-mission-edit',
  templateUrl: './mission-edit.component.html',
  styleUrls: ['./mission-edit.component.css']
})
export class MissionEditComponent implements OnInit {
  public users = [];
  public  allUsers: any;
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

  nmapChecked: any ;
  nessusChecked: any ;




  constructor(private missionService: MissionsService, private router: Router, private usersService: UsersService, private typesServices: TypesService ) {
    this.missionForm = new FormGroup({
      nmap: new FormControl(false, Validators.required),
      type: new FormControl(false, Validators.required),
      nessus: new FormControl(false, Validators.required)
    });

  }

  ngOnInit(): void {
    var url = this.router.url;
    var id = url.split('/').pop();
    this.loadUsers();
    this.loadMissions(id);
    this.loadTypes();
  }


  loadUsers():void{
    this.allUsers = [];
    this.usersService.getData().subscribe(res => {
      this.allUsers = res['hydra:member'];
  //    console.log("Get all users",this.allUsers);
    });
  }


  loadMissions(id): void {
    this.mission = [];
    this.missionService.getDataById(id)
        .subscribe(events => {
          console.log(events);
          this.mission = events;
       //   console.log(events);
          this.users = events['users'];
          this.hosts = events['hosts'];
          this.selected_type = events.missionType;
       //   console.log(this.selected_type);
          this.nmapChecked = events.nmap;

          this.selected_type = this.mission.missionType['@id'];
          console.log("CURRENT MISSON TYPE => ", this.mission.missionType['@id']);

          let id_users = [];
          for(let i in this.users){
            if(this.users.hasOwnProperty(i)){
              id_users.push(this.users[i]["@id"]);
            }
          }
         this.selected = id_users;
          console.log(this.selected);
        });
  }



  loadTypes(){
    this.typesServices.getData().subscribe(el => {
      this.types = el['hydra:member'];
    });
  }

  onSubmit(form: NgForm) {


    Object.assign(form.value, {missionType: this.selectedType});
    Object.assign(form.value, {users: this.selectedUsers});
    Object.assign(form.value, {nmap: this.nmapChecked});
    Object.assign(form.value, {nessus: this.nessusChecked});
    console.log("FORM CONTENT =>", form.value);

   this.missionService.update(this.mission.id, form.value).subscribe(() => {
      this.router.navigateByUrl(`/missions/details/${this.mission.id}`);
    });

  }

  toto(value){
    this.selectedUsers = value;
    console.log("users => ", this.users);
    console.log("u selected theses users : ", value)
  }

  getTypeValue(value) {
    this.selectedType = value;
    console.log("you just selected this type =>  ", value);
  }

  public onSaveUsernameChanged(value:boolean){
    this.nmapChecked = value;
  }

  public onSaveChanged(value:boolean){
    this.nessusChecked = value;
  }



}

