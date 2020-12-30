import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
  public  currentLocal = localStorage.getItem("local");


  constructor(private vulnsService: VulnsService, private router: Router) { }

  ngOnInit(): void {
    var url = this.router.url;
    var id = url.split('/').pop();
    this.id = id;
    this.loadVuln(id);
  }

  loadVuln(id): void {
    this.vulnsService.getDataById(this.id).subscribe(vuln => {
      console.log(vuln)
      if (this.currentLocal === "fr"){
        this.name = vuln['translations']['fr'].name
        this.description = vuln['translations']['fr'].description
        this.remediation = vuln['translations']['fr'].remediation
      }else {
        this.name = vuln['translations']['en'].name;
        this.description = vuln['translations']['en'].description
        this.remediation = vuln['translations']['en'].remediation
      }

    });
  }

  onSubmit(form: NgForm) {
    this.vulnsService.update(this.id, form.value).subscribe(() => {
      this.router.navigateByUrl('/vulnerabilities/all');
    });
  }

}
