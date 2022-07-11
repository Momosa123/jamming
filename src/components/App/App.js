
import React from 'react'
import { SearchBar } from '../SearchBar/SearchBar'
import {SearchResults} from '../SearchResults/SearchResults'
import {Playlist} from '../Playlist/Playlist'
import './App.css'
import Spotify from '../../util/Spotify'

export class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      searchResults:[],
      playlistName: 'My playlist',
      playlistTracks:[]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)
  }

  addTrack(track){
    
    const tracks = this.state.playlistTracks
    console.log(tracks)
    console.log(track)
    // if (tracks.every(playlistTrack =>playlistTrack.id !== track.id))
    // this.setState(prevState =>({...prevState, playlistTracks: prevState.playlistTracks.concat(track)}))
    if(tracks.find(savedTrack => savedTrack.ID === track.ID))
    {return}
    console.log('we are here')
    tracks.push(track)
    this.setState({
      playlistTracks: tracks
    })
  }

  removeTrack(track){
       this.setState(prevState =>prevState.filter.playlistTracks(playlistTrack => playlistTrack.ID !== track.ID))
  }

  updatePlaylistName(name){
    this.setState(prevState => ({...prevState, playlistName: name}))
  }

  savePlaylist(){
    const trackUris = this.state.playlistTracks.map(playlistTrack => playlistTrack.URI)
    console.log(trackUris.length)
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => this.setState({
      playlistName: 'New Playlist',
      playlistTracks: []
    }))
  }

  search(query){
    Spotify.search(query).then(
      searchResults => {
        this.setState({searchResults: searchResults})
      }
    )
  }

  

 render()
 { return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={this.search}/>
        <div className="App-playlist">
          <SearchResults addTrack={this.addTrack} searchResults={this.state.searchResults} />
          <Playlist
          onSave ={this.savePlaylist}
          onNameChange={this.updatePlaylistName}
          onRemove ={this.removeTrack} 
          playlistName={this.state.playlistName}
          playlistTracks={this.state.playlistTracks}
          />
        </div>
      </div>
  </div>
  )}
}

export default App;
