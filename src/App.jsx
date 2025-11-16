import { BrowserRouter, Routes, Route } from "react-router-dom"

import { useState } from 'react'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'

import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Dashboard } from "./pages/Dashboard";

function App() {
  const [count, setCount] = useState(0)

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
