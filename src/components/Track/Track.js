import React from 'react'
import './Track.css'

export class Track extends React.Component{
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
  }

addTrack(e){
this.props.onAdd(this.props.track)
}

removeTrack(e){
  this.props.onRemove(this.props.track)
  }

render ()
 {return ( <div className="Track">
 <div className="Track-information">
   <h3>{this.props.track.Name}</h3>
   <p> {this.props.track.Artist} <br/>  {this.props.album}</p>
 </div>
 <button onClick={this.addTrack}  className="Track-action"> + </button>
 <button onClick={this.removeTrack}  className="Track-action"> - </button>
</div>)}
}