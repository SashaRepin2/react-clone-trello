import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { setupStore } from "./store";
import App from "./App";

import "./styles/index.scss";

const store = setupStore();

// !!!!! Change to middleware OR redux persist
store.subscribe(() => {
  localStorage.setItem(
    "boards",
    JSON.stringify(store.getState().boardReducer.boards)
  );
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
