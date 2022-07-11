const clientId ='94c39334b2984f43b4f54e28372e7933';
const redirectUri = 'http://localhost:3000/'
let accessToken;
const Spotify={
getAccessToken(){
  if (accessToken)
  return accessToken
  const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
  const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)
  if(accessTokenMatch && expiresInMatch){
    accessToken = accessTokenMatch[1]
    const expiresIn = Number(expiresInMatch[1])
    //This clears the parameters if expires in times out
    window.setTimeout(() => accessToken = '', expiresIn * 1000);
    window.history.pushState('Access Token', null, '/');
    console.log(accessToken)
    return accessToken
  }else{
    const accessUrl =`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
    window.location = accessUrl
  }
},
search(term){
  const accessToken = Spotify.getAccessToken()
  return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
    headers:{
      Authorization: `Bearer ${accessToken}`
    }
  })
  .then(res => res.json())
  .then (data => {
    if(!data.tracks)
    return []
    return data.tracks.items.map(track => ({
      ID: track.id,
      Name: track.name,
      Artist: track.artists[0].name,
      album: track.album.name,
      URI: track.uri
    }
  ))})
},
savePlaylist(playlist, tracksUris){
  if(!playlist || !tracksUris.length){
    return;
  }
  const accessToken = Spotify.getAccessToken()
  const headers = { Authorization: `Bearer ${accessToken}`}
  let userID;
  return fetch('https://api.spotify.com/v1/me',  {headers: headers})
  .then( res => res.json())
  .then(data => {
    userID = data.id
    return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,{
      headers: headers,
      method: 'POST',
      body: JSON.stringify({name: playlist})
    })
    .then(res => res.json())
    .then(data =>{
      const playlistID = data.id
      return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({uris: tracksUris})
      })
    })
    

  })
}
}

export default Spotify