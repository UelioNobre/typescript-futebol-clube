import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import AuthMiddleware from '../middlewares/auth.middleware';

const MatchesRouter = Router();

MatchesRouter.get('/', MatchesController.listAll);
MatchesRouter.get('/', MatchesController.listProgress);

MatchesRouter.patch(
  '/:id/finish',
  AuthMiddleware.tokenRequired,
  AuthMiddleware.tokenHasBeenValid,
  MatchesController.finishMatch,
);

MatchesRouter.patch(
  '/:id',
  AuthMiddleware.tokenRequired,
  AuthMiddleware.tokenHasBeenValid,
  MatchesController.finishMatch,
);

export default MatchesRouter;
