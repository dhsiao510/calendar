import React, { useState, useRef, useEffect } from 'react';
import { format, getDay, startOfMonth, getMonth, isSameMonth, add, sub } from 'date-fns';
import './App.css';
import { Event } from "./types";
import { mockEvents } from "./data/events";
import Calendar from './components/Calendar';
import EventDetail from './components/EventDetails';

function App() {

  return (
    <div className="App">
      <Calendar allEvents={mockEvents} />
    </div>
  );
}

export default App;

//      { showDetail ? <EventDetail selectEvent={selectEvent}/>: <></>}
