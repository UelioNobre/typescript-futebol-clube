import { ID } from '../Interfaces';
import TeamsModel from '../models/TeamsModel';

export default class TeamService {
  public static async findAll() {
    const teamsModel = new TeamsModel();
    const teams = await teamsModel.findAll();
    return teams;
  }

  public static async findById(id: ID) {
    const teamsModel = new TeamsModel();
    const team = await teamsModel.findById(id);
    return team;
  }
}
