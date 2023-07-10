import SequelizeTeams from '../database/models/SequelizeTeams';
import SequelizeMatches from '../database/models/SequelizeMatches';
import NotFoundErrorException from '../errors/notFound.error';

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

  public async finish(id: number) {
    const match = await this.model.findByPk(id);

    if (!match) {
      throw new NotFoundErrorException(`Match with ID ${id} not found`);
    }

    match.inProgress = false;

    await match.save();
  }
}
