import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VulnsService } from '../../services/vulns.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { impactsService } from '../../services/impacts.service';

@Component({
  selector: 'app-vulns-create',
  templateUrl: './vulns-create.component.html',
  styleUrls: ['./vulns-create.component.css'],
})
export class VulnsCreateComponent implements OnInit {
  durationInSeconds = 4;
  public impacts = [];
  selectedType = [];
  selected_type = [];

  constructor(
    private vulnsServices: VulnsService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private impactService: impactsService
  ) {}

  ngOnInit(): void {
    this.loadImpact();
  }

  openSnackBar(message) {
    this._snackBar.open(message, '', {
      duration: this.durationInSeconds * 1000,
    });
  }
  loadImpact() {
    this.impactService.getData().subscribe((impacts) => {
      this.impacts = impacts['hydra:member'];
      console.log(this.impacts);
    });
  }

  onSubmit(form: NgForm) {
    this.vulnsServices.insert(form.value).subscribe(
      () => {
        this.openSnackBar('Vuln added');
        this.router.navigateByUrl('/vulnerabilities/all');
      },
      (err) => {
        if (err.status === 400) {
          console.log(err);
          this.openSnackBar('Error : ' + err.error['hydra:description']);
        }
      }
    );
  }
  changeClient(value) {
    this.selectedType = value;
    console.log('you just selected : ', value);
  }
}
