import { BrowserRouter, Routes, Route } from "react-router-dom"

import "./index.css";

import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Dashboard } from "./pages/Dashboard";

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} /> {/* Landing page */}
                <Route path="/dashboard" element={<Dashboard />}/>
                <Route path="*" element={<NotFound />}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
