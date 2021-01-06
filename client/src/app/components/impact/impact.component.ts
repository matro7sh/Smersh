import { Component, OnInit } from '@angular/core';
import { impactsService } from '../../services/impacts.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-impact',
  templateUrl: './impact.component.html',
  styleUrls: ['./impact.component.css'],
})
export class ImpactComponent implements OnInit {
  public impacts = [];
  public displayedColumns = ['id', 'name', 'action'];
  public dataSource: MatTableDataSource<any>;

  constructor(private impactService: impactsService, private router: Router) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.loadImpacts();
  }

  loadImpacts(): void {
    this.impactService.getData().subscribe((el) => {
      this.dataSource.data = el['hydra:member'].map((impact) => impact);
      console.log(this.dataSource.data);
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  editImpact(id) {
    this.router.navigate(['/impacts/edit/', id]);
  }

  createImpact() {
    this.router.navigateByUrl('/impacts/create');
  }
}
