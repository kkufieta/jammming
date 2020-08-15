import React from 'react';
import './SearchBar.css'
import Spotify from '../../util/Spotify.js';
// Searchbar: take input, when user hits enter or clicks the button:
// fetch the data from the spotify API
// for now: console.log the data.

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

    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    handleKeyDown(event) {
        if (event.key === 'Enter') {
            // TODO: Submit the search query
            console.log('key: ', event.key);
            // TODO: Call Search
            console.log("call search: ", this.state.value)
            this.search();
        }
    }

    handleClick(e) {
        // TODO: Call Search
        console.log("call search: ", this.state.value)
        this.search();
    }

    async search() {

        const userId = await Spotify.getUserId();
        console.log(userId);
        const searchResult = await Spotify.search('rihanna');
        console.log(searchResult);
    }

    render() {
        return (
            <div className="SearchBar">
                <input
                    placeholder="Enter A Song, Album, or Artist"
                    value={this.state.value}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                />
                <button className="SearchButton" onClick={this.handleClick}>SEARCH</button>
            </div>
        )
    }
}

export default SearchBar;