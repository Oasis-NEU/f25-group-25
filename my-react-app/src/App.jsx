import NavBar from "./navbar"
import Dashboard from "./pages/dashboard"
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Landing from "./pages/landing";
import Settings from "./pages/settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div>
            <NavBar></NavBar>
            <div className="min-h-screen flex items-center justify-center">
            <Link 
              to='/dashboard' 
              className="ml-4 px-4 py-2 rounded-sm text-center shadow-2xl transition-transform hover:scale-105 hover:cursor-pointer"
            >View my Dashboard</Link>
            <Link 
              to='/landing' 
              className="ml-4 px-4 py-2 rounded-sm text-center shadow-2xl transition-transform hover:scale-105 hover:cursor-pointer"
            >Landing Page</Link>
          </div>
          </div>
        }/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/landing" element={<Landing />} />
        <Route path='/settings' element={<Settings/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App