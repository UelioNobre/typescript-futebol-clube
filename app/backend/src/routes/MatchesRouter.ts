import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';

const MatchesRouter = Router();

MatchesRouter.get('/', MatchesController.listAll);

export default MatchesRouter;
