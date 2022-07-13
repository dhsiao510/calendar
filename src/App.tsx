import './App.css';
import Calendar from './components/Calendar';
import { mockEvents } from "./data/events";

function App() {
  return (
    <div className="App">
      <Calendar events={mockEvents} />
    </div>
  );
}

export default App;