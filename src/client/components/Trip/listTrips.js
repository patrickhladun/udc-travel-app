import React from 'react';
import { connect } from 'react-redux';

const ListTrips = (props) => (
    <div>
        <h1>My Trips</h1>
        {props.trips.length}
    </div>
);

const mapStateToProps = (state) => {
    return {
        trips: state.trips
    }
};

export default connect(mapStateToProps)(ListTrips);