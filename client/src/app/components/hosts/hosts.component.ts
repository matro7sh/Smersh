import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HostsService } from 'src/app/services/hosts.service';

@Component({
  selector: 'app-hosts',
  templateUrl: './hosts.component.html',
  styleUrls: ['./hosts.component.css'],
})
export class HostsComponent implements OnInit {
  public hosts = [];
  public displayedColumns = ['id', 'name', 'technology', 'edit', 'delete'];
  public dataSource: MatTableDataSource<any>;

  constructor(private hostService: HostsService, private router: Router) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.loadHosts();
  }

  loadHosts(): void {
    this.hostService.getData().subscribe((el) => {
      this.dataSource.data = el['hydra:member'].map((host) => host);
    });
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  editHost(id): void {
    this.router.navigate(['/hosts/edit/', id]);
  }

  deleteHost(id): void {
    if (confirm('Are you sure to delete ')) {
      this.hostService.delete(id).subscribe(() => {
        this.ngOnInit();
      });
    }
  }
}
