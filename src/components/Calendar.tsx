import React, { useRef, useEffect, useState } from "react";
import { format, getDay, startOfMonth, isSameMonth, add, sub, lastDayOfMonth } from "date-fns";
import currentMonthsEventsToDayMap from "../utils/filterEventsForCurrentMonth";
import EventDetail from "./EventDetails";
import { Event } from "../types";
import { useToggle } from "../hooks/useToggle";

const initialSelectDayFormat = (stringDate?: string) => {
    stringDate = stringDate ? stringDate: format(new Date(), "MM/dd/yyyy");
    const arrDate = stringDate.split('/');
    const monthEnd = lastDayOfMonth(new Date(`${arrDate[0]}/${arrDate[1]}/${arrDate[2]}`)).toString();
    return {
        month: arrDate[0],
        day: arrDate[1],
        year: arrDate[2],
        monthLength: Number(monthEnd.split(' ')[2]),
        firstOfMonthIdx: getDay(startOfMonth(new Date(`${arrDate[0]}/${arrDate[1]}/${arrDate[2]}`))),
    }
}

const Calendar = ({events}: any) => {
    const calGrids = Array(42).fill(null);
    const weekdays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months: any = {1:'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9:'Sep', 10: 'Oct', 11:'Nov', 12: 'Dec'}
    const [ selectDay, setSelectDay ]= useState(() => initialSelectDayFormat()) as any;
    const { month, day, year, monthLength, firstOfMonthIdx } = selectDay;

    const [ sameMonth, setSameMonth] = useState<boolean>(true); 
    const [showDetail, setShowDetail] = useToggle(false);

    const [ selectEvent, setSelectEvent] = useState(null) as any;
    const [ today, setToday ] = useState(null) as any;
    const allEvents = useRef<Event[]>(events);
    const [ currentMonthEvents, setCurrentMonthEvents ] = useState([]) as any;
    
    useEffect(() => {
        setCurrentMonthEvents(currentMonthsEventsToDayMap(allEvents.current,  months[Number(month)], year));
        setSameMonth(isSameMonth(new Date(`${month}/${day}/${year}`), new Date()))
        setToday(Number(format(new Date(), "dd")))
      },[selectDay])
    
    const renderHeader = (array:Array<string>) => {
        return array.map((day:string, key) => <div key={key} className="cal-header">{day}</div>)
    }

    const renderGrid = (array: any) => {
            return array.map((day: any, key:any) => {
                if(key >= firstOfMonthIdx && key < (firstOfMonthIdx + monthLength)) {
                    return (
                    <div role="cell" data-testid="day" key={key} className="cal-cel-days" onClick={() => renderEventDetail(key)}>
                        <div className={sameMonth && (today + firstOfMonthIdx - 1) === key ? "current": ""}>{key - firstOfMonthIdx + 1}</div>
                        { currentMonthEvents[ key - firstOfMonthIdx + 1] ? <div className="event" data-testid="current-month-event">{currentMonthEvents[key - firstOfMonthIdx + 1].name}</div>:<></>}
                    </div>)
                } else if(36 > (firstOfMonthIdx + monthLength) && key > 34){
                    return <div role="cell" key={key} className="cal-cel-white"></div>
                } else {
                    return <div role="cell" key={key} className="cal-cel"></div>
                }
            })
    }

    const renderEventDetail = (index: number) => {
        if(firstOfMonthIdx !== null) {
            if(currentMonthEvents[index - firstOfMonthIdx + 1]) {
                if(selectEvent === null) setShowDetail();
                if(selectEvent === currentMonthEvents[index - firstOfMonthIdx + 1]) setShowDetail();
                setSelectEvent(currentMonthEvents[index - firstOfMonthIdx + 1])
              } else {
                if(showDetail) setShowDetail()
                setSelectEvent(null);
              }
        }
    }
    
    const prevMonth = () => {
        setSelectDay(initialSelectDayFormat(format(sub(new Date(`${month}/${day}/${year}`), {months:1}), "MM/dd/yyyy")))
        setSelectEvent(null);
    }
    
    const nextMonth = () => {
        setSelectDay(initialSelectDayFormat(format(add(new Date(`${month}/${day}/${year}`), {months:1}), "MM/dd/yyyy")))
        setSelectEvent(null);
    }
    
    return (
        <div className="component-wrapper" data-testid="calendar-component">
            <div className="cal-wrapper">
                <div className="header">
                    <button style={{height: "25%"}} onClick={() => prevMonth()}>{'<'}</button>
                    <h1>{months[Number(month)]} {year}</h1>
                    <button style={{height: "25%"}} onClick={() => nextMonth()}>{'>'}</button>
                </div>
                <div className="cal-table">
                    {renderHeader(weekdays)}
                    {renderGrid(calGrids)}
                </div>
                <div className="footer">
                    <div className="sample1">Today</div>
                    <div className="sample2">Event</div>
                </div>
            </div>
            { selectEvent === null || showDetail === false ? <></>:<EventDetail selectEvent={selectEvent} /> }
        </div>
    )
}

export default Calendar;