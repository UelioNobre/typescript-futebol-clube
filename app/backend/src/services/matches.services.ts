import MatchModel from '../models/MatchModel';

export default class MatchesServices {
  public static async listByProgress(progress: boolean) {
    const matchModel = new MatchModel();
    const matches = await matchModel.findByProgress(progress);
    return matches;
  }

  public static async finishMatch(id: number): Promise<void> {
    const matchModel = new MatchModel();
    await matchModel.finish(id);
  }
}
