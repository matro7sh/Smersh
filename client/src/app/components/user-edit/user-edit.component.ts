import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  public user = [];
  public id: any;
  public username: any;

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    const url = this.router.url;
    const id = url.split('/').pop();
    this.id = id;
    this.loadUser(id);
  }

  loadUser(id) {
    this.usersService.getDataById(id).subscribe((response) => {
      console.log(response);
      this.user = response;
      this.username = response.username;
      this.id = response.id;
    });
  }

  onSubmit(form: NgForm) {
    this.usersService.update(this.id, form.value).subscribe(() => {
      this.router.navigateByUrl('/users');
    });
  }
}
