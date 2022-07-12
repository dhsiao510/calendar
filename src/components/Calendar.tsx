import React, { useEffect, useState } from "react";
import { format, getDay, startOfMonth, getMonth, isSameMonth, add, sub, lastDayOfMonth } from "date-fns"
import { Event } from "../types";

const Calendar = ({allEvents}: any) => {
    const calGrids = Array(42).fill(null);
    const months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const weekdays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const [ selectDay, setSelectDay ]= useState(() => format(new Date(), "MM/dd/yyyy")) as any;
    const [ selectMonth, setSelectMonth ] = useState(null) as any;
    const [ selectYear, setSelectYear ] = useState(null) as any;
    const [ firstOfMonthIdx, setFirstOfMonthIdx] = useState(null) as any;
    const [ sameMonth, setSameMonth] = useState<boolean>(true); 
    const [ showDetail, setShowDetail] = useState<boolean>(false);
    const [ selectEvent, setSelectEvent] = useState(null) as any;
    const [ monthLength, setMonthLength ] = useState(null) as any;
    const [ today, setToday ] = useState(null) as any;
    const [ currentMonthEvents, setCurrentMonthEvents ] = useState([]) as any;

    useEffect(() => { 
        setFirstOfMonthIdx(getDay(startOfMonth(new Date(selectDay))));
        const sMonth = months[getMonth(new Date(selectDay))]
        const sYear = selectDay.split('/')[2];
        setSelectMonth(sMonth);
        setSelectYear(sYear);
    
        const convertEvents = {} as any;
        allEvents.forEach((event: any) => {
          const splitted = event.date.split(' ');
          if(splitted[0] === sMonth && splitted[2] === sYear) {
            convertEvents[splitted[1]] = {
              name: event.name,
              date: event.date,
              description: event.description,
              type: event.type
            }
          }
        })
    
        setCurrentMonthEvents(convertEvents);
    
        setSameMonth(isSameMonth(new Date(), new Date(selectDay)))
    
      }, [selectDay])

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

    const renderEventDetail = (index: number) => {
        if(currentMonthEvents[index - firstOfMonthIdx + 1]) {
          setShowDetail(true);
          setSelectEvent(currentMonthEvents[index - firstOfMonthIdx + 1])
        } else {
          setShowDetail(false);
          setSelectEvent(null);
        }
      }
    
      const prevMonth = () => {
        setSelectDay(format(sub(new Date(selectDay), { months: 1}), "MM/dd/yyyy"))
      }
    
      const nextMonth = () => {
        setSelectDay(format(add(new Date(selectDay), { months: 1}), "MM/dd/yyyy"))
      }

    return (
        <div className="cal-wrapper">
            <div className="header">
                <button style={{height: "20%"}} onClick={() => prevMonth()}>{'<'}</button>
                <h1>{selectMonth} {selectYear}</h1>
                <button style={{height: "20%"}} onClick={() => nextMonth()}>{'>'}</button>
            </div>
            <div className="cal-table">
                {renderHeader(weekdays)}
                {renderGrid(calGrids)}
            </div>
            <div className="footer">
                <div className="sample1">Current Day</div>
                <br/>
                <div className="sample2">Has An Event</div>
            </div>
        </div>
    )
}

export default Calendar;