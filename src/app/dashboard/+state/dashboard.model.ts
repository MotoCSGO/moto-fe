import { NgttRound } from 'ng-tournament-tree';

export enum BestOf {
  one = 'ONE',
  three = 'THREE',
  five = 'FIVE'
}

export interface BracketMatch {
  id: number;
  firstTeam: BracketTeam;
  secondTeam: BracketTeam;
  bo: BestOf;
}

export interface BracketTeam {
  id: number;
  name: string;
  score?: number;
}

export interface Tournament {
  id: number;
  name: string;
  startDate: string;
  rounds: NgttRound[];
}

export interface TournamentHandle {
  id: number;
  name: string;
}
