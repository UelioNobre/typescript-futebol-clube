import { Request, Response, NextFunction } from 'express';
import MatchModel from '../models/MatchModel';
import UnprocessableContentException from '../errors/unprocessable.error';
import NotFoundErrorException from '../errors/notFound.error';

export default class MatchesMiddleware {
  static isTheSame(req: Request, _res: Response, next: NextFunction) {
    const { homeTeamId, awayTeamId } = req.body;

    if (+homeTeamId === +awayTeamId) {
      const errorMessage = 'It is not possible to create a match with two equal teams';
      throw new UnprocessableContentException(errorMessage);
    }

    next();
  }

  static async isTeamExists(req: Request, _res: Response, next: NextFunction) {
    const { homeTeamId, awayTeamId } = req.body;

    try {
      const matchModel = new MatchModel();
      await matchModel.findOne(homeTeamId);
      await matchModel.findOne(awayTeamId);

      next();
    } catch (error) {
      throw new NotFoundErrorException('There is no team with such id!');
    }
  }
}
