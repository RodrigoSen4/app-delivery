const sinon = require('sinon');
const chai = require('chai');
const jwt = require('jsonwebtoken');
const chaiHttp = require('chai-http');

const { User } = require('../../../database/models');
const app = require('../../../api/app');

const { fakeNewUser, fakeNewUserFromController, fakeNewUserFromDb } = require('../mocks/registerMocks');

chai.use(chaiHttp);

const { expect } = chai;

describe('/register route integration tests', async function () {
  afterEach(sinon.restore);

  it('should thrown an error if the email is invalid', async function() {
    const chaiHttpResponse = await chai.request(app).post('/register').send({
      ...fakeNewUser,
      email: 'invalidMail',
    });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.equal('Must be a valid email');
  });

  it('should thrown an error if the name is invalid', async function() {
    const chaiHttpResponse = await chai.request(app).post('/register').send({
      ...fakeNewUser,
      name: 'usr',
    });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.equal('Name length must be at least 12 characters long');
  });

  it('should thrown an error if the password is invalid', async function() {
    const chaiHttpResponse = await chai.request(app).post('/register').send({
      ...fakeNewUser,
      password: '12',
    });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.equal('Password length must be at least 6 characters long');
  });

  it('should thrown an error if the email exists in the db', async function() {
    sinon.stub(User, 'findOne').resolves(fakeNewUserFromDb);

    const chaiHttpResponse = await chai.request(app).post('/register').send({
      email: fakeNewUser.email,
      name: 'new--user--03',
      password: 'newUser12345'
    });

    expect(chaiHttpResponse.status).to.be.equal(409);
    expect(chaiHttpResponse.body).to.be.equal('User already registered');
  });

  it('should thrown an error if the name exists in the db', async function() {
    sinon.stub(User, 'findOne').resolves(fakeNewUserFromDb);

    const chaiHttpResponse = await chai.request(app).post('/register').send({
      email: 'user03@email.com',
      name: fakeNewUser.name,
      password: 'newUser12345'
    });

    expect(chaiHttpResponse.status).to.be.equal(409);
    expect(chaiHttpResponse.body).to.be.equal('User already registered');
  });

  it('should be able to register a new client and return the user\'s info', async function() {
    sinon.stub(User, 'findOne').resolves(undefined);
    sinon.stub(User, 'create').resolves(fakeNewUserFromDb)
    sinon.stub(jwt, 'sign').returns(fakeNewUserFromController.token);

    const chaiHttpResponse = await chai.request(app).post('/register').send(fakeNewUser);

    expect(chaiHttpResponse.status).to.be.equal(201);
    expect(chaiHttpResponse.body).to.be.deep.equal(fakeNewUserFromController);
  });
});
