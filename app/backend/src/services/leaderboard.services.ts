import { MatchQueryInterface } from '../Interfaces/IMatches';
import { IPerformance, IUpdatePerfInfo } from '../Interfaces/IPerformace';

export default class LeaderboardServices {
  public static generalLeaderboard(matches: MatchQueryInterface[]): IPerformance[] {
    const initialValue: IPerformance[] = [];

    const leaderboard = matches.reduce((acc, match) => {
      const { homeTeam: { teamName: homeT }, awayTeam: { teamName: awayT } } = match;
      const { awayTeamGoals: awayGoals, homeTeamGoals: homeGoals } = match;
      const infoOne: IUpdatePerfInfo = { name: homeT, goalsFavor: homeGoals, goalsOwn: awayGoals };
      const firstUpdatedLeaderboard = LeaderboardServices.updateLeaderboard(infoOne, acc);
      const infoTwo: IUpdatePerfInfo = { name: awayT, goalsFavor: awayGoals, goalsOwn: homeGoals };
      const secondUpdatedLeaderboard = LeaderboardServices
        .updateLeaderboard(infoTwo, firstUpdatedLeaderboard);
      return secondUpdatedLeaderboard;
    }, initialValue);

    return leaderboard;
  }

  public static awayLeaderboard(matches: MatchQueryInterface[]): IPerformance[] {
    const initialValue: IPerformance[] = [];

    const leaderboard = matches.reduce((acc, match) => {
      const { awayTeam: { teamName: name } } = match;
      const { awayTeamGoals: goalsFavor, homeTeamGoals: goalsOwn } = match;
      const perfInfo: IUpdatePerfInfo = { name, goalsFavor, goalsOwn };
      const updatedLeaderboard = LeaderboardServices.updateLeaderboard(perfInfo, acc);
      return updatedLeaderboard;
    }, initialValue);

    return leaderboard;
  }

  public static homeLeaderboard(matches: MatchQueryInterface[]): IPerformance[] {
    const initialValue: IPerformance[] = [];

    const leaderboard = matches.reduce((acc, match) => {
      const { homeTeam: { teamName: name } } = match;
      const { homeTeamGoals: goalsFavor, awayTeamGoals: goalsOwn } = match;
      const perfInfo: IUpdatePerfInfo = { name, goalsFavor, goalsOwn };
      const updatedLeaderboard = LeaderboardServices.updateLeaderboard(perfInfo, acc);
      return updatedLeaderboard;
    }, initialValue);

    return leaderboard;
  }

  private static performanceBoard(name: string): IPerformance {
    const performance: IPerformance = {
      name,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: '0',
    };

    return performance;
  }

  private static calculatePoints(goalsFavor: number, goalsOwn: number): number {
    if (goalsFavor < goalsOwn) return 0;
    if (goalsFavor === goalsOwn) return 1;
    return 3;
  }

  private static updateInfo(perfInfo: IUpdatePerfInfo, performance: IPerformance): IPerformance {
    const { name, goalsFavor, goalsOwn } = perfInfo;
    const points = LeaderboardServices.calculatePoints(goalsFavor, goalsOwn);

    const updatedPerformance: IPerformance = {
      name,
      totalPoints: performance.totalPoints + points,
      totalGames: performance.totalGames + 1,
      totalVictories: performance.totalVictories + Number(goalsFavor > goalsOwn),
      totalDraws: performance.totalDraws + Number(goalsFavor === goalsOwn),
      totalLosses: performance.totalLosses + Number(goalsFavor < goalsOwn),
      goalsFavor: performance.goalsFavor + goalsFavor,
      goalsOwn: performance.goalsOwn + goalsOwn,
      goalsBalance: performance.goalsBalance + goalsFavor - goalsOwn,
      efficiency: performance.efficiency,
    };

    const { totalPoints, totalGames } = updatedPerformance;
    updatedPerformance.efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
    return updatedPerformance;
  }

  public static updateLeaderboard(perfInfo: IUpdatePerfInfo, acc: IPerformance[]) {
    if (!acc.some((performance) => performance.name === perfInfo.name)) {
      acc[acc.length] = LeaderboardServices.performanceBoard(perfInfo.name);
    }
    const currentIndex = acc.findIndex((performance) => performance.name === perfInfo.name);
    acc[currentIndex] = LeaderboardServices.updateInfo(perfInfo, acc[currentIndex]);
    return acc;
  }

  public static sortLeaderboard(perfA: IPerformance, perfB: IPerformance): number {
    if (perfA.totalPoints > perfB.totalPoints) return -1;
    if (perfA.totalPoints < perfB.totalPoints) return 1;
    if (perfA.totalVictories > perfB.totalVictories) return -1;
    if (perfA.totalVictories < perfB.totalVictories) return 1;
    if (perfA.goalsBalance > perfB.goalsBalance) return -1;
    if (perfA.goalsBalance < perfB.goalsBalance) return 1;
    if (perfA.goalsFavor > perfB.goalsFavor) return -1;
    if (perfA.goalsFavor < perfB.goalsFavor) return 1;
    return 0;
  }
}
