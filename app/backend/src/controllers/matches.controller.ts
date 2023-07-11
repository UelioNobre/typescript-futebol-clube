import { Request, Response } from 'express';
import MatchModel from '../models/MatchModel';
import MatchesServices from '../services/matches.services';

export default class MatchesController {
  public static async listAll(req: Request, res: Response) {
    if (req.query.inProgress) {
      return MatchesController.listProgress(req, res);
    }

    const matchModel = new MatchModel();
    const matches = await matchModel.findAll();

    return res.json(matches);
  }

  public static async listProgress(req: Request, res: Response) {
    const { inProgress } = req.query;
    const progress = inProgress === 'true' || false;

    const matches = await MatchesServices.listByProgress(progress);

    return res.status(200).json(matches);
  }

  public static async finishMatch(req: Request, res: Response) {
    const { params: { id } } = req;

    await MatchesServices.finishMatch(+id);

    res.status(200).json({ message: 'Finished' });
  }

  public static async updateMatch(req: Request, res: Response) {
    const { params: { id } } = req;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    await MatchesServices.updateMatch(+id, +homeTeamGoals, +awayTeamGoals);

    return res.status(200).json({ message: 'Match updated' });
  }

  public static async createMatches(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;

    const matchData = {
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    };

    const matche = await MatchesServices.createMatche(matchData);

    return res.status(201).json(matche);
  }
}
