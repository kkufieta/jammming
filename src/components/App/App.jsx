import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.jsx';
import SearchResult from '../SearchResults/SearchResult.jsx';
import Playlist from '../Playlist/Playlist.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    };

    this.updateSearchResult = this.updateSearchResult.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.addTrackToPlaylist = this.addTrackToPlaylist.bind(this);
    this.removeTrackFromPlaylist = this.removeTrackFromPlaylist.bind(this);
  }

  updateSearchResult(newSearchResult) {
    this.setState({
      searchResult: newSearchResult
    });
  }

  updatePlaylistName(newName) {
    this.setState({
      playlistName: newName
    });
  }

  addTrackToPlaylist(track) {
    let playlistTracks = this.state.playlistTracks;
    if (!playlistTracks.includes(track)) {
      playlistTracks.push(track);
      this.setState({
        playlistTracks: playlistTracks
      });
    }
  }

  removeTrackFromPlaylist(trackToRemove) {
    const index = this.state.playlistTracks.findIndex((track) => {
      return track.id === trackToRemove.id;
    });
    let updatedPlaylist = this.state.playlistTracks;
    updatedPlaylist.splice(index, 1);
    this.setState({
      playlistTracks: updatedPlaylist
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar updateSearchResult={this.updateSearchResult} />
          <div className="App-playlist">
            <SearchResult
              searchResult={this.state.searchResult}
              trackAction={this.addTrackToPlaylist} />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              updateName={this.updatePlaylistName}
              trackAction={this.removeTrackFromPlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;