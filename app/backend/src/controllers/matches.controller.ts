import { Request, Response } from 'express';
import MatchModel from '../models/MatchModel';

export default class MatchesController {
  public static async listAll(req: Request, res: Response) {
    const matchModel = new MatchModel();
    const matches = await matchModel.findAll();

    res.json(matches);
  }
}
