const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

const { User } = require('../../../database/models');
const app = require('../../../api/app');

const { allAdms } = require('../mocks/adminMocks');


chai.use(chaiHttp);

const { expect } = chai;

describe('/users route integration tests', async function () {
  afterEach(sinon.restore);

  it('should return all the admins in db', async function() {
    sinon.stub(User, 'findAll').resolves(allAdms);

    const chaiHttpResponse = await chai.request(app).get('/users');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(allAdms);
  });
});
