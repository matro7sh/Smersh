import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";


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
    if (localStorage.getItem('token') != null) {
      this.logged = true;
    } else {
      this.router.navigateByUrl('/login')
    }
  }
}
