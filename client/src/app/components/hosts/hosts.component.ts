import { Component, OnInit } from '@angular/core';
import {HostsService} from "../../services/hosts.service";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";

@Component({
  selector: 'app-hosts',
  templateUrl: './hosts.component.html',
  styleUrls: ['./hosts.component.css']
})
export class HostsComponent implements OnInit {
  public hosts = [];
  public displayedColumns = ['id', 'name','technology',  'edit', 'delete'];
  public dataSource: MatTableDataSource<any>;

  constructor(private hostService: HostsService, private router: Router) {  this.dataSource = new MatTableDataSource();}

  ngOnInit(): void {
    this.loadHosts();
  }

  loadHosts(): void {
    this.hostService.getData().subscribe( el => {
      this.dataSource.data = el['hydra:member'].map(host => host);
      console.log(this.dataSource.data);
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  editHost(id){
    this.router.navigate(['/hosts/edit/', id]);
  }

  deleteHost(id){
    if(confirm("Are you sure to delete ")) {
      this.hostService.delete(id).subscribe( () => { this.ngOnInit()});
    }
  }
}
