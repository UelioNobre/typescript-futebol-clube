import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import AuthMiddleware from '../middlewares/auth.middleware';
import MatchesMiddleware from '../middlewares/matches.middleware';

const MatchesRouter = Router();

MatchesRouter.get('/', MatchesController.listAll);
MatchesRouter.get('/', MatchesController.listProgress);

MatchesRouter.patch(
  '/:id',
  AuthMiddleware.tokenRequired,
  AuthMiddleware.tokenHasBeenValid,
  MatchesController.updateMatch,
);

MatchesRouter.patch(
  '/:id/finish',
  AuthMiddleware.tokenRequired,
  AuthMiddleware.tokenHasBeenValid,
  MatchesController.finishMatch,
);

MatchesRouter.post(
  '/',
  AuthMiddleware.tokenRequired,
  AuthMiddleware.tokenHasBeenValid,
  MatchesMiddleware.isTheSame,
  MatchesMiddleware.isTeamExists,
  MatchesController.createMatches,
);

export default MatchesRouter;
