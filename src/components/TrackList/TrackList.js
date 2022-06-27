import React from 'react'
import './TrackList.css'
import { Track } from '../Track/Track'

export class TrackList extends React.Component{
  trackElements = this.props.tracks.map(track => <Track key={track.id} track = {track}/>)

 render(){
  return (
  <div className="TrackList">
    {this.trackElements}
</div>
)}
}