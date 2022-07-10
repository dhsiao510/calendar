import React, { useState, useRef, useEffect } from 'react';
import { format, getMonth, isSameMonth } from 'date-fns';
import './App.css';
import { Event } from "./types";
import { mockEvents } from "./data/events";
import Calendar from './components/Calendar';
import EventDetail from './components/EventDetails';

function App() {
  const months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const [ selectDay, setSelectDay ]= useState<string>(() => format(new Date(), "MM/dd/yyyy"));
  const [ today, setToday ] = useState(null) as any;
  const [ selectMonth, setSelectMonth ] = useState(null) as any;
  const [ selectYear, setSelectYear ] = useState(null) as any;
  const [ showDetail, setShowDetail] = useState<boolean>(true);
  //save all events to useRef - type issue - using useState for now
  const [ events, setEvents ] = useState<Event[]>(() => mockEvents);
  const [ currentMonthEvents, setCurrentMonthEvents ] = useState([]) as any;

  const [ sameMonth, setSameMonth] = useState<boolean>(true);
  //filter out events not in current months:

  useEffect(() => { 
    const sMonth = months[getMonth(new Date(selectDay))]
    const sYear = selectDay.split('/')[2];
    setSelectMonth(sMonth);
    setSelectYear(sYear);

    const convertEvents = {} as any;
    events.forEach((event) => {
      const splitted = event.date.split(' ');
      if(splitted[0] === sMonth && splitted[2] === sYear) {
        convertEvents[splitted[1]] = {
          name: event.name,
          description: event.description,
          type: event.type
        }
      }
    })

    setCurrentMonthEvents(convertEvents);
    
    setSameMonth(isSameMonth(new Date(), new Date(selectDay)))

  }, [selectDay])

  return (
    <div className="App">
      <button style={{display:"none"}} onClick={()=> setSelectDay(format(new Date("02/21/2022"), "MM/dd/yyyy"))}>change Month</button>
      <Calendar selectDay={selectDay} sameMonth={sameMonth} currentMonthEvents={currentMonthEvents} />
      { showDetail ? <EventDetail />: <></>}
    </div>
  );
}

export default App;
