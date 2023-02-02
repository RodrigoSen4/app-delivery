const sinon = require('sinon');
const chai = require('chai');
const jwt = require('jsonwebtoken');
const chaiHttp = require('chai-http');

const { User } = require('../../../database/models');
const app = require('../../../api/app');

const { allFakeSellers } = require('../mocks/sellerMocks');

chai.use(chaiHttp);

const { expect } = chai;

describe('/sellers route integration tests', async function () {
  afterEach(sinon.restore);

  it('should return all the registered sellers in db', async function() {
    sinon.stub(User, 'findAll').resolves(allFakeSellers);

    const chaiHttpResponse = await chai.request(app).get('/sellers');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(allFakeSellers);
  });
});
