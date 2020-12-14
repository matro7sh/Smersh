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


  constructor(private vulnsService: VulnsService, private router: Router) { }

  ngOnInit(): void {
    var url = this.router.url;
    var id = url.split('/').pop();
    this.id = id;
    this.loadVuln(id);
  }

  loadVuln(id): void {
    this.vulnsService.getDataById(this.id).subscribe(vuln => {
      this.name = vuln.name;
      this.description = vuln.description;
      this.remediation = vuln.remediation;

    });
  }

  onSubmit(form: NgForm) {
    this.vulnsService.update(this.id, form.value).subscribe(() => {
      this.router.navigateByUrl('/vulnerabilities/all');
    });
  }

}
