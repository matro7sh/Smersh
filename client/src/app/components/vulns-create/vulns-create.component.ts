import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VulnsService } from '../../services/vulns.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { impactsService } from '../../services/impacts.service';
import {VulnsTranslationService} from "../../services/vulns-translation.service";
import {Locale} from "../../storage/Locale";
import {TypesService} from "../../services/types.service";
import {VulnTypesService} from "../../services/vuln-types.service";

@Component({
  selector: 'app-vulns-create',
  templateUrl: './vulns-create.component.html',
  styleUrls: ['./vulns-create.component.css'],
})
export class VulnsCreateComponent implements OnInit {
  durationInSeconds = 4;
  public impacts = [];
  selectedType = "";
  selectedImpact = "";
  selected_type = "";
  public types = [];

  constructor(
    private vulnsServices: VulnsService,
    private _snackBar: MatSnackBar,
    private typesService: VulnTypesService,
    private router: Router,
    private impactService: impactsService
  ) {}

  ngOnInit(): void {
    this.loadImpact();
    this.loadTypes();
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

  loadTypes() {
    this.typesService.getData().subscribe((types) => {
      this.types = types['hydra:member'];
      console.log(this.types);
    });
  }

  onSubmit(form: NgForm) {
    // objectintry

    this.vulnsServices.insert({
      translations: [{...form.value, locale: new Locale().get()}],
      vulnType: this.selectedType,
      impact: this.selectedImpact
    }).subscribe(
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

  changeClient2(value) {
    this.selectedImpact = value;
    console.log('you just selected : ', value);
  }
}
