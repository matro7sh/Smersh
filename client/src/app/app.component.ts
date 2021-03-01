import { Component, HostBinding } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DecodedToken, Token } from 'src/app/storage/Token';
import { MatDialog } from '@angular/material/dialog';
import { Theme, ThemeService } from './services/theme.service.ts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Smersh';
  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog, private themeService: ThemeService) { }
  @HostBinding('class') className = Theme.LIGHT_THEME;

  protected logged: boolean;
  ngOnInit() {
    this.themeService.onChangeTheme.subscribe(theme => this.className = theme);

    // check if valid jwt
    if (Date.now() < new DecodedToken().getDecoded().exp * 1000) {
      this.logged = true;
    } else {
      new Token().reset();
      this.router.navigateByUrl('/login');
    }
  }
}
