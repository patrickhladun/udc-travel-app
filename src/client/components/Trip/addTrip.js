import React from 'react';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';

const now = moment();
console.log(now.format('MMMM Do, YYYY'));

export default class AddTrip extends React.Component {
    state = {
        title: '',
        createdAt: moment(),
        calendarFocused: false,
        startDate: '',
        endDate: '',
    };
    onTitleChange = (e) => {
        const title = e.target.value;
        this.setState(() => ({title}));
    };
    onDateChange = (createdAt) => {
        this.setState(() => ({createdAt}));
    };
    onFocusChange = ({focused}) => {
        this.setState(() => ({calendarFocused: focused}));
    };
    render() {
        return (
            <div>
                <form>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker value={this.state.createdAt} onChange={this.onDateChange} />   
                </MuiPickersUtilsProvider>
                    <button onClick={this.getGeonames}>Add a Trip</button>
                </form>
            </div>
        )
    }
};