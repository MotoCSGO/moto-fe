import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-results-matches',
  template: `
    <app-title-label [title]="'MATCHES.RESULTS' | transloco"></app-title-label>
    <app-hover-border *ngFor="let i of [1, 2, 3, 4]"
      ><app-result-match></app-result-match
    ></app-hover-border>
  `,
  styleUrls: ['./results-matches.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultsMatchesComponent {}
