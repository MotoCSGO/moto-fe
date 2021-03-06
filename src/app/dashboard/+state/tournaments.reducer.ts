import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { head } from 'lodash';
import { DashboardActions } from './dashboard.actions';
import { Tournament, TournamentHandle } from './dashboard.model';

export const TOURNAMENTS_FEATURE_KEY = 'tournaments';

export const adapter: EntityAdapter<Tournament> = createEntityAdapter<
  Tournament
>({
  selectId: (tournament: Tournament) => tournament.id
});

export interface TournamentsState extends EntityState<Tournament> {
  tournamentsHandles: TournamentHandle[];
  areTournamentsHandlesLoading: boolean;
  activeTournamentId: number | null;
  currentTournamentId: number | null;
}

export const tournamentsSelectors = {
  ...adapter.getSelectors(),
  selectCurrentTournamentId: (state: TournamentsState) =>
    state.currentTournamentId,
  selectActiveTournamentId: (state: TournamentsState) =>
    state.activeTournamentId,
  selectTournamentHandles: (state: TournamentsState) =>
    state.tournamentsHandles,
  selectAreTournamentsHandlesLoading: (state: TournamentsState) =>
    state.areTournamentsHandlesLoading
};

export const tournamentsInitialState: TournamentsState = adapter.getInitialState(
  {
    tournamentsHandles: [],
    areTournamentsHandlesLoading: true,
    currentTournamentId: null,
    activeTournamentId: null
  }
);

const reducer = createReducer(
  tournamentsInitialState,
  on(DashboardActions.tournamentsHandlesReceived, (state, { tournaments }) => {
    const firstTournament = head(tournaments);
    return {
      ...state,
      tournamentsHandles: tournaments,
      areTournamentsHandlesLoading: false,
      currentTournamentId: firstTournament?.id || null,
      activeTournamentId: firstTournament?.id || null
    };
  }),
  on(DashboardActions.tournamentsHandlesReceivedError, state => {
    return {
      ...state,
      areTournamentsHandlesLoading: false
    };
  }),
  on(DashboardActions.tournamentReceived, (state, { tournament }) =>
    adapter.upsertOne(tournament, state)
  ),
  on(DashboardActions.tournamentChanged, (state, { tournamentId }) => {
    return {
      ...state,
      currentTournamentId: tournamentId
    };
  })
);

export function tournamentReducer(
  state: TournamentsState | undefined,
  action: Action
): TournamentsState {
  return reducer(state, action);
}
