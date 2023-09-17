
import './App.css';
import Deck from './Deck';
import DeckAuto from "./DeckAuto"

function App() {
  return (
    <div className="App">
      <header className="App-header"><h1>Deck of Cards</h1></header>
      <Deck />
      <DeckAuto />
    </div>
  );
}

export default App;
