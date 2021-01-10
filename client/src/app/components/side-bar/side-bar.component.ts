import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Input, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ConnectionService } from '../../services/connection.service';
import {Locale} from "../../storage/Locale";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  @Input() opened: boolean; // opened or not by default
  mobileQuery: MediaQueryList;
  title = 'Smersh';
  fillerNav = {
    Missions: {
      base: '/missions',
      path: 'all',
    },
    Vulns: {
      base: '/vulnerabilities',
      path: 'all',
    },
    Hosts: {
      base: '/hosts',
      path: 'all',
    },
    User: {
      base: '',
      path: 'users',
    },
    Impacts: {
      base: '/impacts',
      path: 'all',
    },
    Conclusion: {
      base: '/conclusion',
      path: 'generate',
    },
    Clients: {
      base: '/clients',
      path: 'all',
    },
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
    new Locale().set("fr");
  }

  switchToEN(): void {
    new Locale().set("en");
  }


  logout() {
    this.connection.logout();
  }
}
