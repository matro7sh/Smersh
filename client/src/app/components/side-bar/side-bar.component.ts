import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConnectionService } from '../../services/connection.service';
import { Locale } from '../../storage/Locale';
import { MissionRouter } from 'src/app/router/MissionRouter';
import { VulnRouter } from 'src/app/router/VulnRouter';
import { HostRouter } from 'src/app/router/HostRouter';
import { UserRouter } from 'src/app/router/UserRouter';
import { ImpactRouter } from 'src/app/router/ImpactRouter';
import { ClientRouter } from 'src/app/router/ClientRouter';
import { ThemeService } from 'src/app/services/theme.service';
import { isGranted } from 'src/app/security/isGranted';
import { Language, LocaleService } from 'src/app/services/locale.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  @Input() opened: boolean; // opened or not by default
  mobileQuery: MediaQueryList;
  title = 'Smersh';
  fillerNav: Record<string, string> = {};
  public username: '';
  public version = `${environment.version}`;
  public languages = Object.keys(Language).map((lang) => Language[lang]);
  public currentLang: Language = new Locale().get() as Language;
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private connection: ConnectionService,
    public themeService: ThemeService,
    public localeService: LocaleService,
    private translate: TranslateService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    Object.entries({
      Mission: MissionRouter.redirectToList(),
      Vuln: VulnRouter.redirectToList(),
      Host: HostRouter.redirectToList(),
      User: UserRouter.redirectToList(),
      Impact: ImpactRouter.redirectToList(),
      Client: ClientRouter.redirectToList(),
    })
      .filter(([k]) => isGranted(`ROLE_${k.toUpperCase()}_GET_LIST`))
      .map(([k, v]) => (this.fillerNav[`${k}s`] = v));
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const decode = atob(token.split('.')[1]);
    this.username = JSON.parse(decode).username;

    this.translate.onLangChange.subscribe(
      (event: LangChangeEvent) => (this.currentLang = event.lang as Language)
    );
  }

  logout(): void {
    this.connection.logout();
  }
}
