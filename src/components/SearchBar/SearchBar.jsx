import React from 'react';
import './SearchBar.css'
import Spotify from '../../util/Spotify.js';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.searchBarInput.focus();
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    handleKeyDown(event) {
        if (event.key === 'Enter') {
            this.search();
        }
    }

    handleClick(e) {
        this.search();
    }

    async search() {
        const userId = await Spotify.getUserId();
        const searchResult = await Spotify.search(this.state.value);
        this.props.updateSearchResult(searchResult)
    }

    render() {
        return (
            <div className="SearchBar">
                <input
                    placeholder="Enter A Song, Album, or Artist"
                    value={this.state.value}
                    ref={(input) => { this.searchBarInput = input; }}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                />
                <button className="SearchButton" onClick={this.handleClick}>SEARCH</button>
            </div>
        )
    }
}

export default SearchBar;