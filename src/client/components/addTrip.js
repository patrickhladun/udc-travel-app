import React from 'react';

class AddTrip extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <button onClick={this.getGeonames}>Add a Trip</button>
            </div>
        )
    }
}

export default AddTrip;