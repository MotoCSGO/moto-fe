import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { DashboardActions } from '../+state/dashboard.actions';
import { Tournament, TournamentHandle } from '../+state/dashboard.model';
import { SelectOption } from '../../shared/select/select/select.component';

@Component({
  selector: 'app-dashboard-tournament-info',
  template: `
    <div class="container">
      <app-title-label
        [title]="'DASHBOARD.TOURNAMENT' | transloco"
        [isActive]="isActive"
      ></app-title-label>
      <app-select
        *ngIf="!!tournamentsHandles.length"
        [options]="convertToSelectOptions(tournamentsHandles)"
        [initialValue]="tournamentsHandles[0]?.id"
        (optionSelected)="changeTournament($event)"
      ></app-select>
    </div>
    <div class="container">
      <app-title-label
        [title]="'DASHBOARD.START_DATE' | transloco"
        [isActive]="isActive"
      >
      </app-title-label>
      <div *ngIf="currentTournament" class="date">
        {{ currentTournament.startDate | date }}
      </div>
      <app-spinner *ngIf="!currentTournament" [size]="0.8"></app-spinner>
    </div>
  `,
  styleUrls: ['./dashboard-tournament-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardTournamentInfoComponent {
  @Input() tournamentsHandles: TournamentHandle[];
  @Input() currentTournament: Tournament;
  @Input() isActive: boolean;

  constructor(private store: Store<any>) {}

  convertToSelectOptions(handles: TournamentHandle[]): SelectOption[] {
    return handles.map(handle => ({
      key: handle.id,
      displayValue: handle.name
    }));
  }

  changeTournament(id: number): void {
    this.store.dispatch(
      DashboardActions.tournamentChanged({ tournamentId: id })
    );
  }
}
