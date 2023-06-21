import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');
import * as chaiAsPromised from 'chai-as-promised';

import { app } from '../app';
// import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import TeamsModel from '../models/TeamsModel';
import ITeams from '../Interfaces/ITeams';
import { mockTeam, mockTeams } from './mocks/team.mock';

chai.use(chaiHttp);
chai.use(chaiAsPromised);

const { expect } = chai;

describe('Teams', () => {

  afterEach(() => { sinon.restore(); });

  let chaiHttpResponse: Response;

  describe('GET /teams', () => {
    it('Deve retornar uma lista de times', async () => {
      sinon.stub(TeamsModel.prototype, 'findAll')
        .resolves(mockTeams as ITeams[]);

      chaiHttpResponse = await chai
        .request(app)
        .get('/teams');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.type).to.be.equal('application/json');
      expect(chaiHttpResponse.body).to.be.deep.equal(mockTeams);

    });
  });

  describe('GET /teams/:id', () => {
    it('Deve retornar um time pelo id', async () => {
      sinon.stub(TeamsModel.prototype, 'findById')
        .resolves(mockTeam as ITeams);

      chaiHttpResponse = await chai
        .request(app)
        .get('/teams/1');

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.type).to.be.equal('application/json');
      expect(chaiHttpResponse.body).to.be.deep.equal(mockTeam);

    });
  });
});
