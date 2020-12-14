import { Component,OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username:string;
  public password:string;
  public hide = true;
  private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  submit() {
    let formData: FormData = new FormData();
    formData.append('username', this.username);
    formData.append('password', this.password);

    var object = {};
    formData.forEach(function(value, key){
      object[key] = value;
    });

    var json = JSON.stringify(object);

    let header= new Headers({'Content-Type': 'application/json'});

    this.http.post(`${environment.HOST}/authentication_token`, json, this._options).subscribe(response => {
      if (response['token']!=="") {
        var token = response['token'];
        localStorage.setItem('token', token);
        console.log(token)
        this.router.navigateByUrl('/missions');
      }
    });
  }

}
