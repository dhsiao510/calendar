import React, { useRef, useEffect, useState } from "react";
import { format, getDay, startOfMonth, isSameMonth, add, sub, lastDayOfMonth } from "date-fns";
import currentMonthsEventsToDayMap from "../utils/filterEventsForCurrentMonth";
import EventDetail from "./EventDetails";
import { Event } from "../types";

const initialSelectDayFormat = (stringDate?: any) => {
    stringDate = stringDate ? stringDate: format(new Date(), "MMM/dd/yyyy");
    stringDate = stringDate.split('/');
    return {
        month: stringDate[0],
        day: stringDate[1],
        year: stringDate[2]
    }
}

const Calendar = ({events}: any) => {
    const calGrids = Array(42).fill(null);
    const weekdays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const [ selectDay, setSelectDay ]= useState(() => initialSelectDayFormat()) as any;
    const [ firstOfMonthIdx, setFirstOfMonthIdx] = useState<null|number>(null);
    const [ monthLength, setMonthLength ] = useState<null|number>(null);
    const [ sameMonth, setSameMonth] = useState<boolean>(true); 
    const [ selectEvent, setSelectEvent] = useState(null) as any;
    const [ today, setToday ] = useState(null) as any;
    const allEvents = useRef<Event[]>(events);
    const [ currentMonthEvents, setCurrentMonthEvents ] = useState([]) as any;

    useEffect(() => { 
        setFirstOfMonthIdx(getDay(startOfMonth(new Date(`${selectDay.month}/${selectDay.day}/${selectDay.year}`))));
        setCurrentMonthEvents(currentMonthsEventsToDayMap(allEvents.current, selectDay.month, selectDay.year));
        setSameMonth(isSameMonth(new Date(), new Date(`${selectDay.month}/${selectDay.day}/${selectDay.year}`)))
        const monthEnd = lastDayOfMonth(new Date(`${selectDay.month}/${selectDay.day}/${selectDay.year}`)).toString();
        setMonthLength(Number(monthEnd.split(' ')[2]));
        setToday(Number(format(new Date(), "dd")))
    
      }, [selectDay])
    
    const renderHeader = (array:Array<string>) => {
        return array.map((day:string, key) => <div key={key} className="cal-header">{day}</div>)
    }

    const renderGrid = (array: any) => {
        if(firstOfMonthIdx !== null && monthLength) {
            return array.map((day: any, key:any) => {
                if(key >= firstOfMonthIdx && key < (firstOfMonthIdx + monthLength)) {
                    return (
                    <div key={key} className="cal-cel-days" onClick={() => renderEventDetail(key)}>
                        <div className={sameMonth && (today + firstOfMonthIdx - 1) === key ? "current": ""}>{key - firstOfMonthIdx + 1}</div>
                        { currentMonthEvents[ key - firstOfMonthIdx + 1] ? <div className="event">{currentMonthEvents[key - firstOfMonthIdx + 1].name}</div>:<></>}
                    </div>)
                } else if(key > 34 && (firstOfMonthIdx + monthLength) < 36){
                } else {
                    return <div key={key} className="cal-cel"></div>
                }
            })
        }
    }

    const renderEventDetail = (index: number) => {
        if(firstOfMonthIdx) {
            if(currentMonthEvents[index - firstOfMonthIdx + 1]) {
                setSelectEvent(currentMonthEvents[index - firstOfMonthIdx + 1])
              } else {
                setSelectEvent(null);
              }
        }
    }
    
    const prevMonth = () => {
        setSelectDay(initialSelectDayFormat(format(sub(new Date(`${selectDay.month}/${selectDay.day}/${selectDay.year}`), {months:1}), "MMM/dd/yyyy")))
        setSelectEvent(null);
    }
    
    const nextMonth = () => {
        setSelectDay(initialSelectDayFormat(format(add(new Date(`${selectDay.month}/${selectDay.day}/${selectDay.year}`), {months:1}), "MMM/dd/yyyy")))
        setSelectEvent(null);
    }

    return (
        <div className="component-wrapper">
            <div className="cal-wrapper">
                <div className="header">
                    <button style={{height: "25%"}} onClick={() => prevMonth()}>{'<'}</button>
                    <h1>{selectDay.month} {selectDay.year}</h1>
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
            { selectEvent === null ? <></>:<EventDetail selectEvent={selectEvent} /> }
        </div>
    )
}

export default Calendar;