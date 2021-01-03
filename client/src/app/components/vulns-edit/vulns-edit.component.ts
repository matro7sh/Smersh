import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { VulnsService } from 'src/app/services/vulns.service';

@Component({
  selector: 'app-vulns-edit',
  templateUrl: './vulns-edit.component.html',
  styleUrls: ['./vulns-edit.component.css']
})
export class VulnsEditComponent implements OnInit {
  public id: any;
  public name: any;
  public description: any;
  public remediation: any;
  public currentLocal = localStorage.getItem("local");
  public local;


  constructor(private vulnsService: VulnsService, private router: Router, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params.id;
    this.local = this.route.snapshot.params.local;
  }

  ngOnInit(): void {
    this.loadVuln(this.id);
  }

  loadVuln(id): void {
    this.vulnsService.getDataById(this.id).subscribe(vuln => {

      if (this.currentLocal === "fr"){
        this.name = vuln['translations']['fr'].name
        this.description = vuln['translations']['fr'].description
        this.remediation = vuln['translations']['fr'].remediation
      }else {
        this.name = vuln['translations']['en'].name;
        this.description = vuln['translations']['fr'].description
        this.remediation = vuln['translations']['en'].remediation
      }

    });
  }

  onSubmit(form: NgForm) {

    Object.assign(form.value, {currentLocale: this.local });
    Object.assign(form.value, {translations: ['fr'] });
    console.log(form.value);
    this.vulnsService.update(this.id, form.value).subscribe(() => {
      this.router.navigateByUrl('/vulnerabilities/all');
    });
  }

}
