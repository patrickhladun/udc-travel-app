import React from 'react';
import { connect } from 'react-redux';

const TripList = (props) => (
    <div>
        {console.log(props.trips)}
        {props.trips.length}
    </div>
);

const mapStateToProps = (state) => {
    return {
        trips: state.trips
    }
};

export default connect(mapStateToProps)(TripList);