import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import store from "./store";
import { persistor } from "./store";

import App from "./App";
import { Loader } from "./components";

import "./styles/index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
