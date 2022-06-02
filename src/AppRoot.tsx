import App from "./App";
import "./App.css";
import { store } from "./store";
import { Provider } from "react-redux";

function AppRoot() {
  return (
    <div className="App">
      <header className="App-header">
        <Provider store={store}>
          <App />
        </Provider>
      </header>
    </div>
  );
}

export default AppRoot;
