import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import {UserRouter} from "src/app/router/UserRouter";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent implements OnInit {
  durationInSeconds = 4;

  constructor(
    private _snackBar: MatSnackBar,
    private usersService: UsersService,
    private router: Router
  ) {}

  openSnackBar() {
    this._snackBar.open('user created', '', {
      duration: this.durationInSeconds * 1000,
    });
  }

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.usersService
      .insert({ ...form.value, checked: 'true' })
      .subscribe(() => {
        this.openSnackBar();
        this.router.navigateByUrl(UserRouter.redirectToList());
      });
  }
}
