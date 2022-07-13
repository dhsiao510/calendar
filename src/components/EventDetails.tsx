const EventDetail = ({selectEvent}: any) => {

    return (
        <div className="event-detail">
            <h2>Event Detail</h2>
            <div><b>Event Name: </b>{selectEvent.name}</div>
            <div><b>Event Date: </b>{selectEvent.date}</div>
            <div><b>Event Description: </b>{selectEvent.description}</div>
            <div><b>Event Type: </b>{selectEvent.type}</div>
        </div>
    )
}

export default EventDetail;