import React from 'react';
import { connect } from 'react-redux';
import AddTripForm from './AddTripForm';
import { actionAddTrip } from '../../actions/trip';

const AddTrip = (props) => (
    <div>
        <h1>My trips</h1>
        <AddTripForm 
            onSubmit={(trip) => {
                props.dispatch(actionAddTrip(trip));
            }}
        />
    </div>
);

export default connect()(AddTrip);