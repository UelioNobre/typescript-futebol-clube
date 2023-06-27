import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';

const MatchesRouter = Router();

MatchesRouter.get('/', MatchesController.listAll);
MatchesRouter.get('/', MatchesController.listProgress);

export default MatchesRouter;
