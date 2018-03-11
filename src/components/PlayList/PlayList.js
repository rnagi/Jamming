import React from 'react';
import TrackList from '../TrackList/TrackList';
import './PlayList.css';

class PlayList extends React.Component {
    constructor(props){
        super(props)
        this.handleNameChange = this.handleNameChange.bind(this);
    }
    handleNameChange(event){
       this.props.onNameChange(event.target.value);
    }
    render() {
        return (
            <div className="Playlist">
                <input onChange={this.handleNameChange} defaultValue={'New Playlist'} />
                <TrackList onRemove={this.props.onRemove} tracks={this.props.playlistTracks}/>
                <a className="Playlist-save">SAVE TO SPOTIFY onClick={this.props.onSave}</a>
            </div>
        )
    } 
}

export default PlayList;