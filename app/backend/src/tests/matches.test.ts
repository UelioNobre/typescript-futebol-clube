import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');
import * as chaiAsPromised from 'chai-as-promised';

chai.use(chaiHttp);
chai.use(chaiAsPromised);
const { expect } = chai;

import { app } from '../app';
import { mockMatches } from './mocks/matches.mock';
import MatchesServices from '../services/matches.services';
import MatchModel from '../models/MatchModel';

// import { Response } from 'superagent';
// import TeamsModel from '../models/TeamsModel';
// import ITeams from '../Interfaces/ITeams';
// import { mockTeam, mockTeams } from './mocks/team.mock';



afterEach(() => { sinon.restore(); });

describe('Matches', () => {
  describe("GET /", async () => {
    // it("Deve retornar uma lista de matches", async () => {

    //   sinon.stub(MatchModel.prototype, 'findAll').resolves(mockMatches as any);

    //   const response = await chai.request(app).get('/matches');

    //   expect(response.status).to.be.equal(200);
    //   expect(response.body).to.be.deep.equal(mockMatches);
    // })
  })
})