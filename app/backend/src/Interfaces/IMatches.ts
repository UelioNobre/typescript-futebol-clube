export interface MatchAtributes {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export type MatchCreationalAtributes = Omit<MatchAtributes, 'id' | 'inProgress'>;
