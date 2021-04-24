import React from 'react';

class Geonames extends React.Component {
    constructor(props) {
        super(props);
    }
    getGeonames() {
        const payload = {};
        fetch('http://localhost:8080/geonames', {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(response => updateUI(response));
    }
    render() {
        return (
            <div>
                <button onClick={this.getGeonames}>Click me</button>
            </div>
        )
    }
}

export default Geonames;