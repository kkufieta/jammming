import React from 'react';
import './Track.css';

class Track extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.trackAction()
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.name}</h3>
                    <p>{this.props.artist} | {this.props.album}</p>
                </div>
                <button className="Track-action" onClick={this.handleClick}>
                    {this.props.isRemoval ? '-' : '+'}
                </button>
            </div>
        )
    }
}

export default Track;