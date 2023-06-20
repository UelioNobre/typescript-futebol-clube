import SequelizeTeams from '../database/models/SequelizeTeams';
import ITeams from '../Interfaces/ITeams';
import { ITeamsModel } from '../Interfaces/ITeamsModel';

export default class TeamsModel implements ITeamsModel {
  private model = SequelizeTeams;

  async findAll(): Promise<ITeams[]> {
    const teamsRaw = await this.model.findAll();
    const teams = teamsRaw.map(({ id, teamName }) => ({ id, teamName }));
    return teams;
  }

  async findById(id: number): Promise<ITeams> {
    const team = await this.model.findByPk(id);

    if (!id) throw new Error('TEAM NOT FOUND');

    return team as ITeams;
  }
}
