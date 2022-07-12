import React, { useEffect, useState } from "react";
import { format, lastDayOfMonth } from "date-fns"
import { Event } from "../types";

const Calendar = ({selectDay, selectMonth, selectYear, firstOfMonthIdx, sameMonth, currentMonthEvents, renderEventDetail}: any) => {
    const calGrids = Array(42).fill(null);
    const weekdays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const [ monthLength, setMonthLength ] = useState(null) as any;
    const [ today, setToday ] = useState(null) as any;
    

    useEffect(() => {
        const monthEnd = lastDayOfMonth(new Date(selectDay)).toString();
        setMonthLength(Number(monthEnd.split(' ')[2]));
        setToday(Number(format(new Date(), "dd")))
    }, [selectDay])
    
    const renderHeader = (array:Array<string>) => {
        return array.map((day:string, key) => <div key={key} className="cal-header">{day}</div>)
    }

    const renderGrid = (array: any) => {
        return array.map((day: any, key:any) => {
            if(key >= firstOfMonthIdx && key < (firstOfMonthIdx + monthLength)) {
                    return (
                    <div key={key} className="cal-cel-days" onClick={() => renderEventDetail(key)}>
                        <div className={sameMonth && (today + firstOfMonthIdx - 1) === key ? "current": ""}>{key - firstOfMonthIdx + 1}</div>
                        { currentMonthEvents[ key - firstOfMonthIdx + 1] ? <div className="event">{currentMonthEvents[key - firstOfMonthIdx + 1].name}</div>:<></>}
                    </div>)
                
            } else {
                return <div key={key} className="cal-cel"></div>
            }
        }
    )}

    return (
        <div className="cal-wrapper">
            <h1>{selectMonth} {selectYear}</h1>
            <div className="cal-table">
                {renderHeader(weekdays)}
                {renderGrid(calGrids)}
            </div>
        </div>
    )
}

export default Calendar;