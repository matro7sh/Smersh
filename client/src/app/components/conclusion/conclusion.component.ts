import { Component, OnInit } from '@angular/core';
import { NegativePointsService } from 'src/app/services/negative.service';
import { PositivePointsService } from 'src/app/services/positive.service';

@Component({
  selector: 'app-conclusion',
  templateUrl: './conclusion.component.html',
  styleUrls: ['./conclusion.component.scss'],
})
export class ConclusionComponent implements OnInit {
  public positivePoints = [];
  public negativePoints = [];

  constructor(
    private negativePointsService: NegativePointsService,
    private positivePointsServices: PositivePointsService
  ) {}

  ngOnInit(): void {
    Promise.all(
      [this.positivePointsServices, this.negativePointsService].map((action) =>
        action.getData()
      )
    ).then(([positive, negative]) => {
      this.positivePoints = positive;
      this.negativePoints = negative;
    });
  }
}
