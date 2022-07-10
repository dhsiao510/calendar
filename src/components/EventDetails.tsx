import React from "react";

const EventDetail = ({selectEvent}: any) => {

    return (
        <div className="event-detail">
            <h3>Event Detail</h3>
            <div>Event Name: {selectEvent.name}</div>
            <div>Event Date: {selectEvent.date}</div>
            <div>Event Description: {selectEvent.description}</div>
            <div>Event Type: {selectEvent.type}</div>
        </div>
    )
}

export default EventDetail;