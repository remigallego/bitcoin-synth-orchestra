import App from "./App";
import "./App.css";
import { store } from "./store";
import { Provider } from "react-redux";

function AppRoot() {
  return (
    <div className="wrapper">
      <Provider store={store}>
        <App />
      </Provider>
    </div>
  );
}

export default AppRoot;
