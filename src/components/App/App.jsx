import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.jsx';
import SearchResult from '../SearchResults/SearchResult.jsx';
import Playlist from '../Playlist/Playlist.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: []
    };

    this.updateSearchResult = this.updateSearchResult.bind(this);
  }

  updateSearchResult(newSearchResult) {
    this.setState({
      searchResult: newSearchResult
    });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar updateSearchResult={this.updateSearchResult} />
          <div className="App-playlist">
            <SearchResult searchResult={this.state.searchResult} />
            <Playlist />
          </div>
        </div>
      </div>
    );
  }
}

export default App;