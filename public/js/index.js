const apiKey = require('../../apiKey');
const fetch = require('node-fetch');
const fs = require('fs');

const baseUrl = 'http://ws.audioscrobbler.com/2.0/?';

const getTopArtists = async () => {
  try {
    const method = 'method=chart.gettopartists&limit=30&api_key=';
    const response = await fetch(`${baseUrl}${method}${apiKey}&format=json`);
    const rawArtistData = await response.json();
    const cleanData = await cleanArtist(rawArtistData.artists.artist);
    const artistData = JSON.stringify(cleanData, null, 2);
    await fs.writeFile('./artist-data.json', artistData, 'utf8', (error) => {
      if (error) {
        return console.log(error);
      }
    });
    console.log('data saved to file');
  } catch (error) {
    console.log(error);
  }
};

const cleanArtist = (artistData) => {
  const promises = artistData.map(async (artist) => {
    const albums = await getAlbums(artist.name);

    const artistObj = {
      name: artist.name,
      mbid: artist.mbid,
      url: artist.url,
      image: artist.image[4]['#text'],
      albums
    };

    return artistObj;
  });

  return Promise.all(promises);
};

const getAlbums = async (artist) => {
  const method = `method=artist.gettopalbums&artist=${artist}&limit=5&api_key`;
  const response = await fetch(`${baseUrl}${method}=${apiKey}&format=json`);
  const albumData = await response.json();
  const cleanAlbumData = albumData.topalbums.album.map(album => ({
    name: album.name,
    url: album.url,
    image: album.image[3]['#text']
  }));

  return Promise.all(cleanAlbumData);
};

getTopArtists();
