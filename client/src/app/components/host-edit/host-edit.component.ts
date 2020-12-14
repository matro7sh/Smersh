import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HostsService} from "../../services/hosts.service";
import {NgForm} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-host-edit',
  templateUrl: './host-edit.component.html',
  styleUrls: ['./host-edit.component.css']
})
export class HostEditComponent implements OnInit {
  public id: any;
  public host = [];
  public technology: any;
  durationInSeconds = 4;
  public name: any;

  constructor( private router: Router, private hostService: HostsService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    var url = this.router.url;
    var id = url.split('/').pop();
    this.id = id;
    this.loadUser(id);
  }

  loadUser(id){
    this.hostService.getDataById(id).subscribe(response => {
      this.host = response;
      this.name = response.name;
      this.technology = response.technology;
      this.id = response.id;
      console.log(this.host);
    });
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.hostService.update(this.id, form.value).subscribe(() => {
      this.openSnackBar(" Host updated");
      this.router.navigateByUrl('/hosts/all');
    });

  }

  openSnackBar(message) {
    this._snackBar.open(message,'', { duration: this.durationInSeconds * 1000});
  }


}
