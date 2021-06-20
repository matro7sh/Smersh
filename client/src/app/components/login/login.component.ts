import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from 'src/app/storage/Token';
import { Locale } from 'src/app/storage/Locale';
import { ConnectionService } from 'src/app/services/connection.service';
import { DashboardRouter } from 'src/app/router/DashboardRouter';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;
  public hide = true;

  constructor(
    private connectionService: ConnectionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    return;
  }

  submit(): void {
    this.connectionService
      .login({ username: this.username, password: this.password })
      .then(({ token }: any) => {
        if (token) {
          new Token().set(token);
          this.router.navigateByUrl(DashboardRouter.redirectToList());
        }
      });
  }
}
