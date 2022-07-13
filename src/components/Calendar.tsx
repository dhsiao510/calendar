import React, { useRef, useEffect, useState, useMemo } from "react";
import { format, getDay, startOfMonth, isSameMonth, add, sub, lastDayOfMonth } from "date-fns";
import currentMonthsEventsToDayMap from "../utils/filterEventsForCurrentMonth";
import EventDetail from "./EventDetails";
import { Event } from "../types";


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

    const [ sameMonth, setSameMonth] = useState<boolean>(true); 
    const [ selectEvent, setSelectEvent] = useState(null) as any;
    const [ today, setToday ] = useState(null) as any;
    const allEvents = useRef<Event[]>(events);
    const [ currentMonthEvents, setCurrentMonthEvents ] = useState([]) as any;
    

    
    useEffect(() => {
        setCurrentMonthEvents(currentMonthsEventsToDayMap(allEvents.current,  months[Number(selectDay.month)], selectDay.year));
        setSameMonth(isSameMonth(new Date(`${selectDay.month}/${selectDay.day}/${selectDay.year}`), new Date()))
        setToday(Number(format(new Date(), "dd")))
    
      }, [selectDay])
    
    const renderHeader = (array:Array<string>) => {
        return array.map((day:string, key) => <div key={key} className="cal-header">{day}</div>)
    }

    const renderGrid = (array: any) => {
            return array.map((day: any, key:any) => {
                if(key >= selectDay.firstOfMonthIdx && key < (selectDay.firstOfMonthIdx + selectDay.monthLength)) {
                    return (
                    <div role="cell" key={key} className="cal-cel-days" onClick={() => renderEventDetail(key)}>
                        <div role="cell" className={sameMonth && (today + selectDay.firstOfMonthIdx - 1) === key ? "current": ""}>{key - selectDay.firstOfMonthIdx + 1}</div>
                        { currentMonthEvents[ key - selectDay.firstOfMonthIdx + 1] ? <div className="event">{currentMonthEvents[key - selectDay.firstOfMonthIdx + 1].name}</div>:<></>}
                    </div>)
                } else if(36 > (selectDay.firstOfMonthIdx + selectDay.monthLength) && key > 34){
                    return <div role="cell" key={key} className="cal-cel-white" onClick={() => console.log(key, selectDay.firstOfMonthIdx + selectDay.monthLength)}></div>
                } else {
                    return <div role="cell" key={key} className="cal-cel" onClick={() => console.log(key)}></div>
                }
            })
    }

    const renderEventDetail = (index: number) => {
        if(selectDay.firstOfMonthIdx !== null) {
            if(currentMonthEvents[index - selectDay.firstOfMonthIdx + 1]) {
                setSelectEvent(currentMonthEvents[index - selectDay.firstOfMonthIdx + 1])
              } else {
                setSelectEvent(null);
              }
        }
    }
    
    const prevMonth = () => {
        setSelectDay(initialSelectDayFormat(format(sub(new Date(`${selectDay.month}/${selectDay.day}/${selectDay.year}`), {months:1}), "MM/dd/yyyy")))
        setSelectEvent(null);
    }
    
    const nextMonth = () => {
        setSelectDay(initialSelectDayFormat(format(add(new Date(`${selectDay.month}/${selectDay.day}/${selectDay.year}`), {months:1}), "MM/dd/yyyy")))
        setSelectEvent(null);
    }
    
    return (
        <div className="component-wrapper">
            <div className="cal-wrapper">
                <div className="header">
                    <button style={{height: "25%"}} onClick={() => prevMonth()}>{'<'}</button>
                    <h1>{months[Number(selectDay.month)]} {selectDay.year}</h1>
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