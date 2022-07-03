import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { setupStore } from "./store";
import App from "./App";

import "./styles/index.scss";

const store = setupStore();

// !!!!! Change to middleware OR redux persist
store.subscribe(() => {
  // temporary solution
  localStorage.setItem(
    "boards",
    JSON.stringify(store.getState().boardReducer.boards)
  );
  localStorage.setItem(
    "tasks",
    JSON.stringify(store.getState().taskReducer.tasks)
  );
  localStorage.setItem(
    "lists",
    JSON.stringify(store.getState().listReducer.lists)
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
