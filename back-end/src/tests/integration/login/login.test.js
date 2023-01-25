const sinon = require('sinon');
const chai = require('chai');
const jwt = require('jsonwebtoken');
const chaiHttp = require('chai-http');

const { User } = require('../../../database/models');
const app = require('../../../api/app');

const { fakeUserFromDB, fakeUserFromController } = require('./mocks/loginMocks');

chai.use(chaiHttp);

const { expect } = chai;

describe('/login route integration tests', async function () {
  afterEach(sinon.restore);

  it('should thrown an error if the email is invalid', async function() {
    const chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'invalidMail',
      password: '123456',
    });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.equal('Must be a valid email');
  });

  it('should thrown an error if the password is invalid', async function() {
    const chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'user@email.com',
      password: '12',
    });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.equal('Password length must be at least 6 characters long');
  });

  it('should thrown an error if the email does not exist in the db', async function() {
    sinon.stub(User, 'findOne').resolves(undefined);

    const chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'notFoundPerson@email.com',
      password: '123456789',
    });

    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.be.equal('User not found');
  });

  it('should thrown an error if the passwords do not match', async function() {
    sinon.stub(User, 'findOne').resolves(fakeUserFromDB);

    const chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'user@email.com',
      password: '1234567',
    });

    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.be.equal('User not found');
  });

  it('should be able to do login and return the user\'s info', async function() {
    sinon.stub(User, 'findOne').resolves(fakeUserFromDB);
    sinon.stub(jwt, 'sign').returns('thereisatokenhere');

    const chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'user@email.com',
      password: '123456789',
    });

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(fakeUserFromController);
  });
});
