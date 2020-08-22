import React from 'react';
import './Playlist.css'
import Tracklist from '../Tracklist/Tracklist.jsx';
import Spotify from '../../util/Spotify.js';

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
        this.props.updateName(event.target.value);
    }

    handleClick(event) {
        this.savePlaylistToSpotify(this.props.playlistName, this.props.playlistTracks.map(track => track.uri));
    }

    async savePlaylistToSpotify(name, tracks) {
        await Spotify.createNewPlaylist(name, tracks);
        this.props.resetPlaylist();
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
                <button
                    className="Playlist-save"
                    onClick={this.handleClick}>
                    SAVE TO SPOTIFY
                </button>
            </div>
        )
    }
}

export default Playlist;