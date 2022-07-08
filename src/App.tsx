import React, { useState } from 'react';
import './App.css';
import Calendar from './components/Calendar';
import EventDetail from './components/EventDetails';

function App() {
  const [ today, setToday ] = useState(new Date());
  const [ showDetail, setShowDetail] = useState<boolean>(false);

  return (
    <div className="App">
      <Calendar />
      { showDetail ? <EventDetail />: <></>}
    </div>
  );
}

export default App;
