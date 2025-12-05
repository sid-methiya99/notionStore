import "./App.css";
import { Login } from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<div>Signup Page</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
