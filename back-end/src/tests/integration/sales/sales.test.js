const sinon = require('sinon');
const chai = require('chai');
const jwt = require('jsonwebtoken');
const chaiHttp = require('chai-http');

const { Sale } = require('../../../database/models');
const app = require('../../../api/app');

const { allFakeSales } = require('../mocks/salesMocks');
const { customer01, customer01ResolvedToken } = require('../mocks/userMocks');

chai.use(chaiHttp);

const { expect } = chai;

describe('/sales route integration tests', async function () {
  afterEach(sinon.restore);

  it('should return all the sales from a specific sellers in db', async function() {
    sinon.stub(Sale, 'findAll').resolves(allFakeSales);
    sinon.stub(jwt, 'verify').returns(customer01ResolvedToken);

    const chaiHttpResponse = await chai.request(app).get('/sales')
    .set('Authorization', customer01.token);

    expect(chaiHttpResponse.status).to.be.equal(201);
    expect(chaiHttpResponse.body).to.be.deep.equal(allFakeSales);
  });
});
