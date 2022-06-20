import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('02 Testes da rota "/teams"', () => {

  let chaiHttpResponse: Response;

  it('get "/"', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams');

    expect(chaiHttpResponse.status).to.be.eq(200);
  });

  it('get "/:id"', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams/1');

    expect(chaiHttpResponse.status).to.be.eq(200);
  });

  it('get "/:id" with invalid id', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams/999');

    expect(chaiHttpResponse.status).to.be.eq(404);
  });
});
