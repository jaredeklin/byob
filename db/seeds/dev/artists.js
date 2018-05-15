const artistsData = require('../../../master-data.js');
const { database } = require('../../../server');

const createArtist = (knex, artist) => knex('artists').insert({
  name: artist.name,
  url: artist.url,
  image: artist.image
}, 'id')
  .then((artistId) => {
    console.log(`artistID ${artistId}`);
    const albumPromises = [];

    artist.albums.forEach((album) => {
      albumPromises.push(createAlbum(knex, {
        name: album.name,
        url: album.url,
        image: album.image,
        artist_id: artistId[0]
      }, 'id'));
    });

    return Promise.all(albumPromises);
  });

const createAlbum = (knex, album) => knex('albums').insert(album);

exports.seed = (knex, Promise) => database.migrate.rollback()
  .then(() => database.migrate.latest())
  .then(() => knex('albums').del())
  .then(() => knex('artists').del())
  .then(() => {
    const artistPromises = [];

    artistsData.forEach((artist) => {
      artistPromises.push(createArtist(knex, artist));
    });

    return Promise.all(artistPromises);
  })
  .catch(error => console.log(`Error seeding artist data: ${error}`));
