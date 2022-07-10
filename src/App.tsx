import React, { useState, useRef, useEffect } from 'react';
import { format, getDate, isSameMonth } from 'date-fns';
import './App.css';
import { Event } from "./types";
import { mockEvents } from "./data/events";
import Calendar from './components/Calendar';
import EventDetail from './components/EventDetails';

function App() {
  const [ selectDay, setSelectDay ]= useState<string>(() => format(new Date(), "MM/dd/yyyy"));
  const [ today, setToday ] = useState(null) as any;
  const [ selectMonth, setSelectMonth ] = useState(null) as any;
  const [ showDetail, setShowDetail] = useState<boolean>(true);
  //save all events to useRef - type issue - using useState for now
  const [ events, setEvents ] = useState<Event[]>(() => mockEvents);
  const [ sameMonth, setSameMonth] = useState<boolean>(true);
  //filter out events not in current months:

  useEffect(() => { 
    setSameMonth(isSameMonth(new Date(), new Date(selectDay)))
  }, [selectDay])

  return (
    <div className="App">
      <button style={{display:"none"}} onClick={()=> setSelectDay(format(new Date("02/21/2022"), "MM/dd/yyyy"))}>change Month</button>
      <Calendar selectDay={selectDay}  sameMonth={sameMonth} />
      { showDetail ? <EventDetail />: <></>}
    </div>
  );
}

export default App;
