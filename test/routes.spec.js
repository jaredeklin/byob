const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const { app, database } = require('../server');

chai.use(chaiHttp);

describe('client routes', () => {
  it('should return the homepage', (done) => {
    chai.request(app)
      .get('/')
      .then(response => {
        response.should.have.status(200);
        response.should.be.html;
        done()
      })
  });

  it('should return a 404 for a route that doesnt exist', (done) => {
    chai.request(app)
      .get('/sadpath')
      .then(response => {
        response.should.have.status(404);
        done()
      })  
  })
})

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
        response.body[0].should.have.property('name', 'Drake');
        response.body[0].should.have.property('id', 1);
        response.body[0].should.have.property('url', 'https://www.last.fm/music/Drake');
        response.body[0].should.have.property('image', 'https://lastfm-img2.akamaized.net/i/u/300x300/8b1974079754d9a3e194076bccd4f696.png');
        response.body[29].should.have.property('name', 'Sia');
        response.body[29].should.have.property('id', 30);
        response.body[29].should.have.property('url', 'https://www.last.fm/music/Sia');
        response.body[29].should.have.property('image', 'https://lastfm-img2.akamaized.net/i/u/300x300/ee10f625b9a87a4d5d6febca8b0746a9.png');
        done()
      })
  })

  it('should GET all the albums', (done) => {
    chai.request(app)
      .get('/api/v1/albums')
      .end((error, response) => {
        response.should.be.json
        response.should.have.status(200)
        response.body.should.be.an('array')
        response.body.length.should.equal(150)
        response.body[0].should.have.property('name');
        response.body[0].should.have.property('id');
        response.body[0].should.have.property('artist_id');
        response.body[0].should.have.property('url');
        response.body[0].should.have.property('image');
        response.body[149].should.have.property('name');
        response.body[149].should.have.property('id');
        response.body[149].should.have.property('artist_id');
        response.body[149].should.have.property('url');
        response.body[149].should.have.property('image');
        done()
      })
  })

  it('should GET a specific artist', (done) => {
    chai.request(app)
      .get('/api/v1/artists/12')
      .end((error, response) => {
        response.should.be.json
        response.should.have.status(200)
        response.body.should.be.an('object')
        response.body.should.have.property('name', 'Childish Gambino')
        response.body.should.have.property('id', 12);
        response.body.should.have.property('url', 'https://www.last.fm/music/Childish+Gambino');
        response.body.should.have.property('image', 'https://lastfm-img2.akamaized.net/i/u/300x300/4925ae3c7ec04df9b0c65e0adc12c6a1.png');
        done()
      })
  })

  it('should return a 404 if GET artist by id request is invalid', (done) => {
    chai.request(app)
      .get('/api/v1/artists/31')
      .end((error, response) => {
        response.should.be.json
        response.should.have.status(404)
        response.body.should.be.an('string')
        done()
      })
  })

  it('should GET a specific album', (done) => {
    chai.request(app)
      .get('/api/v1/albums/12')
      .end((error, response) => {
        response.should.be.json
        response.should.have.status(200)
        response.body.should.be.an('object')
        response.body.should.have.property('name')
        response.body.should.have.property('id', 12);
        response.body.should.have.property('artist_id');
        response.body.should.have.property('url');
        response.body.should.have.property('image');
        done()
      })
  })

  it('should return a 404 if GET album by id request is invalid', (done) => {
    chai.request(app)
      .get('/api/v1/albums/231')
      .end((error, response) => {
        response.should.be.json
        response.should.have.status(404)
        response.body.should.be.an('string')
        done()
      })
  })

  it('should GET a query for an artist name', (done) => {
    chai.request(app)
      .get('/api/v1/artists?name=Drake')
      .end((error, response) => {
        response.should.be.json
        response.should.have.status(200)
        response.body.should.be.an('array')
        response.body[0].should.have.property('name')
        response.body[0].should.have.property('id');
        response.body[0].should.have.property('url');
        response.body[0].should.have.property('image');
        done()
      })
  })

  it('should return a 404 for an invalid query', (done) => {
    chai.request(app)
      .get('/api/v1/artists?name=rakes')
      .end((error, response) => {
        response.should.be.json
        response.should.have.status(404)
        response.body.should.be.an('string')
        done()
      })
  })

});

