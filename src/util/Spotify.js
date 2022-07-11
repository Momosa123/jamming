const clientId ='94c39334b2984f43b4f54e28372e7933';
const redirectUri = 'http://localhost:3000/'
let userAccessToken;
const Spotify={
getAccessToken(){
  if (userAccessToken)
  return userAccessToken
  const userAccessMatch = window.location.href.match(/access_token=([^&]*)/)
  const expiresMatch = window.location.href.match(/expires_in=([^&]*)/)
  if(userAccessToken && expiresMatch){
    userAccessToken = userAccessMatch
    const expiresIn = Number(expiresMatch)
    //This clears the parameters if expires in times out
    window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
    window.history.pushState('Access Token', null, '/');
    return userAccessToken
  }else{
    const accessUrl =`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
    window.location = accessUrl
  }
},
search(term){
  const accessToken = Spotify.getAccessToken()
  return fetch(`https://api.spotify.com/v1/search?type=TRACK1&q=${term}`,{
    headers:{
      Authorisation: `Bear ${accessToken}`
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
  if(!playlist || !tracksUris){
    return;
  }
  const accessToken = Spotify.getAccessToken()
  const headers = { Authorisation: `Bear ${accessToken}`}
  let userID;
  return fetch('https://api.spotify.com/v1/me', headers)
  .then(
    res => res.json()
  )
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