import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('01 Testes da rota "/login"', () => {

  let chaiHttpResponse: Response;

  it('post "/" com sucesso', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      "email": "admin@admin.com",
      "password": "secret_admin"
    })

    expect(chaiHttpResponse.status).to.be.eq(200)
  });

  it('post "/" com sucesso', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      "email": "admin@admin.com",
      "password": "secret_admin"
    })

    expect(chaiHttpResponse.status).to.be.eq(401)
  });

  it('post "/" sem email', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      "password": "secret_admin"
    })

    expect(chaiHttpResponse.status).to.be.eq(401)
  });

  it('post "/" sem senha', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      "email": "admin@admin.com",
    })

    expect(chaiHttpResponse.status).to.be.eq(401)
  });

  it('post "/" sem email e sem senha', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({})

    expect(chaiHttpResponse.status).to.be.eq(401)
  });

  it('post "/" com email errada', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      "email": "webert_richards@admin.com",
      "password": "secret_admin"
    })

    expect(chaiHttpResponse.status).to.be.eq(401)
  });

  it('post "/" com senha errada', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      "email": "admin@admin.com",
      "password": "dili_dole"
    })

    expect(chaiHttpResponse.status).to.be.eq(401)
  });

  it('post "/" com email invalida', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      "email": "admin",
      "password": "secret_admin"
    })

    expect(chaiHttpResponse.status).to.be.eq(401)
  });

  it('post "/" com senha invalida', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      "email": "admin@admin.com",
      "password": "123"
    })

    expect(chaiHttpResponse.status).to.be.eq(401)
  });
});
