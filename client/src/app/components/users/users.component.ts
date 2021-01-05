import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  public users = [];
  public displayedColumns = [
    'id',
    'username',
    'roles',
    'enabled',
    'edit',
    'delete',
  ];
  public dataSource: MatTableDataSource<any>;

  constructor(private usersService: UsersService, private router: Router) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.loadTable();
  }

  loadTable(): void {
    this.users = [];
    this.usersService.getData().subscribe((events) => {
      this.dataSource.data = events['hydra:member'].map((el) => el);
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  createUser() {
    this.router.navigateByUrl('/users/create');
  }

  deleteUser(id) {
    if (confirm('Are you sure to delete ' + name)) {
      this.usersService.delete(id).subscribe(() => {
        this.ngOnInit();
      });
    }
  }

  editUser(id) {
    this.router.navigate(['/users/edit/', id]);
  }
}
