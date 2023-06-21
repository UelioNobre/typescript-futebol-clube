import { Response, Request } from 'express';
import TeamService from '../services/teams.service';

export default class TeamController {
  public static async findAll(_req: Request, res: Response) {
    const teams = await TeamService.findAll();
    return res.status(200).json(teams);
  }

  public static async findById(req: Request, res: Response) {
    const team = await TeamService.findById(1);
    return res.status(200).json(team);
  }
}
