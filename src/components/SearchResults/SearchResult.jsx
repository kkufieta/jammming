import React from 'react';
import './SearchResult.css'

class SearchResult extends React.Component {
    render() {
        console.log("SearchResult component, Searchresult: ", this.props.searchResult);
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                {/*< !--Add a TrackList component -->*/}
            </div>
        )
    }

}

export default SearchResult;