const apiKey = require('../../apiKey') 

const fetch = require('node-fetch')
const fs = require('fs')


let getTopArtists = async () => {
  try {
    const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${apiKey}&format=json`)
    const data = await response.json();
    const cleanData = await cleanArtist(data.artists.artist)
    console.log(cleanData)
    const artistData = JSON.stringify(cleanData, null, 2)
    await fs.writeFile('./artist-data.json', artistData, 'utf8', error => {
      if(error) {
        return console.log(error)
      }
    })
    console.log('data saved to file')
    // console.log(artistIds)

  } catch (error) {
    console.log(error)
  }
}

getTopArtists()

const cleanArtist = (data) => {
  
  const promises = data.map( async (artist) => {
    let albums = await getAlbums(artist.name)
    // console.log(albums)

    const artistObj = {
      name: artist.name,
      mbid: artist.mbid,
      url: artist.url,
      image: artist.image[4]['#text']
      // albums: albums
    }

    return Promise.all(artistObj)
  })

  return promises
}

const getAlbums = async (artist) => {
  const response = await fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist}&limit=5&api_key=${apiKey}&format=json`)
  const albumData = await response.json(); 
  // console.log(albumData.topalbums)
  const cleanAlbumData =  albumData.topalbums.album.map(album => ({
    name: album.name,
    url: album.url,
    image: album.image[3]['#text']
  }))

  return Promise.all(cleanAlbumData)
}



// let topArtists = getTopArtists();
// console.log(topArtists) 

//.then(result => {
    // let condition = JSON.stringify({ condition: result })

    // fs.writeFile('./weather-data.json', condition, 'utf8', error => {
    //   if(error) {
    //     return console.log(error)
    //   }
    // })
    // console.log('data saved to file')