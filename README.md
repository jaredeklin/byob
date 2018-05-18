# Build Your Own Backend (BYOB) Database

## Overview
The data for this project came from the Last.fm API and includes a collection of music artists and the top-5 albums for each artist.  The database contains two tables: artists and albums.  The two tables are related by an artist id field in the albums table.  Both tables also include properties of name, url, and image.

The database is built using Node, Express, Knex, and PostgreSQL and is secured using JSON Web Tokens (JWTs) that are issued from a static request form.  Email addresses ending in "@turing.io" are issued administrative privileges that include authentication for POST, PUT and DELETE requests. 

* Production URL:   [Heroku](https://byob-jared-michael.herokuapp.com)

* Contributors: [Jared Eklin](https://github.com/jaredeklin) and [Michael Gatewood](https://github.com/mngatewood)

## Authentication and Authorization

In order to make fetch requests, you will need to request a JWT at https://byob-jared-michael.herokuapp.com/.  If you are granted administrative privileges, you will need to provide your token in the header of any POST, PUT, or DELETE request.

#### Example
Headers:
```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJlbWFpbCI6InlvdUBzb21ld2hlcmUuY29tI.wN5tW7sGF50KWpt1YLtTPgBOwWaKmjwO1jbQwQBk_W8"
}
```
## Status Codes

The following status codes are used to indicate the status of your request:

* 200: Status is OK.
* 201: The resource was successfully updated or added to the database.
* 204: The resource was successfully deleted.
* 401: You are not authorized access to the requested resource.
* 403: You are not authorized access to the database (invalid or no token provided).
* 404: The requested resource could not be found.
* 422: The request could not be fulfilled because the body of the request was invalid or could not be interpreted by the server.
* 500: An internal server error occurred.

## Endpoints

The paths provided below are relative paths that will need to be added to the root path of the API.  For example, to make a GET request to return all artists, the fetch URL is https://byob-jared-michael.herokuapp.com/api/v1/artists/. 

For fetches that request a specific resource, replace ":id" in the path with the id of the requested resource.  For example, to request the artist "The Killers" with an ID of 24, the fetch URL would be:
```
https://byob-jared-michael.herokuapp.com/api/v1/artists/24
```

### GET: /api/v1/artists
* Retrieves an array of all artists from the database

### GET: /api/v1/artists?name
* Retrieves an array of all artists from the database whose name matches the given query.

#### Example:

##### GET: /api/v1/artists?name=Radiohead

#### Response:
```
[
  {
    "id": 7,
    "name": "Radiohead",
    "url": "https://www.last.fm/music/Radiohead",
    "image": "https://lastfm-img2.akamaized.net/i/u/300x300/9b109fcab6c48f5714c8554a31ab9943.png",
    "created_at": "2018-05-18T01:42:45.074Z",
    "updated_at": "2018-05-18T01:42:45.074Z"
  }
]
```

### GET: /api/v1/artists/:id
* Retrieves a single artists with the given ID

#### Example:

##### GET: /api/v1/artists/1

#### Response:
```
{
  "id": 1,
  "name": "Drake",
  "url": "https://www.last.fm/music/Drake",
  "image": "https://lastfm-img2.akamaized.net/i/u/300x300/8b1974079754d9a3e194076bccd4f696.png",
  "created_at": "2018-05-15T19:00:18.843Z",
  "updated_at": "2018-05-15T19:00:18.843Z"
}
```

### GET: /api/v1/albums
* Retrieves all albums from the database

### GET: /api/v1/albums/:id
* Retrieves a single album with the given ID

#### Example:

##### GET: /api/v1/albums/1

#### Response:
```
{
  "id": 1,
  "name": "So Far Gone",
  "url": "https://www.last.fm/music/Drake/So+Far+Gone",
  "image": "https://lastfm-img2.akamaized.net/i/u/300x300/ecbe5844a50641168b0a4e1e1a91d799.png",
  "artist_id": 1,
  "created_at": "2018-05-15T19:00:18.879Z",
  "updated_at": "2018-05-15T19:00:18.879Z"
}
```

### POST: /api/v1/artists/
* Adds a new artist to the database

#### Example:

##### POST: /api/v1/artists/
Body: 
```
{
  "name": "Foo Fighters",
  "url": "https://foofighters.com",
  "image": "https://images.sk-static.com/images/media/profile_images/artists/29315/huge_avatar"
}
```
Response:
```
{
  "id": 31,
  "name": "Foo Fighters",
  "url": "https://foofighters.com",
  "image": "https://images.sk-static.com/images/media/profile_images/artists/29315/huge_avatar",
  "created_at": "2018-05-18T01:42:45.092Z",
  "updated_at": "2018-05-18T01:42:45.092Z"

}
```

### POST: /api/v1/albums/
* Adds a new album to the database

#### Example:

##### POST: /api/v1/albums/
Body: 
```
{
  "name": "The Game",
  "url": "https://www.last.fm/music/Queen/The+Game",
  "image": "https://upload.wikimedia.org/wikipedia/en/thumb/1/16/Queen_The_Game.png/220px-Queen_The_Game.png"
  "artist_id": 21
}
```
Response:
```
{
  "id": 146,
  "name": "The Game",
  "url": "https://www.last.fm/music/Queen/The+Game",
  "image": "https://upload.wikimedia.org/wikipedia/en/thumb/1/16/Queen_The_Game.png/220px-Queen_The_Game.png"
  "artist_id": 21,
  "created_at": "2018-05-18T01:42:45.092Z",
  "updated_at": "2018-05-18T01:42:45.092Z"
}
```

### PUT: /api/v1/artists/:id
* Updates an existing artist in the database

#### Example:

##### PUT: /api/v1/artists/19
Body: 
```
{
  "name": "Florence + the Machine"
}
```
Response:
```
{
  "id": 19,
  "name": "Florence and the Machine",
  "url": "https://www.last.fm/music/Florence+%252B+the+Machine",
  "image": "https://lastfm-img2.akamaized.net/i/u/300x300/45bda00139baca0b2122b75d8efcd01e.png",
  "created_at": "2018-05-18T01:42:45.092Z",
  "updated_at": "2018-05-18T01:42:45.092Z"
}
```

### PUT: /api/v1/albums/:id
* Updates an existing album in the database

#### Example:

##### PUT: /api/v1/albums/14
Body: 
```
{
  "name": "Earned It (Fifty Shades of Grey)"
  "image": "https://i1.sndcdn.com/artworks-000178059589-qp4ank-t500x500.jpg"
}
```
Response:
```
{
  "id": 14,
  "name": "Earned It (Fifty Shades of Grey)"
  "url": "https://www.last.fm/music/The+Weeknd/Earned+It+(Fifty+Shades+Of+Grey)+%5BFrom+The+%22Fifty+Shades+Of+Grey%22+Soundtrack%5D",
  "image": "https://i1.sndcdn.com/artworks-000178059589-qp4ank-t500x500.jpg"
  "artist_id": 3,
  "created_at": "2018-05-18T01:42:45.122Z",
  "updated_at": "2018-05-18T01:42:45.122Z"
}
```

### DELETE: /api/v1/artists/:id
* Deletes an existing artist from the database

### DELETE: /api/v1/albums/:id
* Deletes an existing album from the database
