import SequelizeTeams from '../database/models/SequelizeTeams';
import SequelizeMatches from '../database/models/SequelizeMatches';
import NotFoundErrorException from '../errors/notFound.error';
import { MatchCreationalAtributes } from '../Interfaces/IMatches';

export default class MatchModel {
  private model = SequelizeMatches;

  public async findAll() {
    const matches = await this.model.findAll({
      include: [
        {
          model: SequelizeTeams,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: SequelizeTeams,
          as: 'awayTeam',
          attributes: ['teamName'],
        }],
    });
    return matches;
  }

  public async findByProgress(inProgress: boolean) {
    const matches = await this.model.findAll({
      where: {
        inProgress,
      },
      include: [
        {
          model: SequelizeTeams,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: SequelizeTeams,
          as: 'awayTeam',
          attributes: ['teamName'],
        }],
    });

    return matches;
  }

  public async findOne(id: number) {
    const match = await this.model.findByPk(id);

    if (!match) {
      throw new NotFoundErrorException(`Match with ID ${id} not found`);
    }

    return match;
  }

  public async finish(id: number) {
    const match = await this.findOne(id);

    match.inProgress = false;

    await match.save();
  }

  public async updateMatch(id: number, homeGoals: number, awayGoals: number) {
    let match = null;

    try {
      match = await this.findOne(id);
    } catch (error) {
      throw new NotFoundErrorException('There is no match with such id!');
    }

    match.homeTeamGoals = homeGoals;
    match.awayTeamGoals = awayGoals;

    await match.save();
  }

  public async createMatche(matchData: MatchCreationalAtributes) {
    try {
      await this.findOne(matchData.homeTeamId);
      await this.findOne(matchData.awayTeamId);
    } catch (error) {
      throw new NotFoundErrorException('There is no team with such id!');
    }

    const newMatch = await this.model.create(matchData);

    return newMatch;
  }
}
