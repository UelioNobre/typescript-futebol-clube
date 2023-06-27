import MatchModel from '../models/MatchModel';

export default class MatchesServices {
  public static async listByProgress(progress: boolean) {
    const matchModel = new MatchModel();
    const matches = await matchModel.findByProgress(progress);
    return matches;
  }
}
