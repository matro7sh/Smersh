import { Component, OnInit } from '@angular/core';
import { NegativePointsService } from '../../services/negative.service';
import { PositivePointsService } from '../../services/positive.service';

@Component({
  selector: 'app-conclusion',
  templateUrl: './conclusion.component.html',
  styleUrls: ['./conclusion.component.css'],
})
export class ConclusionComponent implements OnInit {
  public positivePoints = [];
  public negativePoints = [];

  constructor(
    private negativePointsService: NegativePointsService,
    private positivePointsServices: PositivePointsService
  ) {}

  ngOnInit(): void {
    this.loadPositive();
    this.loadNegative();
  }

  loadPositive(): void {
    this.positivePointsServices.getData().subscribe((el) => {
      this.positivePoints = el['hydra:member'];
      console.log(this.positivePoints);
    });
  }

  loadNegative(): void {
    this.negativePointsService.getData().subscribe((el) => {
      this.negativePoints = el['hydra:member'];
      console.log(this.negativePoints);
    });
  }
}
