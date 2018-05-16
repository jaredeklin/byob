const express = require('express');
const bodyParser = require('body-parser');

const dotenv = require('dotenv').config();
const secretKey = dotenv.parsed.SECRET_KEY;
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const jwt = require('jsonwebtoken');

app.set('port', process.env.PORT || 3000);

app.locals.title = 'BYOB';

app.use(bodyParser.json());
app.use(express.static('public'));

const checkAuth = (request, response, next) => {
  const { token } = request.headers

  if (token) {
    const decoded = jwt.verify(token, secretKey);

    if (decoded.admin) {
      next()
    } else {
      return response.status(403).json('Invalid token')
    }
  } else {
    return response.status(400).json('Unauthorized')
  }
}

app.get('/api/v1/artists', (request, response) => {
  const name = request.param('name');

  if (name) {
    database('artists').where('name', name).select()
      .then(artists => response.status(200).json(artists))
      .catch(error => response.status(404).json({ error }));
  } else {
    database('artists').select()
      .then(artists => response.status(200).json(artists))
      .catch(error => response.status(404).json({ error }));
  }
});

app.get('/api/v1/albums', (request, response) => {
  database('albums').select()
    .then(albums => response.status(200).json(albums))
    .catch(error => response.status(404).json({ error }));
});

app.get('/api/v1/artists/:id', (request, response) => {
  database('artists').where('id', request.params.id).select()
    .then(artists => response.status(200).json(artists[0]))
    .catch(error => response.status(404).json({error}))
})

app.get('/api/v1/albums/:id', (request, response) => {
  database('albums').where('id', request.params.id).select()
    .then(albums => response.status(200).json(albums[0]))
    .catch(error => response.status(404).json({error}))
})

app.post('/api/v1/artists/', checkAuth, (request, response) => {
  const artist = request.body;
  const keys = ['id', 'name', 'url', 'image'];

  database('artists').insert(artist, keys)
    .then(artist => response.status(201).json(artist[0]))
    .catch(error => response.status(422).json({ error }));
});

app.post('/api/v1/albums/', checkAuth, (request, response) => {
  const album = request.body;
  const keys = ['id', 'name', 'url', 'image', 'artist_id'];

  database('albums').insert(album, keys)
    .then(album => response.status(201).json(album[0]))
    .catch(error => response.status(422).json({ error }));
});

app.put('/api/v1/artists/:id', checkAuth, (request, response) => {
  const artist = request.body;

  database('artists').where('id', request.params.id)
    .update(artist).returning('*')
    .then(artist => response.status(201).json(artist[0]))
    .catch(error => response.status(422).json({ error }));
});

app.put('/api/v1/albums/:id', checkAuth, (request, response) => {
  const album = request.body;

  database('albums').where('id', request.params.id)
    .update(album).returning('*')
    .then(album => response.status(201).json(album[0]))
    .catch(error => response.status(422).json({ error }));
});

app.delete('/api/v1/artists/:id', checkAuth, (request, response) => {
  database('artists').where('id', request.params.id).del()
    .then(artist => response.status(204).json(artist))
    .catch(error => response.status(404).json({ error }));
});

app.delete('/api/v1/albums/:id', checkAuth, (request, response) => {
  database('albums').where('id', request.params.id).del()
    .then(album => response.status(204).json(album))
    .catch(error => response.status(404).json({ error }));
});

app.post('/authenticate', (request, response) => {
  const { email, appName } = request.body

  let admin = false

  if(email && appName) {
    if(email.includes('@turing.io')) {
      admin = true
    }
    const token = jwt.sign({
      email,
      appName,
      admin
    }, secretKey, {expiresIn: "48hr"})
    return response.status(201).json({token})
  } else {
    return response.status(400).json('Something is missing')
  }
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} listening on localhost:${app.get('port')}.`);
});

module.exports = { app, database };
