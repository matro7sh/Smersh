import { Component, OnInit } from '@angular/core';
import {VulnsService} from "../../services/vulns.service";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";

@Component({
  selector: 'app-vulns',
  templateUrl: './vulns.component.html',
  styleUrls: ['./vulns.component.css']
})
export class VulnsComponent implements OnInit {
  public vulns = [];
  public displayedColumns = ['id', 'name', 'remediation', 'description', 'action'];
  public dataSource: MatTableDataSource<any>;
  public  currentLocal = localStorage.getItem("local");

  constructor(private vulnsServices: VulnsService, private router: Router) { this.dataSource = new MatTableDataSource(); }

  ngOnInit(): void {
    this.loadVulns();
  }

  loadVulns(): void {
    this.vulns = [];
    this.vulnsServices.getData()
        .subscribe(events => {
          events['hydra:member'].forEach(el => {
            if (this.currentLocal === "fr"){
              this.vulns.push({ id: el['@id'], name: el['translations']['fr'].name, description: el['translations']['fr'].description, remediation: el['translations']['fr'].remediation });
            } else {
              this.vulns.push({ id: el['@id'], name: el['translations']['en'].name, description: el['translations']['en'].description, remediation: el['translations']['en'].remediation });
            }
          });
          this.dataSource.data = this.vulns;
        });
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  createVuln(): void {
    this.router.navigateByUrl("/vulnerabilities/create");
  }

  deleteVuln(id, name): void {
    if(confirm("Are you sure to delete : " + name + " vulnerability ?")) {
    this.vulnsServices.delete(id).subscribe( (res) => { this.ngOnInit()});
    this.router.navigateByUrl('/vulnerabilities/all');
    }
  }

  editVuln(id): void {
    this.router.navigate(['/vulnerabilities/edit/', id]);
  }


}
