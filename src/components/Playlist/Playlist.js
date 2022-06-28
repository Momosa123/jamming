import React from 'react'
import './Playlist.css'
import {TrackList} from '../TrackList/TrackList'

export class Playlist extends React.Component{
constructor(props){
  super(props);
  this.handleNameChange = this.handleNameChange.bind(this)
}
  handleNameChange(e){
    const name = e.target.value
    this.props.onNameChange(name)
  }
 render(){
  return ( <div className="Playlist">
 <input onChange={this.handleNameChange} defaultValue ={'New Playlist'}/>
 <TrackList  isRemoval= {true} onRemove={this.props.onRemove} tracks ={this.props.playlistTracks} />
 <button className="Playlist-save">SAVE TO SPOTIFY</button>
</div>)}
}