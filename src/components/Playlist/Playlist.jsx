import React from 'react';
import './Playlist.css'
import Tracklist from '../Tracklist/Tracklist.jsx';

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.updateName(event.target.value);
    }

    render() {
        return (
            <div className="Playlist">
                <input
                    value={this.props.playlistName}
                    onChange={this.handleChange} />
                <Tracklist
                    trackList={this.props.playlistTracks}
                    trackAction={this.props.trackAction}
                    isRemoval={true} />
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        )
    }
}

export default Playlist;