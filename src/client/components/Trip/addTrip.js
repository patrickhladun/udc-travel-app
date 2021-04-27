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
                    <select>
                            <option value="">-- Select Country --</option>
                            <option value="ireland">Ireland</option>
                            <option value="poland">Poland</option>
                    </select>
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