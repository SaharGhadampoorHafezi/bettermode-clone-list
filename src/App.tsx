import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage, PostPage } from "./pages";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<PostPage />} />
      </Routes>
    </>
  );
}

export default App;
