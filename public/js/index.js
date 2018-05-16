// const apiKey = require('../../apiKey');
// const fetch = require('node-fetch');
// const fs = require('fs');

const getCred = async (event) => {
  event.preventDefault()
  const email = document.querySelector('#email').value;
  const appName = document.querySelector('#app').value;
  if (email && appName) {
    try {
      const response = await fetch('/authenticate', {
        method: 'POST',
        body: JSON.stringify({email, appName}),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if(response.ok) {
        const token = await response.json();
        alert(`You got cred! Please write your token down. \nToken: ${token.token} \nDO NOT FORGET YOUR TOKEN.  FOR SECURITY PURPOSES, YOU WILL NOT BE ISSUED A REPLACEMENT!`)
      } else {
        alert(response.statusText)
      }
    }
    catch (error) { alert(error) }
  } else {
    alert('Please enter a valid email address and app name.')
  }
}

document.querySelector('button').addEventListener('click', getCred);

// const baseUrl = 'http://ws.audioscrobbler.com/2.0/?';

// const getTopArtists = async () => {
//   try {
//     const method = 'method=chart.gettopartists&limit=30&api_key=';
//     const response = await fetch(`${baseUrl}${method}${apiKey}&format=json`);
//     const rawArtistData = await response.json();
//     const cleanData = await cleanArtist(rawArtistData.artists.artist);
//     const artistData = JSON.stringify(cleanData, null, 2);
//     await fs.writeFile('./artist-data.json', artistData, 'utf8', (error) => {
//       if (error) {
//         return console.log(error);
//       }
//     });
//     console.log('data saved to file');
//   } catch (error) {
//     console.log(error);
//   }
// };

// const cleanArtist = (artistData) => {
//   const promises = artistData.map(async (artist) => {
//     const albums = await getAlbums(artist.name);

//     const artistObj = {
//       name: artist.name,
//       mbid: artist.mbid,
//       url: artist.url,
//       image: artist.image[4]['#text'],
//       albums
//     };

//     return artistObj;
//   });

//   return Promise.all(promises);
// };

// const getAlbums = async (artist) => {
//   const method = `method=artist.gettopalbums&artist=${artist}&limit=5&api_key`;
//   const response = await fetch(`${baseUrl}${method}=${apiKey}&format=json`);
//   const albumData = await response.json();
//   const cleanAlbumData = albumData.topalbums.album.map(album => ({
//     name: album.name,
//     url: album.url,
//     image: album.image[3]['#text']
//   }));

//   return Promise.all(cleanAlbumData);
// };

// getTopArtists();
