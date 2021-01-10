import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {ClientsService} from "../../services/clients.service";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  public clients = [];
  public displayedColumns = ['id', 'name', 'firstName', 'lastName', 'phone', 'email', 'edit', 'delete'];
  public dataSource: MatTableDataSource<any>;

  constructor(private clientService: ClientsService, private router: Router) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getData().subscribe((el) => {
      this.dataSource.data = el['hydra:member'].map((client) => client);
      console.log(this.dataSource.data);
    });
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  editClient(id): void {
    this.router.navigate(['/clients/edit/', id]);
  }

  deleteClient(id): void {
    if (confirm('Are you sure to delete ')) {
      this.clientService.delete(id).subscribe(() => {
        this.ngOnInit();
      });
    }
  }

}
