const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);

app.locals.title = 'BYOB';

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/api/v1/artists', (request, response) => {
  database('artists').select()
    .then(artists => response.status(200).json(artists))
    .catch(error => response.status(404).json({error}))
})

app.get('/api/v1/albums', (request, response) => {
  database('albums').select()
    .then(albums => response.status(200).json(albums))
    .catch(error => response.status(404).json({error}))
})

app.get('/api/v1/artists/:id', (request, response) => {
  database('artists').where('id', request.params.id).select()
    .then(artists => response.status(200).json(artists))
    .catch(error => response.status(404).json({error}))
})

app.get('/api/v1/albums/:id', (request, response) => {
  database('albums').where('id', request.params.id).select()
    .then(albums => response.status(200).json(albums))
    .catch(error => response.status(404).json({error}))
})

app.post('/api/v1/artists/', (request, response) => {
  const artist = request.body
  const keys = ['id', 'name', 'url', 'image']

  database('artists').insert(artist, keys)
    .then(artist => response.status(201).json(artist[0]))
    .catch(error => response.status(422).json({error}))
})


app.post('/api/v1/albums/', (request, response) => {
  const album = request.body
  const keys = ['id', 'name', 'url', 'image', 'artist_id']

  database('albums').insert(album, keys)
    .then(album => response.status(201).json(album[0]))
    .catch(error => response.status(422).json({error}))
})





app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} listening on localhost:${app.get('port')}.`)
})

module.exports = { app, database }