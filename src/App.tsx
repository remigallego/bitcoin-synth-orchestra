import PriceAwareComponents from "./PriceAwareComponents";
import PriceDataProvider from "./context/PriceDataProvider";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PriceDataProvider>
          <PriceAwareComponents />
        </PriceDataProvider>
      </header>
    </div>
  );
}

export default App;
