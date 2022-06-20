import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('03 Testes da rota "/matches"', () => {

  let chaiHttpResponse: Response;

  it('get "/" com sucesso', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches')

    expect(chaiHttpResponse.status).to.be.eq(200);
  });

  it('patch "/" com sucesso', async () => {
    chaiHttpResponse = await chai.request(app).post('/matches').send({
      "homeTeamGoals": 2,
      "awayTeamGoals": 3,
    })

    expect(chaiHttpResponse.status).to.be.eq(200);
  });

  it('patch "/:id" com id invalido', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches/999').send({
      "awayTeamGoals": 3,
    })

    expect(chaiHttpResponse.status).to.be.eq(400);
  });

  it('patch "/:id" sem homeTeamGoals', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches/1').send({
      "awayTeamGoals": 3,
    })

    expect(chaiHttpResponse.status).to.be.eq(400);
  });

  it('patch "/:id" sem awayTeamGoals', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches/1').send({
      "awayTeamGoals": 3,
    })

    expect(chaiHttpResponse.status).to.be.eq(400);
  });
});
