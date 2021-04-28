import React from 'react';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import Textfield from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class AddTrip extends React.Component {
    state = {
        title: '',
        startDate: moment(),
        endDate: moment(),
        error: ''
    };
    onTitleChange = (e) => {
        const title = e.target.value;
        this.setState(() => ({title}));
    };
    onStartDateChange = (startDate) => {
        this.setState(() => ({startDate}));
    };
    onEndDateChange = (endDate) => {
        this.setState(() => ({endDate}));
    };
    onSubmit = (e) => {
        e.preventDefault();
        if(!this.state.title) {
            this.setState(() => ({error: 'Please provide title.'}));
        } else {
            this.setState(() => ({error: ''}));
            this.props.onSubmit({
                title: this.state.title,
                startDate: this.state.startDate.valueOf(),
                endDate: this.state.endDate.valueOf()
            })
        }
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <Textfield
                        label="Trip title"
                        placeholder="Trip title"
                        onChange={this.onTitleChange}
                    />
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker
                            autoOk
                            label="Start Date"
                            variant="dialog"
                            orientation="landscape"
                            disablePast={true}
                            value={this.state.startDate} 
                            onChange={this.onStartDateChange} 
                        />
                        <DatePicker
                            variant="dialog"
                            label="End Date"
                            orientation="landscape"
                            minDate={this.state.startDate}
                            minDateMessage="End date should not be before start date."
                            disablePast={true}
                            value={this.state.endDate}
                            onChange={this.onEndDateChange}
                        />  
                    </MuiPickersUtilsProvider>
                    <Button
                        variant="outlined"
                        type="submit"
                    >
                        Add a Trip</Button>
                </form>
            </div>
        )
    }
};