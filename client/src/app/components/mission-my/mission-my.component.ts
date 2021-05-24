import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { MissionRouter } from 'src/app/router/MissionRouter';
import { Language, LocaleService } from 'src/app/services/locale.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Locale } from 'src/app/storage/Locale';

@Component({
  selector: 'app-mission-my',
  templateUrl: './mission-my.component.html',
  styleUrls: ['./mission-my.component.scss'],
})
export class MissionMyComponent implements OnInit {
  public missions = [];
  public roles = [];
  public languages = Object.keys(Language).map((lang) => Language[lang]);
  public currentLang: Language = new Locale().get() as Language;

  constructor(
    private usersServices: UsersService,
    private router: Router,
    public localeService: LocaleService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadMissions();
    this.translate.onLangChange.subscribe(
      (event: LangChangeEvent) => (this.currentLang = event.lang as Language)
    );
  }

  loadMissions() {
    const token = localStorage.getItem('token');
    const decode = atob(token.split('.')[1]);
    const id = JSON.parse(decode).user.split('/').pop();
    this.roles = JSON.parse(decode).roles;
    this.usersServices.getDataById(id).subscribe((res) => {
      this.missions = res.missions;
    });
  }

  editMission(id): void {
    this.router.navigateByUrl(MissionRouter.redirectToEdit(id));
  }
}
