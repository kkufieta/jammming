import React from 'react';
import './Tracklist.css';
import Track from '../Track/Track.jsx';

class TrackList extends React.Component {

    trackAction(track) {
        this.props.trackAction(track);
    }

    render() {
        return (
            <div className="TrackList">
                {this.props.trackList.map((track) => {
                    return <Track
                        key={track.id}
                        name={track.name}
                        artist={track.artist}
                        album={track.album}
                        trackAction={() => this.trackAction(track)}
                        isRemoval={this.props.isRemoval} />;
                })}
            </div>
        )
    }
}

export default TrackList;
