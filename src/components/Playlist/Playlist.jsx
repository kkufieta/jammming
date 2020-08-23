import React from 'react';
import './Playlist.css'
import Tracklist from '../Tracklist/Tracklist.jsx';
import Spotify from '../../util/Spotify.js';

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleNameChange(event) {
        this.props.updateName(event.target.value);
    }

    handleSave(event) {
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
                    onChange={this.handleNameChange} />
                <Tracklist
                    trackList={this.props.playlistTracks}
                    trackAction={this.props.removeTrack}
                    isRemoval={true} />
                <button
                    className="Playlist-save"
                    onClick={this.handleSave}>
                    SAVE TO SPOTIFY
                </button>
            </div>
        )
    }
}

export default Playlist;