import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ImpactsService } from '../../services/impacts.service';
import { NgForm } from '@angular/forms';
import { ImpactRouter } from 'src/app/router/ImpactRouter';

@Component({
  selector: 'app-impact-create',
  templateUrl: './impact-create.component.html',
  styleUrls: ['./impact-create.component.scss'],
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
        this.openSnackBar('Impact created');
        this.router.navigateByUrl(ImpactRouter.redirectToList());
      },
      (err) => {
        this.openSnackBar('Error : ' + err.error['hydra:description']);
      }
    );
  }
}
