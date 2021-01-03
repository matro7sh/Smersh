import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { DecodedToken, Token } from 'src/app/storage/Token';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Smersh';
  constructor(private http: HttpClient, private router: Router) { }

  protected logged: boolean;
  ngOnInit() {
    // check if valid jwt
    if (Date.now() < new DecodedToken().getDecoded().exp * 1000) {
      this.logged = true;
    } else {
      new Token().reset();
      this.router.navigateByUrl('/login');
    }
  }
}
