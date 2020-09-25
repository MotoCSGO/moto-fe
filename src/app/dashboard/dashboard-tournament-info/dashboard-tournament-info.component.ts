import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Tournament, TournamentHandle } from '../+state/dashboard.model';
import { SelectOption } from '../../shared/select/select/select.component';

@Component({
  selector: 'app-dashboard-tournament-info',
  template: `
    <div class="container">
      <app-title-label
        [title]="'DASHBOARD.TOURNAMENT' | transloco"
      ></app-title-label>
      <app-select
        *ngIf="!!tournamentsHandles.length"
        [options]="convertToSelectOptions(tournamentsHandles)"
        [initialValue]="tournamentsHandles[0]?.id"
      ></app-select>
    </div>
    <div class="container">
      <app-title-label [title]="'DASHBOARD.START_DATE' | transloco">
      </app-title-label>
      <div *ngIf="currentTournament" class="date">
        {{ currentTournament.startDate }}
      </div>
      <app-spinner *ngIf="!currentTournament"></app-spinner>
    </div>
  `,
  styleUrls: ['./dashboard-tournament-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardTournamentInfoComponent {
  @Input() tournamentsHandles: TournamentHandle[];
  @Input() currentTournament: Tournament;

  convertToSelectOptions(handles: TournamentHandle[]): SelectOption[] {
    return handles.map(handle => ({
      key: handle.id,
      displayValue: handle.name
    }));
  }
}
