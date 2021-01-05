import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Token } from 'src/app/storage/Token';
import { Locale } from 'src/app/storage/Locale';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;
  public hide = true;
  private _options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  submit() {
    const formData: FormData = new FormData();
    formData.append('username', this.username);
    formData.append('password', this.password);

    const object = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });

    const json = JSON.stringify(object);

    this.http
      .post(`${environment.HOST}/authentication_token`, json, this._options)
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
