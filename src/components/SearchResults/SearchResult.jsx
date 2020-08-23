import React from 'react';
import './SearchResult.css';
import Tracklist from '../Tracklist/Tracklist.jsx';

class SearchResult extends React.Component {
    render() {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <Tracklist
                    trackList={this.props.searchResult}
                    trackAction={this.props.addTrack}
                    isRemoval={false} />
            </div>
        )
    }

}

export default SearchResult;