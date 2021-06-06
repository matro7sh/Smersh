import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { MissionRouter } from 'src/app/router/MissionRouter';
import { Locale } from 'src/app/storage/Locale';

@Component({
  selector: 'app-mission-my',
  templateUrl: './mission-my.component.html',
  styleUrls: ['./mission-my.component.scss'],
})
export class MissionMyComponent implements OnInit {
  public missions = [];
  public roles = [];


  constructor(
    private usersServices: UsersService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadMissions();
  }

  loadMissions() {
    const token = localStorage.getItem('token');
    const decode = atob(token.split('.')[1]);
    const id = JSON.parse(decode).user.split('/').pop();
    this.roles = JSON.parse(decode).roles;
    this.usersServices.getDataById(id).subscribe(({ missions }) => {
      this.missions = missions.map(({ hosts, name, id }) => ({
        name,
        current:
          (hosts.filter(({ checked }) => checked).length / hosts.length) * 100,
        id,
      }));
    });
  }

  editMission(id): void {
    this.router.navigateByUrl(MissionRouter.redirectToEdit(id));
  }
}
