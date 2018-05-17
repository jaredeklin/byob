const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const { app, database } = require('../server');

chai.use(chaiHttp);

describe('Client Routes', () => {

});

describe('API Routes', () => {

  beforeEach(() => {
    return database.seed.run()
  })

  it('should GET all the artists', (done) => {
    chai.request(app)
      .get('/api/v1/artists')
      .end((error, response) => {
        response.should.be.json
        response.should.have.status(200)
        response.body.should.be.an('array')
        response.body.length.should.equal(30)
        done()
      })
  })

  // it('should GET')

});

