import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { MissionRouter } from 'src/app/router/MissionRouter';
import { UserModelApplication } from 'src/app/model/User';
import { HostFromAPIInterface } from 'src/app/model/Host';

@Component({
  selector: 'app-mission-my',
  templateUrl: './mission-my.component.html',
  styleUrls: ['./mission-my.component.scss'],
})
export class MissionMyComponent implements OnInit {
  public missions = [];
  public roles = [];

  constructor(private usersServices: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.loadMissions();
  }

  loadMissions(): void {
    const token = localStorage.getItem('token');
    const decode = atob(token.split('.')[1]);
    const jwt = JSON.parse(decode);
    this.roles = jwt.roles;
    this.usersServices
      .getDataById(jwt.user.split('/').pop())
      .then(({ missions }: UserModelApplication) => {
        this.missions = missions.map(({ id, hosts, name }) => ({
          name,
          current:
            ((hosts as HostFromAPIInterface[]).filter(({ checked }) => checked)
              .length /
              hosts.length) *
            100,
          id,
        }));
      });
  }

  editMission(id): void {
    this.router.navigateByUrl(MissionRouter.redirectToEdit(id));
  }
}
