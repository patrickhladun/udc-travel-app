import React from 'react';
import { connect } from 'react-redux';
import TripListItem from './TripListItem';

const TripList = (props) => (
    <div className="trip-list">
        {props.trips.map(trip => <TripListItem key={trip.id} {...trip}/>)}
    </div>
);

const mapStateToProps = (state) => {
    return {
        trips: state.trips
    }
};

export default connect(mapStateToProps)(TripList);