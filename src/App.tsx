import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { BoardPage } from "./pages/BoardPage";
import "./styles/index.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="boards" element={<HomePage />} />
          <Route path="boards/:boardId" element={<BoardPage />} />
          <Route path="*" element={<>Not found</>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
