import { Request, Response, Router } from 'express';
import TeamsModel from '../models/TeamsModel';

const TeamsRouter = Router();

TeamsRouter.get('/', async (req: Request, res: Response) => {
  const teamModel = new TeamsModel();

  const teams = await teamModel.findAll();
  return res.json(teams);
});

export default TeamsRouter;
