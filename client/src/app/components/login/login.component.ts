import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from 'src/app/storage/Token';
import { Locale } from 'src/app/storage/Locale';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;
  public hide = true;

  constructor(
    private connectionService: ConnectionService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  submit() {
    this.connectionService
      .login({ username: this.username, password: this.password })
      .subscribe(({ token }: { token?: string }) => {
        if (token) {
          new Token().set(token);
          const userLang = navigator.language;
          new Locale().set(userLang.slice(0, 2));
          this.router.navigateByUrl('/missions');
        }
      });
  }
}
