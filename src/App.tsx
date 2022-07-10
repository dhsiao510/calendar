import React, { useState, useRef, useEffect } from 'react';
import { format, getDay, startOfMonth, getMonth, isSameMonth } from 'date-fns';
import './App.css';
import { Event } from "./types";
import { mockEvents } from "./data/events";
import Calendar from './components/Calendar';
import EventDetail from './components/EventDetails';

function App() {
  const months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const [ selectDay, setSelectDay ]= useState<string>(() => format(new Date(), "MM/dd/yyyy"));
  const [ selectMonth, setSelectMonth ] = useState(null) as any;
  const [ selectYear, setSelectYear ] = useState(null) as any;
  const [ firstOfMonthIdx, setFirstOfMonthIdx] = useState(null) as any;
  const [ sameMonth, setSameMonth] = useState<boolean>(true);
  const [ showDetail, setShowDetail] = useState<boolean>(false);
  const [ selectEvent, setSelectEvent] = useState(null) as any;
  const allEvents  = useRef(mockEvents);
  const [ currentMonthEvents, setCurrentMonthEvents ] = useState([]) as any;


  useEffect(() => { 
    setFirstOfMonthIdx(getDay(startOfMonth(new Date(selectDay))));
    const sMonth = months[getMonth(new Date(selectDay))]
    const sYear = selectDay.split('/')[2];
    setSelectMonth(sMonth);
    setSelectYear(sYear);

    const convertEvents = {} as any;
    allEvents.current.forEach((event) => {
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

  }, [selectDay, allEvents.current])

  const renderEventDetail = (index: number) => {
    
    if(currentMonthEvents[index - firstOfMonthIdx + 1]) {
      setShowDetail(true);
      setSelectEvent(currentMonthEvents[index - firstOfMonthIdx + 1])
    } else {
      setShowDetail(false);
      setSelectEvent(null);
    }
  }

  return (
    <div className="App">
      <button style={{ display: "none"}} onClick={()=> setSelectDay(format(new Date("02/21/2022"), "MM/dd/yyyy"))}>change Month</button>
      <Calendar selectDay={selectDay} selectMonth={selectMonth} selectYear={selectYear} firstOfMonthIdx={firstOfMonthIdx} sameMonth={sameMonth} currentMonthEvents={currentMonthEvents} renderEventDetail={renderEventDetail} />
      { showDetail ? <EventDetail selectEvent={selectEvent}/>: <></>}
    </div>
  );
}

export default App;
