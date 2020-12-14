import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import { MissionsService } from '../../services/missions.service';
import {Router} from '@angular/router';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-mission-choice',
  templateUrl: './mission-choice.component.html',
  styleUrls: ['./mission-choice.component.css']
})
export class MissionChoiceComponent implements OnInit {
  public missions = [];
  public displayedColumns = ['id', 'name', 'button'];
  public dataSource: MatTableDataSource<any>;

  constructor(private missionsService: MissionsService, private router: Router) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
      this.loadTable();
  }

  loadTable(): void {
    this.missions= [];
    this.missionsService.getData()
        .subscribe(events => {
          events['hydra:member'].forEach(el => {
            this.missions.push({ name: el['name'], id: el['id'] })
          });
          this.dataSource.data = this.missions;
        });

  }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

  showMission(id): void {
      this.router.navigate(['/missions/details', id]);
    }

    deleteMission(id, name): void {
      if(confirm("Are you sure to delete "+name)) {
        this.missionsService.delete(id).subscribe( (res) => { this.ngOnInit() });
        this.router.navigateByUrl('/missions/dashboard');
      }
    }

    editMission(id): void {
      this.router.navigate(['/missions/edit/', id]);
    }

    createMission(){
        this.router.navigateByUrl('/missions/create');
    }

}
