import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
                {
                    this.props.tracks.map(track => {
                       // console.log(track);
                        return <Track onAdd={this.props.onAdd} onRemove={this.props.onRemove} track={track} key={track.id} />
                    })
                }
            </div>
        )
    }
}

export default TrackList;