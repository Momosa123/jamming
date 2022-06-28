import React from 'react'
import './Track.css'

export class Track extends React.Component{
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this)
  }
addTrack(e){
this.props.onAdd(this.props.track)
}
render ()
 {return ( <div className="Track">
 <div className="Track-information">
   <h3>{this.props.track.name}</h3>
   <p> {this.props.track.artist} |  {this.props.album}</p>
 </div>
 <button onClick={this.addTrack}  className="Track-action">-- + or - will go here </button>
</div>)}
}