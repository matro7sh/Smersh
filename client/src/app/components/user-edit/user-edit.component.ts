import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  public user = [];
  public id: any;
  public username: any;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.id = id;
      this.loadUser();
    });
  }

  loadUser(): void {
    this.usersService.getDataById(this.id).subscribe((response) => {
      this.user = response;
      this.username = response.username;
      this.id = response.id;
    });
  }

  onSubmit(form: NgForm): void {
    this.usersService.update(this.id, form.value).subscribe(() => {
      this.router.navigateByUrl('/users');
    });
  }
}
