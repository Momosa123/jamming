
import React from 'react'
import { SearchBar } from '../SearchBar/SearchBar'
import {SearchResults} from '../SearchResults/SearchResults'
import {Playlist} from '../Playlist/Playlist'
import './App.css'

export class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      searchResults:[],
      playlistName: 'My playlist',
      playlistTracks:['X gonna give it to you','I am DMX', 'This is how we do']
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
  }

  addTrack(track){
    if (this.state.playlistTracks.every(playlistTrack =>playlistTrack.id !== track.id))
    this.setState(prevState =>({...prevState, playlistTracks: prevState.playlistTracks.concat(track)}))
  }

  removeTrack(track){
       this.setState(prevState =>prevState.filter(playlistTrack => playlistTrack.id !== track.id))
  }

  updatePlaylistName(name){
    this.setState(prevState => ({...prevState, playlistName: name}))
  }

  savePlaylist(){
    return this.playlistTracks.map(playlistTrack => playlistTrack.url)
  }
 render()
 { return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar/>
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
