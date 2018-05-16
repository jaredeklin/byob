# Bring Your Own Backend (BYOB) Database

## Overview

## Endpoints

### GET: /api/v1/artists
* Retrieves all artists from the database
```
Response:
status: 201
```

### GET: /api/v1/albums
* Retrieves all albums from the database
```
Response:
status: 201
```

### GET: /api/v1/artists/:id
* Retrieves a single artists with the given ID
```
Response:
status: 201
```
#### Example:

##### GET: /api/v1/artists/1
```
Response:

{
  "id": 1,
  "name": "Drake",
  "url": "https://www.last.fm/music/Drake",
  "image": "https://lastfm-img2.akamaized.net/i/u/300x300/8b1974079754d9a3e194076bccd4f696.png",
  "created_at": "2018-05-15T19:00:18.843Z",
  "updated_at": "2018-05-15T19:00:18.843Z"
}
```

### GET: /api/v1/albums/:id
* Retrieves a single album with the given ID
```
Response:
status: 201
```
#### Example:

##### GET: /api/v1/albums/1
```
Response:

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
