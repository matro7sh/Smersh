import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ImpactsService } from '../../services/impacts.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-impact-create',
  templateUrl: './impact-create.component.html',
  styleUrls: ['./impact-create.component.css'],
})
export class ImpactCreateComponent implements OnInit {
  durationInSeconds = 4;

  constructor(
    private _snackBar: MatSnackBar,
    private impactService: ImpactsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  openSnackBar(message) {
    this._snackBar.open(message, '', {
      duration: this.durationInSeconds * 1000,
    });
  }

  onSubmit(form: NgForm) {
    this.impactService.insert(form.value).subscribe(
      (res) => {
        console.log(res);
        this.openSnackBar('Impact created');
        this.router.navigateByUrl('/impacts/all');
      },
      (err) => {
        this.openSnackBar('Error : ' + err.error['hydra:description']);
      }
    );
  }
}
