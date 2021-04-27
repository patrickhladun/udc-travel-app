import React from 'react';

export default class AddDestination extends React.Component {
    render() {
        return (
            <div>
                <form>
                    <input 
                        type="text"
                        placeholder="Country of destination"
                        autofocus
                    />
                    <input 
                        type="text"
                        placeholder="City"
                    />
                    <button onClick={this.getGeonames}>Add a Destination</button>
                </form>
            </div>
        )
    }
}