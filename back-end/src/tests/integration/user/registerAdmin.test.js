const sinon = require('sinon');
const chai = require('chai');
const jwt = require('jsonwebtoken');
const chaiHttp = require('chai-http');

const { User } = require('../../../database/models');
const app = require('../../../api/app');

const { newFakeAdmin, fakeAdmin, resolvedToken, newFakeAdminFromDb } = require('../mocks/adminMocks');

chai.use(chaiHttp);

const { expect } = chai;

describe('/register/admin route integration tests', async function () {
  afterEach(sinon.restore);

  it('should thrown an error if there was no token', async function() {
    const chaiHttpResponse = await chai.request(app).post('/register/admin').send(newFakeAdmin);

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Token not found' });
  });

  it('should thrown an error if the token is not valid', async function() {
    const chaiHttpResponse = await chai.request(app).post('/register/admin')
    .send(newFakeAdmin)
    .set('Authorization', 'stupidToken');

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Expired or invalid token' });
  });

  it('should thrown an error if the token is not from an admin', async function() {
    sinon.stub(jwt, 'verify').returns({ role: 'customer' });

    const chaiHttpResponse = await chai.request(app).post('/register/admin')
    .send(newFakeAdmin)
    .set('Authorization', 'tokenFromAUserThatIsNotAnAdmin');

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Token is not from an admin' });
  });

  it('should be able to register a new admin', async function() {
    sinon.stub(User, 'findOne').resolves(undefined);
    sinon.stub(User, 'create').resolves(newFakeAdminFromDb);
    sinon.stub(jwt, 'verify').returns(resolvedToken);

    const chaiHttpResponse = await chai.request(app).post('/register/admin')
    .send(newFakeAdmin)
    .set('Authorization', fakeAdmin.token);

    expect(chaiHttpResponse.status).to.be.equal(201);
    expect(chaiHttpResponse.body).to.be.deep.equal({ newUser: newFakeAdminFromDb });
  });
});
