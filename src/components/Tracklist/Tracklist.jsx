import React from 'react';
import './Tracklist.css';
import Track from '../Track/Track.jsx';

class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
                {/*<!-- You will add a map method that renders a set of Track components  -->*/}
                {this.props.trackList.map((track) => {
                    return <Track
                        key={track.id}
                        name={track.name}
                        artist={track.artist}
                        album={track.album} />;
                })}
            </div>
        )
    }
}

export default TrackList;
