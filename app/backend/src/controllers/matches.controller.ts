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

    return res.json(matches);
  }
}
