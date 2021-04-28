import React from 'react';

const TripListItem = ({ id, title, startDate, endDate }) => (
    <div className="trip-list-item">
        {title}
    </div>
)
    
export default TripListItem;