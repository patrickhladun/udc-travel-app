import React from 'react';

export default class AddTrip extends React.Component {
    state = {
        title: '',
        startDate: '',
        endDate: ''
    };
    onTitleChange = (e) => {
        const title = e.target.value;
        this.setState(() => ({title}));
    }
    render() {
        return (
            <div>
                <form>
                    <input 
                        type="text"
                        placeholder="Trip Title"
                        autoFocus
                        value={this.state.title}
                        onChange={this.onTitleChange}
                    />
                    <input 
                        type="text"
                        placeholder="Start Date"
                    />
                    <input 
                        type="text"
                        placeholder="End Date"
                    />
                    <button onClick={this.getGeonames}>Add a Trip</button>
                </form>
            </div>
        )
    }
};