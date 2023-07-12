import { Response, Request } from 'express';
import MatchesServices from '../services/matches.services';
import { MatchQueryInterface } from '../Interfaces/IMatches';
import LeaderboardServices from '../services/leaderboard.services';

export default class LeaderboardController {
  public static async leaderboard(_req: Request, res: Response) {
    const matches = await MatchesServices.listByProgress(false) as unknown as MatchQueryInterface[];
    const generalLeaderboard = LeaderboardServices.generalLeaderboard(matches);
    const sortedGeneralLeaderboard = generalLeaderboard.sort(LeaderboardServices.sortLeaderboard);
    return res.json(sortedGeneralLeaderboard);
  }

  public static async home(req: Request, res: Response) {
    const matches = await MatchesServices.listByProgress(false) as unknown as MatchQueryInterface[];
    const homeLeaderboard = LeaderboardServices.homeLeaderboard(matches);
    const sortedHomeLeaderboard = homeLeaderboard.sort(LeaderboardServices.sortLeaderboard);
    res.json(sortedHomeLeaderboard);
  }

  public static async away(_req: Request, res: Response) {
    const matches = await MatchesServices.listByProgress(false) as unknown as MatchQueryInterface[];
    const awayLeaderboard = LeaderboardServices.awayLeaderboard(matches);
    const sortedAwayLeaderboard = awayLeaderboard.sort(LeaderboardServices.sortLeaderboard);
    return res.json(sortedAwayLeaderboard);
  }
}
