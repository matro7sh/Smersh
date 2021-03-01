import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ConnectionService } from '../../services/connection.service';
import { Locale } from '../../storage/Locale';
import { MissionRouter } from 'src/app/router/MissionRouter';
import { VulnRouter } from 'src/app/router/VulnRouter';
import { HostRouter } from 'src/app/router/HostRouter';
import { UserRouter } from 'src/app/router/UserRouter';
import { ImpactRouter } from 'src/app/router/ImpactRouter';
import { ClientRouter } from 'src/app/router/ClientRouter';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  @Input() opened: boolean; // opened or not by default
  mobileQuery: MediaQueryList;
  title = 'Smersh';
  fillerNav = {
    Missions: MissionRouter.redirectToList(),
    Vulns: VulnRouter.redirectToList(),
    Hosts: HostRouter.redirectToList(),
    User: UserRouter.redirectToList(),
    Impacts: ImpactRouter.redirectToList(),
    Conclusion: '/conclusion/generate',
    Clients: ClientRouter.redirectToList(),
    // "Type":"types",
  };
  public username: '';
  public version = `${environment.version}`;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private connection: ConnectionService,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const decode = atob(token.split('.')[1]);
    this.username = JSON.parse(decode).username;
  }

  switchToFR(): void {
    new Locale().set('fr');
  }

  switchToEN(): void {
    new Locale().set('en');
  }

  logout() {
    this.connection.logout();
  }
}
