import { Router } from 'express';
import TeamController from '../controllers/teams.controller';

const TeamsRouter = Router();

TeamsRouter.get('/', TeamController.findAll);
TeamsRouter.get('/:id', TeamController.findById);

export default TeamsRouter;
