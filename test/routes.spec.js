const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const { app, database } = require('../server');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlvdXJmYWNlQHR1cmluZy5pbyIsImFwcE5hbWUiOiJNeUFwcCIsImFkbWluIjp0cnVlLCJpYXQiOjE1MjY1MDIxMjcsImV4cCI6MTUyNjY3NDkyN30._kmVWB_rsYqN1-qgMgotypgxICPhdKmESSQxkqZe0S0';

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

  it('should POST a new artist', (done) => {
    chai.request(app)
      .post('/api/v1/artists')
      .set('token', token)
      .send({
        name: 'Megadeth',
        url: 'http://www.megadeth.com'
      })
      .end((error, response) => {
        response.should.be.json
        response.should.have.status(201)
        response.body.should.be.an('object')
        response.body.should.have.property('id', 31)
        response.body.should.have.property('name', 'Megadeth')
        response.body.should.have.property('url', 'http://www.megadeth.com')
        response.body.should.have.property('image', null)
        done()
      })
  })

  it('should throw error if POST does not include artist name', (done) => {
    chai.request(app)
      .post('/api/v1/artists')
      .set('token', token)
      .send({
        url: 'http://www.megadeth.com'
      })
      .end((error, response) => {
        response.should.be.json
        response.should.have.status(422)
        response.should.be.an('object')
        response.body.should.equal('Must provide artist name')
        done()
      })
  })

  it('should POST a new album', (done) => {
    chai.request(app)
      .post('/api/v1/albums')
      .set('token', token)
      .send({
        name: 'Risk',
        url: 'http://www.drake.com/risk/',
        artist_id: 1
      })
      .end((error, response) => {
        response.should.be.json
        response.should.have.status(201)
        response.body.should.be.an('object')
        response.body.should.have.property('id', 146)
        response.body.should.have.property('name', 'Risk')
        response.body.should.have.property('url', 'http://www.drake.com/risk/')
        response.body.should.have.property('image', null)
        response.body.should.have.property('artist_id', 1)
        done()
      })
  })

  it('should throw error if POST does not include album name and/or artist id', (done) => {
    chai.request(app)
      .post('/api/v1/albums')
      .set('token', token)
      .send({
        url: 'http://www.drake.com/risk/',
        artist_id: 1
      })
      .end((error, response) => {
        response.should.be.json
        response.should.have.status(422)
        response.should.be.an('object')
        response.body.should.equal('Must provide name and artist id')
        done()
      })
  })

  it('should throw error if POST provides invalid artist id', (done) => {
    chai.request(app)
      .post('/api/v1/albums')
      .set('token', token)
      .send({
        name: 'Drake Dogg Yo',
        artist_id: 100
      })
      .end((error, response) => {
        response.should.be.json
        response.should.have.status(400)
        response.should.be.an('object')
        response.body.should.equal('Invalid artist id.  error: insert into "albums" ("artist_id", "name") values ($1, $2) returning "id", "name", "url", "image", "artist_id" - insert or update on table "albums" violates foreign key constraint "albums_artist_id_foreign"')
        done()
      })
  })

  it('should PUT (update) an existing artist', (done) => {
    chai.request(app)
      .put('/api/v1/artists/1')
      .set('token', token)
      .send({
        name: 'Drake Dogg',
        url: 'http://www.stilldrake.com'
      })
      .end((error, response) => {
        response.should.be.json
        response.should.have.status(201)
        response.body.should.be.an('object')
        response.body.should.have.property('id', 1)
        response.body.should.have.property('name', 'Drake Dogg')
        response.body.should.have.property('url', 'http://www.stilldrake.com')
        response.body.should.have.property('image')
        done()
      })
  })

  it('should throw error if PUT finds no matching artist', (done) => {
    chai.request(app)
      .put('/api/v1/artists/221')
      .set('token', token)
      .send({
        name: 'Drake Dogg Yo',
        url: 'http://www.stilldrake.com'
      })
      .end((error, response) => {
        response.should.be.json
        response.should.have.status(404)
        response.should.be.an('object')
        response.body.should.equal('That id does not exist')
        done()
      })
  })

  it('should PUT (update) an existing album', (done) => {
    chai.request(app)
      .put('/api/v1/albums/1')
      .set('token', token)
      .send({
        name: 'Drake Dogg Yo',
        url: 'http://www.stilldrake.com'
      })
      .end((error, response) => {
        response.should.be.json
        response.should.have.status(201)
        response.body.should.be.an('object')
        response.body.should.have.property('id', 1)
        response.body.should.have.property('name')
        response.body.should.have.property('url')
        response.body.should.have.property('image')
        done()
      })
  })

  it('should throw error if PUT finds no matching album', (done) => {
    chai.request(app)
      .put('/api/v1/albums/221')
      .set('token', token)
      .send({
        name: 'Drake Dogg Yo',
        url: 'http://www.stilldrake.com'
      })
      .end((error, response) => {
        response.should.have.status(404)
        response.should.be.an('object')
        response.body.should.equal('That id does not exist')
        done()
      })
  })

  it('should DELETE an existing artist', (done) => {
    chai.request(app)
      .del('/api/v1/artists/30')
      .set('token', token)
      .end((error, response) => {
        response.should.have.status(204)
        done()
      })
  })

  it('should DELETE an existing album', (done) => {
    chai.request(app)
      .del('/api/v1/albums/30')
      .set('token', token)
      .end((error, response) => {
        response.should.have.status(204)
        done()
      })
  })



});

