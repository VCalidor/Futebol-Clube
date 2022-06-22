import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('03 Testes da rota "/leaderboard"', () => {

  let chaiHttpResponse: Response;

  it('get "/" com sucesso', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard')

    expect(chaiHttpResponse.status).to.be.eq(200);
  });

  it('get "/home" com sucesso', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard/home')

    expect(chaiHttpResponse.status).to.be.eq(200);
  });

  it('get "/away" com sucesso', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard/away')

    expect(chaiHttpResponse.status).to.be.eq(200);
  });

});
