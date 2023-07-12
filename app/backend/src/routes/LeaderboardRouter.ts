import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const LeaderboardRouter = Router();

LeaderboardRouter.get(
  '/',
  LeaderboardController.leaderboard,
);

LeaderboardRouter.get(
  '/home',
  LeaderboardController.home,
);

LeaderboardRouter.get(
  '/away',
  LeaderboardController.away,
);

export default LeaderboardRouter;
