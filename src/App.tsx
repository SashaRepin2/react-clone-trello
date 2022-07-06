import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { BackButton, Loader } from "./components/index";

const HomePage = lazy(() => import("./pages/HomePage"));
const BoardPage = lazy(() => import("./pages/BoardPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <BackButton />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="boards" element={<HomePage />} />
            <Route path="boards/:boardId" element={<BoardPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
