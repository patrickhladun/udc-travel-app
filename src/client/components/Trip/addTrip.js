import React from 'react';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import Textfield from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
                    <Textfield />
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker
                            variant="dialog"
                            orientation="landscape"
                            disablePast={true}
                            value={this.state.createdAt} 
                            onChange={this.onDateChange} 
                        />
                        <DatePicker
                            variant="dialog"
                            orientation="landscape"
                            disablePast={true}
                            value={this.state.createdAt} 
                            onChange={this.onDateChange} 
                        />   
                    </MuiPickersUtilsProvider>
                    <Button
                        variant="outlined"
                    >Add a Trip</Button>
                </form>
            </div>
        )
    }
};