const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

const { User } = require('../../../database/models');
const app = require('../../../api/app');

const { allAdms } = require('../mocks/adminMocks');


chai.use(chaiHttp);

const { expect } = chai;

describe('/delete route integration tests', async function () {
  afterEach(sinon.restore);

  it('should be able to delete an user in db', async function() {
    sinon.stub(User, 'destroy').resolves(undefined);

    const chaiHttpResponse = await chai.request(app).delete('/delete')
    .set('id', 2);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal('Deleted');
  });
});