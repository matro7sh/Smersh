import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ImpactsService } from '../../services/impacts.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-impact-edit',
  templateUrl: './impact-edit.component.html',
  styleUrls: ['./impact-edit.component.css'],
})
export class ImpactEditComponent implements OnInit {
  public id: any;
  public impact = [];
  durationInSeconds = 4;
  public name: any;

  constructor(
    private impactService: ImpactsService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const url = this.router.url;
    const id = url.split('/').pop();
    this.id = id;
    this.loadImpact(id);
  }

  loadImpact(id) {
    this.impactService.getDataById(id).subscribe((response) => {
      this.impact = response;
      this.name = response.name;
      this.id = response.id;
    });
  }

  onSubmit(form: NgForm) {
    this.impactService.update(this.id, form.value).subscribe(() => {
      this.openSnackBar(' Impact updated');
      this.router.navigateByUrl('/impacts/all');
    });
  }

  openSnackBar(message) {
    this._snackBar.open(message, '', {
      duration: this.durationInSeconds * 1000,
    });
  }
}
